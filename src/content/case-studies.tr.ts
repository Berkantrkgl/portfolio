import type { CaseStudy } from "@/content/case-studies";
import type { ProjectSlug } from "@/content/projects";

/**
 * Turkish mirror of `case-studies.ts`. Same object shape, same keys, same
 * ordering — only the prose is translated. Types live in the English file.
 */

const quitqos: CaseStudy = {
  problem:
    "Sigarayı bırakan biri ilk günlerde motivedir, sonra o his hızla söner. İnsanı asıl orada tutacak şey, ilerlemesini görmesi. Ama kimse ilerlemesini görmek için uygulamayı her gün açmaz. Yani uygulama kapalıyken de çalışmak zorunda: bir sağlık eşiğine ulaşıldığında bunu kendisi fark edip kullanıcıya bildirim göndermesi gerekiyor. Bir şart daha vardı: bunların hiçbiri hesap açmayı gerektirmemeli. Kayıt sadece verisini başka cihaza taşımak ya da leaderboard'a girmek isteyenler için.",
  built: [
    {
      title: "Firebase Auth'u nasıl kullandım",
      body: "Firebase'e tek bir iş yaptırıyorum: bu kişi gerçekten bu Google ya da Apple hesabının sahibi mi? Dönen ID token'ı bir kez doğruluyorum, sonra kendi access JWT'mi ve refresh token'ımı üretiyorum. Firebase bir daha hiç çağrılmıyor. Refresh tek kullanımlık; token'ın kendisi veritabanında durmuyor, sadece SHA-256 hash'i saklanıyor.",
    },
    {
      title: "İş kurallarını veritabanı garanti ediyor",
      body: "Bir kullanıcının aynı anda tek bir ACTIVE denemesi olabilir. Bunu servis katmanında if ile kontrol etmiyorum, çünkü araya race condition girebilir; kural PostgreSQL'de partial unique index olarak duruyor, yani veritabanı zaten izin vermiyor. Guest verilerini kayıtlı hesaba aktarırken de aynı kural geçerli: en erken başlayan deneme aktif kalıyor, diğerleri relapsed olarak kapanıyor.",
    },
    {
      title: "Aynı ödülü iki kez veremeyen scheduler",
      body: "Bir @Scheduled job 60 saniyede bir aktif denemeleri tarıyor: önce achievement kaydını oluşturuyor, badge'i veriyor, push bildirimini ancak bundan sonra gönderiyor. Bu sıra bilinçli. Eğer önce push gönderilse ve FCM geçici bir hata verse, bir sonraki turda aynı badge ikinci kez dağıtılırdı. Kullanıcı bildirimleri kapatmışsa ya da kayıtlı bir device token yoksa push adımı tamamen atlanıyor, ama achievement gene de kaydediliyor.",
    },
    {
      title: "Şemayı migration'lar yönetiyor, ORM değil",
      body: "Yedi ayrı Flyway migration'ı şemayı ilk beş tablodan bugünkü haline taşıyor: kullanıcı bazlı locale desteği ve çevrilmiş milestone içerikleri dahil. Hibernate ddl-auto=validate ile çalışıyor, yani mevcut şemayı sadece doğrulayabiliyor, üzerinde değişiklik yapamıyor. Her ortam aynı migration dosyalarını aynı sırayla çalıştırdığı için hepsi birebir aynı şemaya sahip oluyor.",
    },
    {
      title: "Kimseyi ifşa etmeyen public endpoint",
      body: "Kayıt olmayan kullanıcılar leaderboard isteğinde 403 alıyordu, dolayısıyla sıralama ekranı onlar için tamamen boş kalıyordu. Bunun için küçük bir public endpoint yazdım: topluluğun genel toplamlarını ve ilk üçü dönüyor. Döndüğü DTO'da userId alanı bilerek yok. Yani giriş yapmamış biri genel tabloyu görebiliyor ama kimin kim olduğunu göremiyor.",
    },
    {
      title: "Yazmakla bitmiyor, yayına almak da var",
      body: "Uygulama App Store'da yayında. Backend Hetzner'da, ortak bir edge proxy arkasında çalışıyor; backend'e dokunan her push'ta GitHub Actions otomatik deploy ediyor. Buraya gelene kadar feature yazmakla hiç ilgisi olmayan bir sürü iş çıktı: Apple zorunlu tuttuğu için uçtan uca hesap silme akışı, gizlilik ve destek sayfaları, Firebase pod'ları yüzünden iOS tarafında static framework linkleme derdi ve App Store incelemesinde silme butonuna ulaşamadıkları için baştan scroll'lanabilir hale getirdiğim ayarlar ekranı.",
    },
  ],
  stack: [
    { label: "Backend", value: "Java 21 · Spring Boot 4.1 · Spring JPA · Spring Security · Maven" },
    { label: "Veri", value: "PostgreSQL (Aiven) · Flyway" },
    { label: "Auth & push", value: "Firebase Auth · JWT · FCM" },
    { label: "Test", value: "JUnit · Mockito" },
    { label: "Mobil", value: "React Native 0.85 · Expo 56 · TypeScript · i18next" },
    { label: "Altyapı", value: "Hetzner · Docker Compose · GitHub Actions · EAS" },
  ],
  numbers: [
    { value: "20", caption: "REST endpoint" },
    { value: "42", caption: "unit test" },
    { value: "7", caption: "Flyway migration" },
    { value: "13", caption: "sağlık eşiği" },
  ],
  screenshots: {
    heading: "Uygulama",
    variant: "phone",
    shots: [
      {
        src: "/shots/quitqos/timer.webp",
        label: "quit timer",
        caption: "Bıraktığın andan itibaren çalışan canlı sayaç",
      },
      {
        src: "/shots/quitqos/auth.webp",
        label: "sign-in",
        caption: "Giriş ekranı — istersen hesap açmadan da devam edebiliyorsun",
      },
      {
        src: "/shots/quitqos/settings.webp",
        label: "settings",
        caption: "Streak istatistikleri, eşik bildirimleri, Türkçe ve İngilizce dil desteği",
      },
    ],
  },
};

