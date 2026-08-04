# QuitQOS

> Kaynak: `~/dev/quitqos` (repo okunarak yazıldı, 2026-08-04)

## Tek cümlelik tanım

IQOS bırakmak isteyenler için sayaç, kanıta dayalı sağlık kilometre taşları, rozet
koleksiyonu ve seri liderlik tablosu sunan mobil uygulama — backend'i uçtan uca
Java + Spring Boot ile yazıldı.

## Kimlik

| Alan | Değer |
|---|---|
| Tip | Kişisel proje |
| Durum | Backend feature-complete, mobil aktif geliştirmede |
| Repo | Public'e hazırlanıyor (`github.com/Berkantrkgl` altında) |
| Rol | Tek geliştirici — domain, backend, mobil, tasarım sistemi, marka |
| Ana dil/stack | Java 21 · Spring Boot 4.1 |

## Neden var — problem

Bırakmak uzun bir oyun ve motivasyon hızla düşüyor. Uygulamanın çözmesi gerekenler:

- Kurcalanamaz, kesin bir bırakma sayacı tutmak
- Sağlık iyileşmesini **doğru anda** tanımak (kullanıcı uygulamayı açmasa bile)
- Uygulama günlerce kapalıyken bile kullanıcıya push ile ulaşmak
- Hesap açmayı zorunlu kılmadan çalışmak — kayıt sadece senkron + liderlik tablosu için

## Domain modeli

**İki kullanıcı tipi:**

- **Guest** — hesap yok. Tüm veri cihazda (AsyncStorage). Backend hiç çağrılmaz.
  Sayaç, milestone, rozet `startedAt`'ten client-side hesaplanır. Milestone bildirimleri
  seri başlarken **13 local notification** olarak önceden zamanlanır. Liderlik tablosu yok.
- **Registered** — Google/Apple ile Firebase Auth. Veri sunucuda senkronlanır, liderlik
  tablosuna girer. Guest→registered geçişinde cihaz verisi `POST /users/me/sync` ile
  bir kez merge edilir.

**Varlıklar:** `User` (unique `username`), `QuitAttempt` (ACTIVE/RELAPSED), `Milestone`
(13 sabit seed satırı), `Badge`, `UserMilestone`, `RefreshToken`.

**İş kuralları:**

- Kullanıcı başına en fazla **bir ACTIVE** `QuitAttempt` — ikincisini başlatmak 409.
  Veritabanında **partial unique index** ile zorlanıyor, sadece servis katmanında değil.
- Geriye dönük başlangıç serbest; gelecek tarihli `startedAt` → 422.
- Relapse aktif denemeyi kapatır (`status=RELAPSED`, `endedAt=now()`), geçmiş korunur.
- Liderlik tablosu registered-only (guest → 403). Metrikler: `current` (canlı aktif seri)
  ve `longest`.

**Milestone seed** — 13 satır, kanıta dayalı (başta 9'du, araştırma sonrası genişletildi
ve bilimsel olarak savunulabilir şekilde yeniden yazıldı):
20 dk · 12 sa · 24 sa · 48 sa · 72 sa · 5 gün · 1 hafta · 10 gün · 2 hafta · 1 ay ·
3 ay · 6 ay · 1 yıl.

> Mobil katalog (`mobile/src/constants/milestones.ts`) ile backend seed'i (Flyway V2+V5+V7)
> lockstep — biri değişirse diğeri de değişir.

## Backend mimarisi

**Stack:** Spring Boot 4.1 · Java 21 · PostgreSQL · Spring Security (JWT) · Spring Data JPA ·
Flyway · Firebase Admin SDK (auth verify + FCM) · Lombok · jjwt 0.13 · Maven

**Katmanlı paket yapısı** — `com.dayzerosoft.quitqos.backend` altında:
`domain/` · `repository/` · `service/` · `web/` (+ `web/dto/`) · `security/` · `config/`

### Kimlik doğrulama modeli — projenin en önemli fikri

**İki ayrı kimlik, birbirine karıştırılmıyor:**

