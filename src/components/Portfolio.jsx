import { useState } from 'react'
import { Link } from 'react-router-dom'

export const PORTFOLIO_ITEMS = [
  {
    id: 'akademik-mahardika',
    img: '/assets/image/portfolio-1.jpg',
    title: 'Aplikasi Akademik Mahardika',
    desc: 'Mempermudah dosen dan mahasiswa dalam kegiatan akademik',
    fullDesc: 'Aplikasi akademik yang dirancang untuk mempermudah proses kegiatan belajar mengajar antara dosen dan mahasiswa. Fitur meliputi presensi digital, pengumpulan tugas, pengumuman kelas, dan akses nilai secara real-time.',
    category: 'android',
    badge: 'Android App',
    skills: ['Android', 'Java', 'Firebase', 'MySQL'],
    screenshots: [
      '/assets/image/portfolio-1.jpg',
    ],
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
    screenshots: [
      '/assets/image/portfolio-2.svg',
    ],
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
    screenshots: [
      '/assets/image/portfolio-3.svg',
    ],
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
    screenshots: [
      '/assets/image/portfolio-4.svg',
    ],
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
    screenshots: [
      '/assets/image/portfolio-5.svg',
    ],
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'android', label: 'Android App' },
  { id: 'web', label: 'Web App' },
  { id: 'mobile', label: 'Mobile UI' },
]

const INITIAL_SHOW = 6

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === activeFilter)

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW)
  const hasMore = filtered.length > INITIAL_SHOW && !showAll

  const handleFilter = (id) => {
    setActiveFilter(id)
    setShowAll(false)
  }

  return (
    <>
      <section className="w-100 float-left portfolio-con padding-top" id="Portfolio">
        <div className="container">
          <div className="generic-title text-center">
            <h6 className="text-white">Creative Works</h6>
            <h2 className="mb-0 text-white">My Portfolio</h2>
          </div>
          <div className="portfolio-filter-tabs">
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                className={`portfolio-filter-btn${activeFilter === id ? ' active' : ''}`}
                onClick={() => handleFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="w-100 float-left portfolio-body-new">
        <div className="container">
          <div className="portfolio-grid">
            {visible.map((item, i) => (
              <Link
                key={`${activeFilter}-${i}`}
                to={`/project/${item.id}`}
                className="portfolio-card portfolio-card-enter"
                style={{ animationDelay: `${(i % INITIAL_SHOW) * 60}ms` }}
              >
                <span className="portfolio-card-badge">{item.badge}</span>
                <img
                  src={item.img}
                  alt={item.title}
                  className="portfolio-card-img"
                />
                <div className="portfolio-card-overlay">
                  <div className="portfolio-card-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <span className="portfolio-card-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="portfolio-show-more">
              <button className="portfolio-show-more-btn" onClick={() => setShowAll(true)}>
                Show More ({filtered.length - INITIAL_SHOW} more)
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
