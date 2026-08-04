# PaceUp

> Kaynak: `~/dev/paceup` (repo okunarak yazıldı, 2026-08-04)

## Tek cümlelik tanım

AI koşu koçu: kullanıcı hedefini doğal dille anlatır, chatbot ona kişiselleştirilmiş bir
antrenman programı üretir ve program uygulama içi takvime gün gün yerleşir.

## Kimlik

| Alan | Değer |
|---|---|
| Tip | Kişisel proje |
| Durum | Production'da çalışıyor |
| Repo | Public — MIT lisanslı |
| Rol | Tek geliştirici — 3 servisin tamamı + altyapı |
| Ana stack | Python 3.12 · Django 6 · FastAPI · LangGraph |

## ⚠️ Önemli: dağıtım gerçeği

**PaceUp şu anda Hetzner'da çalışıyor** (`paceup-prod-1`), Caddy otomatik HTTPS ve Aiven
managed PostgreSQL ile.

Daha önce **AWS ECS Fargate + shared ALB + ACM wildcard + Route 53** üzerinde koşuyordu,
sonra Hetzner'a taşındı.

> CV'lerde (`BerkanResumeD.pdf`, `Berkan_ResumeJ.pdf`) hâlâ AWS/ECS kurulumu anlatılıyor —
> repo güncel olan. Sitede **Hetzner mimarisini** göster. ECS→Hetzner göçü saklanacak değil,
> anlatılacak bir hikâye: maliyet/karmaşıklık gerekçesiyle yapılmış bilinçli bir mimari karar.

## Neden var — problem

Koşu planı yapmak form doldurmakla olmuyor. Kullanıcı "3 ay sonra yarı maraton koşmak
istiyorum, haftada 3 gün müsaitim" diyebilmeli ve karşısında yapılandırılmış bir program
bulmalı.

Teknik tarafta çözülmesi gerekenler:

- Tek bir antrenman kaydı; istatistikleri, başarımları, bildirimleri ve program ilerlemesini
  tetiklemeli — ama isteği yavaş, kırılgan bir yan-etki yığınına çevirmeden.
- Abonelik ödemeleri, webhook'lar ve client olayları birbiriyle yarışırken doğru kalmalı.
- LLM'in ürettiği plan serbest metin değil, takvime oturan tipli veri olmalı.

## Mimari — üç servisli monorepo

```
paceup/
├── backend/   — Django 6 + DRF REST API (auth, programs, activity, stats, notifications)
├── mobile/    — Expo / React Native (TypeScript) — kullanıcıya bakan client
└── chatapi/   — FastAPI + LangGraph — planı üreten AI koç
```

Servisler nasıl konuşuyor:

```
                 ┌─────────────┐
                 │   mobile    │  (Expo / React Native)
                 └──────┬──────┘
            REST API    │    SSE chat stream
          ┌─────────────┴──────────────┐
          ▼                            ▼
   ┌─────────────┐  paylaşılan  ┌─────────────┐
   │  backend    │◄── secret ──►│   chatapi   │
   │  (Django)   │              │  (FastAPI)  │
   └──────┬──────┘              └──────┬──────┘
          │    aynı PostgreSQL         │
          └────────────┬───────────────┘
                       ▼
                  ┌─────────┐
                  │ Postgres│
                  └─────────┘
```

- `mobile` → `backend` REST ile, `chatapi` ile SSE stream üzerinden konuşur.
- `chatapi`, JWT'yi **backend ile aynı** `DJANGO_SECRET_KEY` kullanarak doğrular (HS256).
  Biri değişirse ikisi de değişmeli.
- `chatapi` ve `backend` **aynı** PostgreSQL'i paylaşır.

**Monorepo geçmişi:** eskiden üç ayrı private repoydu (`paceup-backend`, `paceup-frontend`,
`paceup-graph-api`). Git subtree ile, **commit geçmişleri korunarak** tek repoya birleştirildi.

## Backend (Django)