- **Firebase** yalnızca şunu yanıtlar: *"bu kişi gerçekten bu Google/Apple hesabının sahibi mi?"*
  ve bir **Firebase ID token** verir. Firebase'in bizim için yaptığı tek iş bu.
- **Backend** buna körü körüne güvenmez. ID token'ı **bir kez** doğrular, `User`'ı upsert eder
  (e-postadan username türetir) ve **kendi** access JWT + refresh token'ını üretir.

Sonraki her istek sadece *bizim* access JWT'mizi taşır — Firebase bir daha hiç çağrılmaz.

**İki token tipi:**

| Token | Amaç | Ömür | Nerede saklanır |
|---|---|---|---|
| Access JWT | Her istekte taşınır, kimliği kanıtlar | ~1 saat | Hiçbir yerde — self-contained, HMAC imzalı (stateless) |
| Refresh token | Access JWT bitince yenisiyle takas | ~180 gün | DB'de, **SHA-256 hash olarak** (ham değer asla) |

Access kısa ömürlü, sızarsa risk düşük. Refresh uzun ömürlü ama DB-backed, yani iptal
edilebilir (logout). Kasıtlı olarak ayrılar.

**Refresh rotasyonu:** `/auth/refresh` sunulan token'ı hash'iyle bulur, geçerliyse
**eski satırı siler ve yenisini verir** — tek kullanımlık rotasyon. Eski refresh token bir
daha kullanılamaz. Hedef: kullanıcı bir kez giriş yapar, logout'a kadar bir daha login görmez.

**Spring Security filter chain:**

1. `JwtAuthenticationFilter` — `Authorization: Bearer <jwt>` okur, doğrular, user id'yi
   `SecurityContext`'e yazar. Token eksik/geçersizse **hiçbir şey yapmaz, asla reddetmez.**
   (Authentication = "kimsin", authorization = "iznin var mı" — ayrı sorumluluklar.)
2. `SecurityConfig` — `POST /auth/**` ve `GET /leaderboard/summary` public, gerisi
   `authenticated()`. STATELESS session, csrf/formLogin/httpBasic kapalı.
3. `RestAuthenticationEntryPoint` — kimliksiz istekte Spring'in boş/HTML yanıtı yerine
   standart JSON hata gövdesi + 401.

**Fail-fast:** Firebase service-account JSON yoksa uygulama boot'ta düşer. Eski dev stub
verifier kaldırıldı (2026-07-03) — auth her zaman gerçek Firebase ister.

### Veri katmanı

**Flyway ile 7 migration** — `ddl-auto=validate`, Hibernate şemaya asla dokunmaz:

| Migration | Ne yapar |
|---|---|
| `V1__schema.sql` | 5 tablo: `badge`, `milestone`, `app_user`, `quit_attempt`, `user_milestone`. Partial unique index `uq_quit_attempt_active_per_user` — kullanıcı başına tek ACTIVE'i DB'de zorlar. |
| `V2__seed_milestones_badges.sql` | 9 milestone + 9 badge, sabit UUID'lerle |
| `V3__refresh_token.sql` | `refresh_token` tablosu |
| `V4__quit_attempt_local_id.sql` | `local_id` + partial unique `(user_id, local_id)` — guest→registered senkronunda idempotency |
| `V5__expand_milestones.sql` | 9 → 13 milestone, kanıta dayalı yeniden yazım |
| `V6__user_username.sql` | `username` + `LOWER(username)` unique index (case-insensitive) |
| `V7__user_locale_milestone_en.sql` | Kullanıcı locale'i + milestone'lara İngilizce içerik |

**Username:** 3–20 karakter, lowercase `[a-z0-9_]`. İlk login'de e-postanın local-part'ından
otomatik türetilir (`berkan.turkoglu@x → berkanturkoglu`, çakışma → `...2`, `...3`).
`PATCH /users/me` ile düzenlenir (422 hatalı format, 409 alınmış). Liderlik tablosu
non-unique görünen ad yerine username gösterir.

### Bildirim motoru

`MilestoneNotificationScheduler` — `@Scheduled`, varsayılan 60 sn'de bir tick:

1. ACTIVE denemeleri tarar
2. Yeni geçilen offset'ler için `UserMilestone` yaratır ve rozet verir
3. FCM push'u `PushNotificationSender` ile atar

