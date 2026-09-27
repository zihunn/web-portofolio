const DEFAULT_PORTFOLIO = [
  {
    id: 'superapps-borneo',
    img: '/assets/image/portfolio/borneo-cover.webp',
    title: 'SuperApps Borneo',
    desc: 'Platform super app terintegrasi dengan layanan web dan mobile untuk masyarakat Kalimantan',
    fullDesc: 'Platform super app yang menggabungkan berbagai layanan digital dalam satu ekosistem terintegrasi. Dibangun dengan arsitektur multi-tenant menggunakan Laravel dan React untuk web, serta Flutter untuk aplikasi mobile. Sistem ini mencakup manajemen pengguna, transaksi, notifikasi real-time, dan berbagai modul layanan publik yang dapat diakses melalui web maupun mobile.',
    category: 'web',
    badge: 'Web + Mobile',
    skills: ['Laravel', 'React', 'PostgreSQL', 'Supabase', 'Docker', 'Flutter'],
    screenshots: [
      '/assets/image/portfolio/borneo-cover.webp',
      '/assets/image/portfolio/borneo-01.png',
      '/assets/image/portfolio/borneo-02.png',
      '/assets/image/portfolio/borneo-03.png',
      '/assets/image/portfolio/borneo-04.png',
      '/assets/image/portfolio/borneo-05.png',
      '/assets/image/portfolio/borneo-06.png',
      '/assets/image/portfolio/borneo-07.png',
    ],
  },
  {
    id: 'bion-bulog',
    img: '/assets/image/portfolio/bion-cover.webp',
    title: 'BION Bulog',
    desc: 'Sistem komunikasi internal berbasis web untuk digitalisasi operasional BULOG',
    fullDesc: 'Sistem komunikasi internal berbasis web yang dikembangkan untuk mendukung operasional digital BULOG. Membangun dan mengelola 20+ fitur utama, termasuk dashboard, manajemen data, modul komunikasi, dan role-based access. Mengimplementasikan sistem multi-role dengan 4+ level pengguna untuk mendukung alur kerja internal, digunakan oleh 800+ pengguna internal aktif.',
    category: 'web',
    badge: 'Web App',
    skills: ['Laravel', 'React', 'MySQL', 'REST API'],
    screenshots: [
      '/assets/image/portfolio/bion-cover.webp',
      '/assets/image/portfolio/bion-01.jpeg',
      '/assets/image/portfolio/bion-02.jpeg',
      '/assets/image/portfolio/bion-03.jpeg',
      '/assets/image/portfolio/bion-04.png',
      '/assets/image/portfolio/bion-05.png',
    ],
  },
  {
    id: 'saku',
    img: '/assets/image/portfolio/saku-01.png',
    title: 'SAKU - Sistem Administrasi Keuangan',
    desc: 'Sistem administrasi keuangan mahasiswa berbasis web untuk Institut Teknologi dan Kesehatan Mahardika',
    fullDesc: 'Sistem administrasi keuangan yang dikembangkan untuk mendukung pengelolaan keuangan mahasiswa di Institut Teknologi dan Kesehatan Mahardika. Mencakup manajemen tagihan SPP, pembayaran, laporan keuangan, dan rekap data per periode. Sistem ini digunakan oleh bagian keuangan kampus untuk menggantikan proses manual yang sebelumnya dilakukan dengan spreadsheet.',
    category: 'web',
    badge: 'Web App',
    skills: ['React', 'Laravel', 'MySQL', 'PHP', 'JavaScript'],
    screenshots: [
      '/assets/image/portfolio/saku-01.png',
      '/assets/image/portfolio/saku-02.png',
      '/assets/image/portfolio/saku-03.png',
      '/assets/image/portfolio/saku-04.png',
      '/assets/image/portfolio/saku-05.png',
    ],
  },
  {
    id: 'emmo-after-sales',
    img: '/assets/image/portfolio/emmo-after-sales-placeholder.png',
    title: 'EMMO After Sales Service System',
    desc: 'Sistem after sales service berbasis web untuk digitalisasi layanan purna jual EMMO',
    fullDesc: 'Merancang dan mengembangkan sistem after sales service berbasis web untuk digitalisasi proses layanan purna jual EMMO. Membuat flow ticketing mulai dari laporan keluhan customer, call center handling, dealer assignment, technician management, hingga invoice dan payment integration. Mengembangkan role-based access untuk Customer, Call Center, Admin Dealer, Teknisi, dan Superadmin. Dilengkapi mobile app untuk teknisi lapangan menggunakan Flutter.',
    category: 'web',
    badge: 'Web + App',
    skills: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Flutter'],
    screenshots: [
      '/assets/image/portfolio/emmo-after-sales-placeholder.png',
    ],
  },
  {
    id: 'operio-event',
    img: '/assets/image/portfolio/operio-01.png',
    title: 'Operio',
    desc: 'Platform SaaS untuk manajemen operasional event secara menyeluruh',
    fullDesc: 'Platform SaaS untuk manajemen operasional event yang mencakup CRM, RAB/budgeting, project management, finance, inventory, dan client portal. Menerapkan konsep multi-tenant, role-based access, PostgreSQL RLS, audit trail, dan AI assistant untuk mendukung otomatisasi proses bisnis.',
    category: 'web',
    badge: 'SaaS Platform',
    skills: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'AI Integration'],
    screenshots: [
      '/assets/image/portfolio/operio-01.png',
      '/assets/image/portfolio/operio-02.png',
      '/assets/image/portfolio/operio-03.png',
      '/assets/image/portfolio/operio-04.png',
    ],
  },
  {
    id: 'gmj-roaming',
    img: '/assets/image/portfolio/gmj-roaming-05.png',
    title: 'GMJ Roaming',
    desc: 'Platform penjualan dan reseller eSIM untuk kebutuhan roaming internasional',
    fullDesc: 'Platform digital untuk penjualan dan manajemen reseller eSIM yang mendukung kebutuhan roaming internasional. Menyediakan fitur pembelian paket eSIM, manajemen akun reseller, dashboard penjualan, dan integrasi payment gateway untuk transaksi yang seamless.',
    category: 'web',
    badge: 'Web App',
    skills: ['Laravel', 'PHP', 'MySQL', 'REST API', 'JavaScript'],
    screenshots: [
      '/assets/image/portfolio/gmj-roaming-01.png',
      '/assets/image/portfolio/gmj-roaming-02.png',
      '/assets/image/portfolio/gmj-roaming-03.png',
      '/assets/image/portfolio/gmj-roaming-04.png',
      '/assets/image/portfolio/gmj-roaming-05.png',
      '/assets/image/portfolio/gmj-roaming-06.png',
    ],
  },
  {
    id: 'dias-digital-askep',
    img: '/assets/image/portfolio/dias-01.jpg',
    title: 'DIAS - Digital Askep',
    desc: 'Aplikasi mobile dokumentasi asuhan keperawatan berbasis digital untuk tenaga medis',
    fullDesc: 'Aplikasi mobile berbasis Flutter untuk digitalisasi proses dokumentasi asuhan keperawatan. Memungkinkan tenaga medis mencatat, memantau, dan mengelola data pasien secara real-time dari perangkat mobile. Terintegrasi dengan backend Laravel untuk penyimpanan data terpusat dan pelaporan digital yang dapat diakses oleh supervisor dan manajemen rumah sakit.',
    category: 'web',
    badge: 'Mobile App',
    skills: ['Flutter', 'Dart', 'Laravel', 'MySQL', 'REST API'],
    screenshots: [
      '/assets/image/portfolio/dias-01.jpg',
      '/assets/image/portfolio/dias-02.jpg',
    ],
  },
  {
    id: 'landing-page-arora',
    img: '/assets/image/portfolio/landing-page-arora-01.png',
    title: 'Landing Page PT Arora Kreatif Indonesia',
    desc: 'Landing page modern untuk PT Arora Kreatif Indonesia sebagai representasi digital perusahaan',
    fullDesc: 'Landing page profesional yang dibangun untuk PT Arora Kreatif Indonesia menggunakan React dan Supabase. Menampilkan profil perusahaan, layanan, portofolio, dan informasi kontak dengan desain modern yang responsif. Dilengkapi CMS berbasis Supabase untuk pengelolaan konten secara mandiri oleh tim internal.',
    category: 'web',
    badge: 'Landing Page',
    skills: ['React', 'Supabase', 'JavaScript', 'CSS'],
    screenshots: [
      '/assets/image/portfolio/landing-page-arora-01.png',
      '/assets/image/portfolio/landing-page-arora-02.png',
      '/assets/image/portfolio/landing-page-arora-03.png',
    ],
  },
  {
    id: 'landing-page-emmo',
    img: '/assets/image/portfolio/landing-page-emmo-01.jpeg',
    title: 'Landing Page EMMO',
    desc: 'Landing page produk EMMO untuk mendukung pemasaran digital dan pengenalan brand',
    fullDesc: 'Landing page modern untuk brand EMMO yang dirancang untuk mendukung pemasaran digital dan memperkenalkan produk kepada calon pelanggan. Dibangun dengan React dan Supabase, menampilkan informasi produk, fitur unggulan, dan call-to-action yang optimal untuk konversi. Desain responsif yang menyesuaikan tampilan di berbagai perangkat.',
    category: 'web',
    badge: 'Landing Page',
    skills: ['React', 'Supabase', 'JavaScript', 'CSS'],
    screenshots: [
      '/assets/image/portfolio/landing-page-emmo-01.jpeg',
      '/assets/image/portfolio/landing-page-emmo-02.png',
      '/assets/image/portfolio/landing-page-emmo-03.jpeg',
    ],
  },
  {
    id: 'landing-page-cakrawala',
    img: '/assets/image/portfolio/landing-page-cakrawala-01.jpeg',
    title: 'Landing Page LPK Cakrawala',
    desc: 'Landing page untuk Lembaga Pelatihan Kerja Cakrawala sebagai sarana promosi dan pendaftaran online',
    fullDesc: 'Landing page untuk Lembaga Pelatihan Kerja (LPK) Cakrawala yang berfungsi sebagai media promosi digital dan platform pendaftaran online. Dibangun dengan Laravel, React, dan Supabase. Menampilkan program pelatihan, jadwal, biaya, dan formulir pendaftaran terintegrasi. Memudahkan calon peserta mendaftar dan mendapatkan informasi lengkap tentang program yang tersedia.',
    category: 'web',
    badge: 'Landing Page',
    skills: ['Laravel', 'React', 'Supabase', 'MySQL', 'JavaScript'],
    screenshots: [
      '/assets/image/portfolio/landing-page-cakrawala-01.jpeg',
      '/assets/image/portfolio/landing-page-cakrawala-02.png',
      '/assets/image/portfolio/landing-page-cakrawala-03.png',
      '/assets/image/portfolio/landing-page-cakrawala-04.png',
      '/assets/image/portfolio/landing-page-cakrawala-05.png',
    ],
  },
]