const paceup: CaseStudy = {
  problem:
    "Kendim de yapay zekadan koşu programı istiyordum. Her seferinde yaşımı, kilomu, mevcut tempomu, haftada kaç gün müsait olduğumu baştan anlatmam gerekiyordu. Karşılığında aldığım şey de bir listeydi. Sorun da oradaydı: program sohbetin içinde metin olarak kalıyor, bir süre sonra geri dönüp bakmıyorsun ve kopuyorsun. PaceUp'ta profilini bir kez giriyorsun; chatbot seni zaten tanıdığı için sonrasında sadece hedefini söylüyorsun — “üç ay sonra yarı maraton koşmak istiyorum” gibi. Onay verdiğin anda program uygulamanın takvimine gün gün yerleşiyor. Antrenmanları oradan işaretliyorsun, uygulama da bir gün öncesinden bildirim atıp hatırlatıyor.",
  built: [
    {
      title: "Tek kayıt, dört bağımsız etki",
      body: "Kullanıcı bir antrenmanı tamamlayıp kaydettiğinde tek bir WorkoutResult oluşuyor, gerisini Django signal'ları hallediyor: antrenman tamamlandı olarak işaretleniyor, programın sayacı ilerliyor, kullanıcının istatistikleri ve streak'i yeniden hesaplanıyor, achievement kontrolü tetikleniyor ve gerekiyorsa bildirim gönderiliyor. Her etki kendi Django app'inde, birbirinden bağımsız duruyor. Kullanıcı kaydı sildiğinde aynı zincir ters yönde çalışıyor, böylece sayaçlar ve streak'ler tutarlı kalıyor.",
    },
    {
      title: "Aynı anda gelen isteklerde şaşmayan sayaçlar",
      body: "Program ve kullanıcı sayaçlarını F() expression'ları ile artırıyorum. Yani toplama işlemi Python tarafında oku-değiştir-yaz şeklinde değil, doğrudan veritabanının içinde yapılıyor. Aynı saniyede tamamlanan iki antrenman birbirinin sayacını ezmiyor.",
    },
    {
      title: "Abonelik doğrulaması iki kez çalışsa da sorun olmuyor",
      body: "RevenueCat doğrulamasının idempotent olması şart, çünkü aynı satın almayı hem webhook hem uygulamanın kendisi aynı anda onaylamaya çalışabiliyor. Eşleştirmeyi RevenueCat'in app user id'si ve store'un hiç değişmeyen original transaction id'si üzerinden yapıyorum; bu id sonradan bir iade ya da itiraz olduğunda izi sürmek için de kullanılıyor. Son doğrulamanın zaman damgasını da hata ayıklamak için saklıyorum.",
    },
    {
      title: "Yapmadığı işi yaptım diyemeyen LLM",
      body: "Agent'ın elindeki tool'ları ikiye ayırdım. UI tool'ları serbest metin döndürmek yerine uygulamada tipi belli bir form açıyor. Gerçekten veritabanına yazan tek bir backend tool'u var: create_workout_plan. Model “programını hazırladım” yazsa bile bu tek başına bir şey ifade etmiyor; program ancak o backend tool'u gerçekten çalıştıysa ortaya çıkıyor.",
    },
    {
      title: "İki servis, tek auth sistemi",
      body: "FastAPI servisi, Django'nun ürettiği JWT'leri aynı signing key ile HS256 üzerinden doğruluyor ve aynı PostgreSQL veritabanını okuyor. Böylece ikinci bir login ekranı, token değiş tokuşu ya da senkron tutulması gereken ikinci bir kullanıcı tablosu gerekmiyor. LangGraph'ın checkpointer'ı da sohbetleri servis yeniden başlasa veya deploy alsa bile kaldığı yerden devam ettiriyor.",
    },
  ],
  stack: [
    { label: "Backend", value: "Python 3.12 · Django 6 · DRF · SimpleJWT · django-q2" },
    { label: "AI servisi", value: "FastAPI · LangGraph · LangChain · AWS Bedrock · SSE" },
    { label: "Veri", value: "Aiven managed PostgreSQL · S3" },
    { label: "Altyapı", value: "Hetzner · Docker Compose · Caddy · GitHub Actions" },
    { label: "Mobil", value: "TypeScript · Expo · React Native · RevenueCat" },
  ],
  numbers: [
    { value: "3", caption: "servis, tek monorepo" },
    { value: "6", caption: "Django app'i" },
    { value: "18+", caption: "REST endpoint" },
    { value: "4", caption: "signal receiver" },
  ],
  screenshots: {
    heading: "Uygulama",
    variant: "phone",
    shots: [
      {
        src: "/shots/paceup/home.webp",
        label: "home",
        caption: "Günün antrenmanı; mesafe ve streak bilgisi signal'lardan geliyor",
      },
      {
        src: "/shots/paceup/calendar.webp",
        label: "calendar",
        caption: "Oluşturulan program, gün gün takvime dağıtılmış halde",
      },
      {
        src: "/shots/paceup/plans.webp",
        label: "plans",
        caption: "Aktif program — 12 hafta boyunca 48 antrenman",
      },
      {
        src: "/shots/paceup/profile.webp",
        label: "profile",
        caption: "Profil ve premium üyelik durumu, RevenueCat ile doğrulanıyor",
      },
    ],
  },
};