Tasarım detayları:

- **Achievement kaydı push denemesinden ÖNCE yapılır** — geçici bir FCM hatası bir sonraki
  tick'te çift ödüle yol açmasın diye.
- `notificationsEnabled=false` ya da `fcmToken` yoksa push atlanır ama **kayıt yine oluşur.**
- Send hatası yakalanır + loglanır, `notificationSentAt` null kalır, retry yok (MVP kararı).
- Stub/real seam: credential yoksa `StubPushNotificationSender`, varsa
  `RealPushNotificationSender`. Ortak `FirebaseApp` üzerinden bağlı.
- **Gerçek cihazda uçtan uca doğrulandı**: mobil FCM token'ı kaydeder → geriye dönük seri →
  scheduler tick'inde push düşer → `notification_sent_at` dolar.

### API

`/api/v1` altında **19 endpoint**. Konvansiyonlar: JSON, `Authorization: Bearer <JWT>`,
UUID string id, ISO-8601 UTC timestamp, standart hata gövdesi
`{ timestamp, status, error, message, path }`.

Gruplar:

- **Auth** — `POST /auth/firebase` · `/auth/refresh` · `/auth/logout`
- **Users** — `GET|PATCH /users/me` · `PUT /users/me/fcm-token` · `POST /users/me/sync` ·
  `GET /users/me/achievements`
