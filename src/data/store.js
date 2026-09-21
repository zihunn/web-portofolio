const DEFAULT_PORTFOLIO = [
  {
    id: 'akademik-mahardika',
    img: '/assets/image/portfolio-1.jpg',
    title: 'Aplikasi Akademik Mahardika',
    desc: 'Mempermudah dosen dan mahasiswa dalam kegiatan akademik',
    fullDesc: 'Aplikasi akademik yang dirancang untuk mempermudah proses kegiatan belajar mengajar antara dosen dan mahasiswa. Fitur meliputi presensi digital, pengumpulan tugas, pengumuman kelas, dan akses nilai secara real-time.',
    category: 'android',
    badge: 'Android App',
    skills: ['Android', 'Java', 'Firebase', 'MySQL'],
    screenshots: ['/assets/image/portfolio-1.jpg'],
  },
  {
    id: 'chat-app',
    img: '/assets/image/portfolio-2.svg',
    title: 'Chat App',
    desc: 'Berkomunikasi secara real-time dengan keluarga dan teman',
    fullDesc: 'Aplikasi pesan instan berbasis Flutter yang memungkinkan komunikasi real-time antar pengguna. Dilengkapi fitur kirim pesan teks, notifikasi push, dan status online/offline.',
    category: 'android',
    badge: 'Flutter',
    skills: ['Flutter', 'Dart', 'Firebase'],
    screenshots: ['/assets/image/portfolio-2.svg'],
  },
  {
    id: 'point-of-sale',
    img: '/assets/image/portfolio-3.svg',
    title: 'Point of Sale',
    desc: 'Sistem kasir untuk memperbaiki manajemen bisnis',
    fullDesc: 'Sistem kasir (POS) berbasis Android untuk membantu pelaku usaha mengelola transaksi penjualan, stok barang, dan laporan keuangan harian secara mudah dan efisien.',
    category: 'android',
    badge: 'Android App',
    skills: ['Android', 'Java', 'SQLite', 'MySQL'],
    screenshots: ['/assets/image/portfolio-3.svg'],
  },
  {
    id: 'website-landing-page',
    img: '/assets/image/portfolio-4.svg',
    title: 'Website Landing Page',
    desc: 'Landing page untuk LKP Kesehatan',
    fullDesc: 'Landing page profesional untuk LKP (Lembaga Kursus dan Pelatihan) Kesehatan. Menampilkan informasi program pelatihan, profil lembaga, dan formulir pendaftaran peserta.',
    category: 'web',
    badge: 'Web App',
    skills: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    screenshots: ['/assets/image/portfolio-4.svg'],
  },
  {
    id: 'clone-ui-gojek',
    img: '/assets/image/portfolio-5.svg',
    title: 'Clone UI Gojek',
    desc: 'Replika antarmuka aplikasi Gojek menggunakan Flutter',
    fullDesc: 'Proyek replika antarmuka aplikasi Gojek yang dibangun menggunakan Flutter. Bertujuan untuk mengasah kemampuan membangun UI yang kompleks dan responsif di Flutter.',
    category: 'mobile',
    badge: 'Mobile UI',
    skills: ['Flutter', 'Dart'],
    screenshots: ['/assets/image/portfolio-5.svg'],
  },
]

const DEFAULT_SKILLS = [
  { name: 'Flutter', img: '/assets/image/flutter.svg' },
  { name: 'Laravel', img: '/assets/image/laravel.svg' },
  { name: 'Firebase', img: '/assets/image/firebase.svg' },
  { name: 'MySQL', img: '/assets/image/mysql.svg' },
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
