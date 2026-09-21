import { useState } from 'react'
import { Link } from 'react-router-dom'
import { store } from '../data/store.js'

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

  const items = store.getPortfolio()
  const filtered = activeFilter === 'all' ? items : items.filter(i => i.category === activeFilter)
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW)
  const hasMore = filtered.length > INITIAL_SHOW && !showAll

  const handleFilter = (id) => { setActiveFilter(id); setShowAll(false) }

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
                <img src={item.img} alt={item.title} className="portfolio-card-img" />
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