- **Quit attempts** — `POST /quit-attempts` · `GET /current` · `GET /{id}` ·
  `POST /{id}/relapse` · `GET /{id}/milestones` (achieved + pending, ETA'lı)
- **Katalog** — `GET /milestones` · `GET /badges`
- **Leaderboard** — `GET /leaderboard` (`?metric=current|longest`) · `GET /leaderboard/me` ·
  `GET /leaderboard/summary` (**public**, auth'suz)

`GET /leaderboard/summary` özel bir çözüm: guest kullanıcı `/leaderboard`'a 403 alıyor ama
guest sıralama ekranının gösterecek bir şeyi olması gerekiyor. Bu endpoint topluluk
toplamlarını döner — `totalRacers`, `longestSeconds` (mevcut rekor), `joinedToday`, `top` (ilk 3).
Dönen DTO'da **`userId` kasıtlı olarak yok** — anonim çağırana kullanıcı kimliği sızmasın.

**Senkron (`/users/me/sync`):** `localId` ile idempotent. Merge sırasında one-ACTIVE kuralını
zorlar — en erken `startedAt` kazanır, kaybedenler RELAPSED olur, insert öncesi flush edilir
ki partial unique index takılmasın.

### Test

**42 unit test** (JUnit + Mockito), 7 servis katmanı sınıfını kapsıyor:

| Test sınıfı | Test sayısı |
|---|---|
| `MilestoneNotificationServiceTest` | 8 |
| `LeaderboardServiceTest` | 7 |
| `AuthServiceTest` | 6 |
| `UserServiceTest` | 6 |
| `AchievementServiceTest` | 5 |
| `QuitAttemptServiceTest` | 5 |
| `SyncServiceTest` | 4 |
| `BackendApplicationTests` (context load) | 1 |

> Not: CV'lerde "39 unit test" yazıyor — repodaki güncel sayı 42 (context load testi hariç 41).
> Sitede hangisini kullanacağına karar ver.

Integration testleri (Testcontainers) ertelendi — Docker v29 / docker-java API-1.32 uyuşmazlığı.

## Mobil uygulama

**Stack:** React Native 0.85 · Expo 56 · TypeScript · Expo Router · React 19 ·
`@react-native-firebase` (app/auth/messaging) · Google Sign-In · Apple Authentication ·
Expo Notifications · `lucide-react-native` · `react-native-svg` · Reanimated 4 · i18next

**Ekranlar:** `login` · `settings` · tab'ler: `index` (ana/sayaç), `health` (sağlık),
`badges` (rozetler), `leaderboard` (sıralama)

**Diller:** Türkçe + İngilizce (`i18next`, `expo-localization` ile cihaz dilini yakalar)

### "Sükût" tasarım sistemi

Ana ekran için 8 yön denendikten sonra (v2–v8) "Sakin" yönü seçildi ve **Sükût** adıyla bir
sisteme dönüştürüldü.

**Felsefe: metafor değil, araç.** Sakin, tipografi öncelikli, bol boşluk, tek odak, hairline
çizgiler — kart tuzağından kaçınma.

Kurallar:
- Doğrulanmış kontrast ≥ 4.5:1
- Motion yalnızca durum değişimi için, dekorasyon için değil
- Tek tip ailesi, tabular sayılar
- Nötr renkler saf gri değil, teal'a çok hafif kaydırılmış
- **Kritik token kuralı:** teal veya amber **metin** olarak kullanılacaksa `primaryText`/`streak`
  (koyu tonlar) kullanılır, `primary` değil — light zeminde `primary` metin kontrastı geçmiyor
- İkonlar emojisiz — hepsi Lucide çizgi ikonları (`currentColor`, iOS/Android birebir aynı).
  Emoji "platform-tutarsız" diye elendi.

Tokenlar `src/constants/theme.ts` içinde, `Colors.light` / `Colors.dark`.

### Marka işareti — "Yörünge Q"

Q monogramı üzerinden birçok yön denendi (düz Q, QQ, nabız, diyafram, negatif boşluk, spiral,
yörünge). Seçilen: **Yörünge Q**.

**Anlam:** iç Q = kişi (yörüngenin durağan merkezi) · dış halka = geçen zaman ·
teal yay = kat edilen yol · **amber nokta = "şu an"** yörünge üzerinde.

Metafor değil — uygulamanın özünün (biriken zaman) soyutlaması. Sükût'un felsefesiyle birebir.

Tek kaynak `mark-color.svg` (viewBox 100×100); ondan iOS icon, Android adaptive katmanları,
monochrome siluet ve splash türetiliyor. Build script'i ImageMagick ile SVG→PNG supersample
yapıyor. Uygulama içinde `react-native-svg` ile tema-uyumlu `<BrandMark>` bileşeni olarak
aynı geometriyle yeniden çiziliyor.

## Çalışma tarzı (bu projede yerleşen)

**Ekran tasarımı = önce HTML mockup, sonra RN.** Her yeni ekran için `mobile/design/sukut/`
altında bir HTML mockup üretiliyor, Artifact olarak yayınlanıyor, onaylanınca RN'e uygulanıyor.
Mockup'lar `theme.ts` tokenlarını inline gömüyor ve light+dark toggle içeriyor.

## Portfolyo için öne çıkanlar

Site metnini yazarken kullanılabilecek gerçek, doğrulanabilir noktalar:

1. **İki kimlikli auth modeli** — Firebase kapıda kimlik kontrolü, kendi JWT'miz içerideki
   bileklik. Rotasyonlu refresh token, DB'de sadece hash.
2. **Veritabanı seviyesinde iş kuralı** — one-ACTIVE-attempt partial unique index'le zorlanıyor,
   servis katmanı kontrolüne güvenilmiyor.
3. **7 Flyway migration** — şema evrimi versiyonlu ve tekrarlanabilir, Hibernate hiç dokunmuyor.
4. **Idempotent senkron** — guest→registered geçişinde `localId` ile çift kayıt engelleniyor,
   merge one-ACTIVE'i koruyor.
5. **Yarış koşulu farkındalığı** — achievement kaydı push'tan önce, çünkü FCM hatası çift ödül
   yaratmamalı.
6. **Bilgi sızıntısı önleme** — public summary endpoint'i `userId` döndürmüyor.
7. **42 unit test**, 7 servis.
8. **Uçtan uca sahiplik** — domain modelinden marka işaretine kadar tek kişi.

## Görsel varlık ihtiyacı

- Mimari diyagram: `RN/Expo → Spring Boot → PostgreSQL` + `Scheduler → FCM` + Firebase auth akışı
- Ekran görüntüleri (9:16): sayaç ekranı, sağlık/milestone, rozetler, liderlik tablosu
- Marka işareti (Yörünge Q) SVG olarak kullanılabilir