const pegasos: CaseStudy = {
  problem:
    "Üç şubeli bir veteriner hastanesinin sitesini yaptım. Müşterinin en önemli isteği şuydu: doktor kadrosunu, blog yazılarını, hasta yorumlarını ve Google puanını her seferinde bana haber vermek zorunda kalmadan kendileri güncelleyebilsinler. Sitenin Google'da üst sıralarda çıkması da gerekiyordu, ama tarayıcıda render edilen bir SPA bunu tek başına sağlayamıyor. Bir de randevu formu üzerinden kişisel veri toplanıyor; bu Türkiye'de KVKK kapsamında yasal sorumluluk demek.",
  built: [
    {
      title: "İçeriğin sahibi gerçekten müşteri",
      body: "Sitede değişebilecek her şey için Sanity'de beş şema kurdum: ekip üyeleri, blog yazıları, hasta yorumları, genel puan ve Instagram akışı. Site bu içerikleri CDN üzerinden, token gerektirmeden okuyor. Sanity'nin image hotspot özelliğini CSS object-position'a bağladım; böylece hastane çalışanı bir doktorun fotoğrafında yüzün olduğu yeri işaretlediğinde, fotoğraf sitedeki farklı boyutların hepsinde doğru kadrajda kalıyor.",
    },
    {
      title: "Arama motorlarının okuyabildiği SPA",
      body: "Build bittikten sonra çalışan bir Puppeteer adımı sitedeki bütün sayfaları tek tek geziyor: sabit sayfalar, üç şube, her doktor ve her blog yazısı. Gezdiği her sayfanın render edilmiş HTML'ini diske yazıyor. Böylece Google'ın botu boş bir div yerine içeriği dolu bir sayfa görüyor, ziyaretçi ise sayfa yüklendikten sonra normal SPA deneyimini yaşamaya devam ediyor. URL'ler de query string'e gömülü id'ler değil, Türkçe ve okunabilir adresler.",
    },
    {
      title: "İletişim formu için sunucu tutmadım",
      body: "Randevu ve iletişim formları API Gateway üzerinden bir Python Lambda'ya gidiyor, Lambda da SES ile mail gönderiyor. Ortada sürekli ayakta tutulacak, güncellemesi takip edilecek bir sunucu yok. Maliyet de sitenin gerçekten aldığı günlük birkaç form kadar.",
    },
  ],
  stack: [
    { label: "Front end", value: "React 19 · React Router · Sass · Swiper · Leaflet" },
    { label: "CMS", value: "Sanity · GROQ · Portable Text" },
    { label: "Serverless", value: "AWS API Gateway · Lambda (Python) · SES · DynamoDB" },
    { label: "SEO", value: "Puppeteer prerender · Türkçe route slug'ları" },
    { label: "Araçlar", value: "Pillow · pillow-heif · rawpy — HEIC/RAW → WebP" },
  ],
  role:
    "Projenin tek geliştiricisiydim: front end, CMS modellemesi, serverless backend ve SEO pipeline'ı.",
  screenshots: {
    heading: "Site",
    variant: "wide",
    shots: [
      {
        src: "/shots/pegasos/home.webp",
        label: "home",
        caption: "Ana sayfa — hero slider, arama motorları için prerender ediliyor",
      },
      {
        src: "/shots/pegasos/appointment.webp",
        label: "appointment",
        caption: "API Gateway ve Lambda üzerinden ilerleyen randevu formu",
      },
      {
        src: "/shots/pegasos/reviews.webp",
        label: "services",
        caption: "Hizmetler ve Google puanı — ikisini de müşteri Sanity'den güncelliyor",
      },
      {
        src: "/shots/pegasos/doctors.webp",
        label: "doctors",
        caption: "Doktor profilleri; kadraj müşterinin CMS'te işaretlediği hotspot'a göre ayarlanıyor",
      },
    ],
  },
};

export const caseStudiesTr: Record<ProjectSlug, CaseStudy> = { quitqos, paceup, pegasos };