**Stack:** Python 3.12 · Django 6.0 · Django REST Framework 3.16 · SimpleJWT · PostgreSQL ·
S3 (django-storages) · django-q2 (async task queue) · boto3

### 6 Django app

| App | Modeller | Sorumluluk |
|---|---|---|
| `users` | `User`, `ChatSession`, `RevenueCatWebhookEvent` | Kimlik, profil, premium/abonelik durumu, chat oturumu |
| `programs` | `Program`, `Workout` | Antrenman programı ve içindeki tipli antrenmanlar |
| `activity` | `WorkoutResult` | Tamamlanan antrenman kaydı |
| `gamification` | `Achievement` | Başarımlar |
| `notifications` | `Notification` | Bildirim kaydı + push gönderimi |
| `analytics` | — (model yok) | Özet, grafik ve program istatistikleri (`summary/`, `charts/`, `program/`) |

### Event-driven tasarım — Django signals

Projenin çekirdek fikri: **tek bir `WorkoutResult` kaydı bir zincir tetikler.**

```
WorkoutResult kaydedilir (post_save)
   ├─▶ Workout.is_completed = True, status = 'completed'
   ├─▶ Program.completed_workouts_count += 1  (F() expression ile atomik)
   ├─▶ User istatistikleri güncellenir (toplam antrenman, mesafe, süre)
   ├─▶ Seri (streak) yeniden hesaplanır
   └─▶ Achievement kontrolü (post_save) ─▶ Notification (post_save) ─▶ push
```

Kayıt silinince (`post_delete`) aynı zincir geri sarılıyor.

Toplam **4 signal receiver**:
- `activity`: `post_save` + `post_delete` on `WorkoutResult`
- `gamification`: `post_save` on `User`
- `notifications`: `post_save` on `Achievement`

Sayaç güncellemeleri `F()` expression'la yapılıyor — yarış koşulunda okuma-değiştirme-yazma
yerine veritabanı seviyesinde atomik artırım.

### Veri modeli — dikkat çeken kısımlar

**`Program`** — UUID PK. `status` (active/inactive/completed), `duration_weeks`,
`running_days` (JSONField, örn. `[0, 2, 4]`), `total_workouts_count` /
`completed_workouts_count` (denormalize sayaçlar). Hesaplanan property'ler:
`current_week_calculated`, `progress_percent`.

**`Workout`** — dört tip: `easy` · `long` · `tempo` · `interval`. Üç durum:
`scheduled` · `completed` · `missed`. `planned_distance`, `planned_duration`,
`target_pace_seconds`.

> Modelde `REST` antrenman tipi ve `SKIPPED` durumu bilinçli olarak **kaldırılmış** — model
> sadeleştirme kararı, kod yorumlarında işaretli.

**`User`** (AbstractUser genişletmesi, UUID PK, `USERNAME_FIELD = 'email'`) — üç ayrı
sorumluluk kümesi taşıyor:

- *Profil*: yaş, cinsiyet, kilo, boy, profil fotoğrafı (S3)
- *Koşu*: `max_runned_distance`, `current_pace` (sn/km), `preferred_running_days`,
  toplam antrenman/mesafe/süre, `current_streak`, `longest_streak`
- *Premium*: `is_premium`, `premium_type` (monthly/yearly), `premium_expires_at`,
  `premium_will_renew`, `reschedules_used_this_month`
- *RevenueCat*: `rc_app_user_id` (unique, indexed), `store` (app_store/play_store),
  `original_transaction_id` (Apple/Google'ın değişmez ID'si — refund/dispute referansı),
  `premium_last_verified_at`
- *Bildirim tercihleri*: `push_token`, `timezone`, `preferred_reminder_time`, ve dört ayrı
  toggle (antrenman hatırlatma / haftalık rapor / başarımlar / plan güncellemeleri)
- *Onboarding*: `is_onboarded` + dört ayrı tur bayrağı (home/calendar/plans/profile)

### Abonelikler — RevenueCat

`users/revenuecat.py` + `users/webhooks.py`. `RevenueCatWebhookEvent` modeli gelen
webhook'ları kaydediyor.