const DEFAULT_SKILLS = [
  { name: 'Laravel', img: '/assets/image/laravel.svg' },
  { name: 'React', img: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'Flutter', img: '/assets/image/flutter.svg' },
  { name: 'TypeScript', img: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'MySQL', img: '/assets/image/mysql.svg' },
  { name: 'PostgreSQL', img: 'https://cdn.simpleicons.org/postgresql/336791' },
  { name: 'Firebase', img: '/assets/image/firebase.svg' },
  { name: 'Supabase', img: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { name: 'Docker', img: 'https://cdn.simpleicons.org/docker/2496ED' },
]

const DEFAULT_CV = '/assets/cv/muhammad-rizki-cv.pdf'

const KEYS = { portfolio: 'cms_portfolio', skills: 'cms_skills', cv: 'cms_cv' }

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback }
  catch { return fallback }
}

function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

export const store = {
  getPortfolio: () => load(KEYS.portfolio, DEFAULT_PORTFOLIO),
  setPortfolio: (v) => save(KEYS.portfolio, v),
  getSkills: () => load(KEYS.skills, DEFAULT_SKILLS),
  setSkills: (v) => save(KEYS.skills, v),
  getCv: () => load(KEYS.cv, DEFAULT_CV),
  setCv: (v) => save(KEYS.cv, v),
  reset: () => Object.values(KEYS).forEach(k => localStorage.removeItem(k)),
  DEFAULT_PORTFOLIO,
  DEFAULT_SKILLS,
  DEFAULT_CV,
}
