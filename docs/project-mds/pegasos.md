# Pegasos Hayvan Hastanesi

> Kaynak: `~/dev/pegasos` (repo okunarak yazıldı, 2026-08-04)

## Tek cümlelik tanım

Üç şubeli bir veteriner hastanesi için içerik yönetimli, SEO'ya optimize edilmiş kurumsal
web sitesi — headless CMS, serverless randevu formu ve KVKK uyumu düşünülmüş veri akışıyla.

## Kimlik

| Alan | Değer |
|---|---|
| Tip | Gerçek müşteri işi (freelance / dış proje) |
| Durum | Yayında |
| Rol | Tek geliştirici — frontend, CMS modellemesi, serverless backend, SEO, görsel pipeline |
| Ana stack | React 19 · Sanity CMS · AWS Lambda + API Gateway + SES |
| Dil | Site tamamen Türkçe |

## Neden var — problem

Bir veteriner hastanesi zincirinin kurumsal sitesi. Çözülmesi gerekenler:

- **İçeriği müşteri kendi yönetebilmeli** — hekim kadrosu, blog yazıları, hasta yorumları,
  Google puanı değiştiğinde geliştiriciye ihtiyaç duyulmamalı.
- **Randevu talebi gelmeli** — ama sadece bir form için sunucu işletmeye değmez.
- **Google'da bulunmalı** — SPA'nın klasik SEO problemi: arama motoru boş bir `<div>` görüyor.
- **KVKK'ya uygun olmalı** — kişisel veri toplayan bir form var ve bu Türkiye'de hukuki
  yükümlülük doğuruyor.

## Mimari

```
Ziyaretçi
   │
   ├──▶ React SPA (prerender edilmiş statik HTML)
   │        │
   │        └──▶ Sanity CDN (içerik: hekimler, blog, yorumlar, puan)
   │
   └──▶ Randevu formu
            │
            └──▶ API Gateway ──▶ Lambda (Python) ──▶ SES (e-posta bildirimi)
                                       │
                                       └──▶ DynamoDB (KVKK onay kaydı — planlandı)
```

## Frontend

**Stack:** React 19 · React Router 6 · Bootstrap 5 + Sass · Swiper / react-slick (slider) ·
Leaflet + Google Maps API (harita) · react-datepicker · react-phone-input-2

**Sayfalar** (14): ana sayfa · hakkımızda · hekimlerimiz + hekim detay · klinik hizmetler +
hizmet detay · şubeler + şube detay · blog listesi + blog detay · galeri · SSS · iletişim · 404

**SEO-friendly Türkçe URL yapısı:** `/hakkımızda`, `/hekimlerimiz`, `/klinik-hizmetler`,
`/sube/bornova`, `/hekim/aziz-azizoglu`, `/sık-sorulanlar`

Üç şube: Bornova · Küçükyalı · Çeşme

## İçerik yönetimi — Sanity CMS

Headless CMS olarak Sanity. Şemalar:

| Şema | İçerik |
|---|---|
| `teamMember` | Hekim kadrosu — profil, uzmanlık, fotoğraf |
| `blogPost` | Blog yazıları (Portable Text) |
| `testimonial` | Hasta yorumları |
| `generalRating` | Google puanı + toplam değerlendirme sayısı + Google linki |
| `instagramPost` | Instagram akışı |

Frontend `@sanity/client` ile GROQ sorguları atıyor, `useCdn: true` — okuma token'sız,
CDN üzerinden. İçerik `@portabletext/react` ile render ediliyor.

**Görsel hotspot desteği:** Sanity'nin hotspot verisi (`image.hotspot`) CSS
`object-position`'a çevriliyor (`services/imageUtils.js`). Böylece müşteri CMS'te bir hekim
fotoğrafının yüz bölgesini işaretlediğinde, görsel her en-boy oranında doğru noktadan
kırpılıyor. Hotspot yoksa varsayılan `{ x: 50, y: 20 }` — yani üst-orta, portre için
yüz bölgesi.

## SEO — prerender pipeline

SPA'nın arama motoru problemi Puppeteer tabanlı bir prerender adımıyla çözülüyor.

**Akış** (`build_steps.sh`):
```bash
npm run build      # CRA production build
npm run serve      # build'i localhost:3000'de sun
npm run prerender  # ayrı terminalde: Puppeteer her route'u gezip statik HTML yazar
```

`scripts/prerender.js` tanımlı route listesini (statik sayfalar + şubeler + hekim
slug'ları + blog slug'ları) tek tek açıyor, render edilmiş DOM'u alıp statik HTML olarak
kaydediyor. Sonuç: arama motoru boş `<div id="root">` yerine dolu sayfa görüyor,
ziyaretçi ise yüklendikten sonra normal SPA deneyimi yaşıyor.

> Yeni hekim veya blog yazısı eklenince route listesine slug eklemek gerekiyor — script
> içinde bunun için yorum satırı bırakılmış.

## Serverless backend

Sunucu yok. Randevu ve iletişim formları:

```
Form (React) ──▶ API Gateway ──▶ Lambda (Python, contact-form-handler-python) ──▶ SES
```

Lambda Python ile yazılmış, bağımlılıkları (`requests`, `certifi`, `urllib3`, `idna`,
`charset_normalizer`) `frontend/python/` altında paketli.

İki ayrı form var, tarihsel nedenlerle farklı yazılmışlar:
- Ana sayfa formu: `elements/appointment-form.jsx` (functional component)
- İletişim sayfası formu: `pages/contact-us.jsx` (class component)

## KVKK uyumu — analiz edilmiş, çözüm tasarlanmış

Projedeki en dikkate değer parça teknik değil, **regülasyon farkındalığı**.