Zor kısım: **webhook ve client aynı satın almayı aynı anda doğrulamaya çalışabiliyor.**
Doğrulama idempotent olmak zorunda — `rc_app_user_id` ve `original_transaction_id`
üzerinden eşleştirme yapılıyor, `premium_last_verified_at` ile son doğrulama zamanı
izleniyor.

### Kimlik doğrulama

SimpleJWT (`token/`, `token/refresh/`) + sosyal giriş: `auth/google/` ve `auth/apple/`.
Mobil tarafta e-posta/parola, Google Sign-In ve Sign in with Apple destekleniyor.

### Async işler

`django-q2` + `croniter`. `notifications/tasks.py` ve management command'ları ile
zamanlanmış işler — her antrenmandan bir gün önce hatırlatma bildirimi.

## chatapi (FastAPI + LangGraph)

**Stack:** Python 3.12 · FastAPI · LangGraph · LangChain · AWS Bedrock · SSE
(`sse-starlette`) · PyJWT

**Yapı:**

```
chatapi/
├── main.py                    — FastAPI app, JWT doğrulama, SSE endpoint
└── agent/
    ├── agent.py               — LangGraph workflow (build_workflow)
    └── utils/
        ├── nodes.py           — graph node'ları
        ├── tools.py           — agent tool'ları
        ├── prompts.py         — prompt'lar
        ├── state.py           — graph state tanımı
        ├── helper_agents.py   — yardımcı agent'lar
        ├── helper_functions.py— checkpointer, tool response formatlama
        └── config.py
```

**Endpoint'ler:** `GET /health` · `POST /chat-stream` (SSE)

### Tasarımın ilginç yanı — UI tool'ları

Agent'ın tool'ları iki gruba ayrılmış:

**UI tool'ları** (`ALLOWED_UI_TOOLS`) — agent bunları çağırınca mobil uygulamada
yapılandırılmış bir form/kart açılıyor, serbest metin değil:
- `request_runner_profile`
- `request_program_setup`
- `request_availability_preferences`
- `request_plan_confirmation`

**Backend tool'ları** (`NOTIFIABLE_BACKEND_TOOLS`) — gerçek yan etki üretenler:
- `create_workout_plan`

Bu ayrım sayesinde LLM "programı oluşturdum" diye halüsinasyon göremiyor; plan ancak
gerçek backend tool'u çalışınca oluşuyor ve mobil ona göre bildiriliyor.

**Kimlik:** `HTTPBearer` ile gelen JWT, backend'in `DJANGO_SECRET_KEY`'i kullanılarak HS256
ile doğrulanıyor. Servis boot'ta bu env yoksa **fail-fast** (`RuntimeError`).

**Konuşma durumu:** LangGraph checkpointer ile kalıcı — konuşma reload/redeploy sonrası
devam ediyor. `users/langgraph_cleanup.py` backend tarafında eski state'i temizliyor.

## Mobil

**Stack:** TypeScript · Expo · React Native · Expo Router · RevenueCat

**Özellikler:**
- AI koç sohbeti (SSE stream)
- Takvim tabanlı planlar — üretilen antrenmanlar gün gün takvimde
- Tipli antrenmanlar (Easy / Long / Tempo / Interval), her biri kendi tempo ve mesafe hedefiyle
- İstatistik sohbeti — chatbot'a kendi verisi hakkında soru sorma
- Hatırlatmalar — her antrenmandan bir gün önce bildirim
- Auth: e-posta/parola, Google Sign-In, Sign in with Apple

## Production altyapısı

**Sunucu:** Hetzner `paceup-prod-1`

```
mobile ──REST──▶ api.paceup.<domain> ─┐
mobile ──SSE───▶ chatbot.<domain> ────┤  Caddy (otomatik HTTPS)
                                       ├─▶ django:8000
                                       └─▶ graph-api:8001

django & graph-api ──▶ Aiven managed PostgreSQL (harici, DB container yok)
```

