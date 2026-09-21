import { useState } from 'react'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'android', label: 'Android App' },
  { id: 'web', label: 'Web App' },
  { id: 'mobile', label: 'Mobile UI' },
]

const ITEMS = [
  {
    img: '/assets/image/portfolio-1.jpg',
    title: 'Aplikasi Akademik Mahardika',
    desc: 'Mempermudah dosen dan mahasiswa dalam kegiatan akademik',
    category: 'android',
    badge: 'Android App',
  },
  {
    img: '/assets/image/portfolio-2.svg',
    title: 'Chat App',
    desc: 'Berkomunikasi secara real-time dengan keluarga dan teman',
    category: 'android',
    badge: 'Flutter',
  },
  {
    img: '/assets/image/portfolio-3.svg',
    title: 'Point of Sale',
    desc: 'Sistem kasir untuk memperbaiki manajemen bisnis',
    category: 'android',
    badge: 'Android App',
  },
  {
    img: '/assets/image/portfolio-4.svg',
    title: 'Website Landing Page',
    desc: 'Landing page untuk LKP Kesehatan',
    category: 'web',
    badge: 'Web App',
  },
  {
    img: '/assets/image/portfolio-5.svg',
    title: 'Clone UI Gojek',
    desc: 'Replika antarmuka aplikasi Gojek menggunakan Flutter',
    category: 'mobile',
    badge: 'Mobile UI',
  },
]

const INITIAL_SHOW = 6

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [showAll, setShowAll] = useState(false)

  const filtered = activeFilter === 'all'
    ? ITEMS
    : ITEMS.filter(item => item.category === activeFilter)

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
              <a
                key={`${activeFilter}-${i}`}
                href="#"
                className="portfolio-card portfolio-card-enter"
                onClick={e => e.preventDefault()}
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
              </a>
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