**Tespit edilen sorun:** Her iki form da kullanıcıdan KVKK onayı alıyor (checkbox), ama bu
onay **hiçbir yerde kalıcı olarak saklanmıyor.** Lambda'ya sadece `kvkkAccepted: true`
gidiyor ve bu bilgi yalnızca e-posta bildirimi olarak iletiliyor.

Bir denetimde sorulacak soru: *"Kişi X, Y tarihinde size verilerini vermiş. Açık rızası var
mı? Kanıtlayın."* — Şu an bunu kanıtlayacak kayıt yok.

**Tasarlanan çözüm — DynamoDB `kvkk-consent-records` tablosu:**

```json
{
  "id": "uuid",
  "timestamp": "2026-03-16T09:55:32.000Z",
  "name": "Ad Soyad",
  "phone": "+905XXXXXXXXX",
  "ip": "85.102.xx.xx",
  "consentType": "appointment_form",
  "source": "homepage | contact_page",
  "acceptedDocuments": ["aydinlatma_metni.pdf", "acik_riza_metni.pdf"],
  "consentVersion": "v1.0",
  "ttl": 1742295332
}
```

Saklanan beş şey: **kim** onay verdi · **ne zaman** · **hangi metni** (belge listesi +
versiyon) · **hangi IP'den** (API Gateway `sourceIp`'inden) · **ne için**.

Tasarım kararları:
- **DynamoDB seçimi** — proje zaten AWS ekosisteminde, serverless, TTL desteği var,
  maliyeti çok düşük, Lambda'dan boto3 ile doğrudan erişilir.
- **TTL ile otomatik silme** — 3 yıl sonra kayıt kendiliğinden düşüyor; saklama süresi
  koda gömülü değil, veri seviyesinde.
- **Bölge `eu-north-1` (Stockholm)** — AB içinde, KVKK'ya göre "yeterli koruma bulunan ülke".
  Veri lokasyonu bilinçli seçilmiş.
- **Versiyonlanmış onay** — `consentVersion` alanı, metin değişirse kimin hangi sürümü
  onayladığı ayırt edilebilsin diye.
- **Frontend'de değişiklik gerekmiyor** — zaten `kvkkAccepted` gönderiliyor.

**Ayrıca not edilen açıklar:** VERBİS kaydı gerekliliği · kullanıcının "verilerimi sil"
diyebileceği mekanizma yok · iki form arasında KVKK link sayısı tutarsız (ana sayfada 2,
iletişimde 3).

> Durum: plan hazır, henüz uygulanmadı. Teknik altyapı yerinde; DynamoDB tablosu + Lambda
> güncellemesi kaldı. Dokümanda açıkça belirtilmiş: hukuki yeterlilik için avukata
> danışılması gerekiyor — teknik taraf ile hukuki taraf ayrı tutulmuş.

## Görsel pipeline

`image_resizer/resizer.py` — bağımsız bir Python aracı:

- Resimleri otomatik 1080p'ye küçültür ve **WebP**'ye çevirir
- **HEIC** desteği (`pillow-heif`) — iPhone'dan gelen fotoğraflar doğrudan işlenebiliyor
- **RAW** desteği (`rawpy` + numpy) — opsiyonel, kuruluysa devreye giriyor
- Her iki destek de `try/except ImportError` ile opsiyonel; kütüphane yoksa araç yine çalışıyor

Müşteri işlerinde sık karşılaşılan pratik bir problem: müşteri telefondan çektiği 8 MB'lık
HEIC dosyaları gönderiyor, site onları olduğu gibi servis edemez.

## Diğer detaylar

- **Çerez banner'ı** (`cookie-banner.jsx`) ve **analytics tracker** (`analytics-tracker.jsx`)
- **Harita** — hem Leaflet hem Google Maps API kullanımda (şube konumları)
- Config env değişkenlerinden: `REACT_APP_SANITY_PROJECT_ID`, `_DATASET`, `_API_VERSION`

## Portfolyo için öne çıkanlar

Bu proje diğerlerinden farklı bir yeteneği gösteriyor: **gerçek müşteriyle çalışma ve
teknik olmayan kısıtları teknik çözüme çevirme.**

1. **Headless CMS modellemesi** — müşterinin geliştiriciye ihtiyaç duymadan içerik
   yönetebildiği 5 şema.
2. **SPA + SEO problemi** — Puppeteer prerender pipeline'ı ile çözülmüş, Türkçe
   SEO-friendly URL'ler.
3. **Serverless maliyet kararı** — bir form için sunucu işletmek yerine API Gateway +
   Lambda + SES.
4. **Regülasyon farkındalığı** — KVKK açığını kendisi tespit etmiş, denetim senaryosunu
   yazmış, TTL'li ve versiyonlanmış bir onay kayıt sistemi tasarlamış, veri lokasyonunu
   AB bölgesine göre seçmiş, hukuki tarafı kendi işi olarak görmemiş.
5. **Editör deneyimi detayı** — Sanity hotspot → CSS `object-position` eşlemesi.
6. **Pratik araç yazma** — HEIC/RAW dosyaları WebP'ye çeviren, bağımlılıkları opsiyonel
   olan görsel pipeline.

## Görsel varlık ihtiyacı

- Mimari diyagram: React SPA + Sanity CDN + API Gateway/Lambda/SES/DynamoDB
- Site ekran görüntüleri (16:10): ana sayfa, hekim listesi, şube detayı, blog
- İstenirse: KVKK onay kaydı akış diyagramı

## Dikkat — site metnini yazarken

Müşteri işi olduğu için hangi bilgilerin paylaşılabileceğine dikkat edilmeli. Hastane adı ve
sitenin kendisi zaten kamuya açık, ancak müşteri iç iletişimi (KVKK dokümanının sonundaki
"Pegasos tarafında söylenecekler" bölümü gibi) siteye girmemeli.