- Caddy sertifikaları otomatik alıyor ve yeniliyor
- Veritabanı harici managed servis — sunucuda DB container'ı yok
- Secret'lar `.env.django`, `.env.graph`, `.env.caddy` dosyalarında, sadece sunucuda,
  gitignore'lu

### CI/CD — GitHub Actions

**Akış:** `main`'e push → `dorny/paths-filter` hangi servisin değiştiğini bulur →
`appleboy/ssh-action` ile sunucuya SSH → `git reset --hard origin/main` + **sadece değişen
servisi** rebuild.

Path filtreleri:
- `backend/**` → django
- `chatapi/**` → graph-api
- `Caddyfile` → caddy
- `docker-compose.prod.yml` → hepsi
- `workflow_dispatch` ile manuel tetikleme + servis seçimi

**Deploy komutu:**
```bash
docker compose -p paceup -f docker-compose.prod.yml up -d --build --no-deps <svc>
```

İki bayrak kritik:
- `-p paceup` — sabit proje adı, mevcut Caddy TLS volume'larını yeniden kullanır. Olmasa
  sertifika her deploy'da yeniden alınır, Let's Encrypt rate-limit'ine takılırdı.
- `--no-deps` — olmadan `depends_on` yüzünden tek servisin rebuild'i diğerlerini de restart
  ederdi (graph-api rebuild'i django'yu da düşürürdü).

**Deploy key notu:** repo public olduğu için sunucu monorepoyu HTTPS ile çekiyor; SSH key
sadece Actions→sunucu bağlantısı için.

## Güvenlik / config disiplini

Repo public olduğu için sıkı bir kural var: **hiçbir gerçek değer kaynak koda hardcode
edilmiyor.**

- backend / chatapi: `os.getenv` → `.env`
- mobile: `process.env.EXPO_PUBLIC_*` → `mobile/.env` (Expo build-time'da inline eder)
- Her serviste `.env.example` (placeholder'lı, commit'li) + `.env` (gerçek, gitignore'lu)
- Placeholder'lar: `your-domain.com`, `your-s3-bucket-name`, `com.example.PaceUp`,
  `your-revenuecat-ios-key` vb.

Docker compose dosyaları ayrılmış: `backend/docker-compose.yml` ve `chatapi/docker-compose.yml`
**sadece local dev** için; kökteki `docker-compose.prod.yml` production.

## Portfolyo için öne çıkanlar

1. **Event-driven backend** — tek antrenman kaydı signals ile istatistik, başarım, bildirim
   ve program ilerlemesini tetikliyor; hepsi birbirinden bağımsız.
2. **Atomik sayaçlar** — `F()` expression ile yarış koşullarına dayanıklı artırım.
3. **Yarış-güvenli abonelikler** — webhook ve client aynı satın almayı doğrulamaya çalışırken
   idempotent kalan RevenueCat entegrasyonu.
4. **İki servis, tek secret** — chatapi backend'in JWT'sini aynı anahtarla doğruluyor;
   ayrı auth sistemi kurmaya gerek yok.
5. **LLM'e sınır çizme** — UI tool'ları / backend tool'ları ayrımı, halüsinasyonla plan
   oluşturmayı imkânsız kılıyor.
6. **Path-filtreli CI/CD** — sadece değişen servis rebuild, `-p` ve `--no-deps` ile
   sertifika ve komşu servis korunuyor.
7. **AWS → Hetzner göçü** — ECS Fargate'ten Caddy + managed Postgres'e taşınmış bilinçli
   mimari karar.
8. **Git subtree ile monorepo birleştirme** — üç repo, geçmişleri kaybolmadan tek repoya.

## Görsel varlık ihtiyacı

- Mimari diyagram: mobile → Caddy → django/graph-api → Aiven Postgres (README'deki ASCII
  diyagram temel alınabilir)
- İkinci diyagram: signal zinciri (WorkoutResult → stats/achievement/notification)
- Ekran görüntüleri (9:16): AI koç sohbeti, takvim, antrenman detayı, istatistikler
