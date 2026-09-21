import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PORTFOLIO_ITEMS } from '../components/Portfolio.jsx'

const AUTO_SLIDE_MS = 3500

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = PORTFOLIO_ITEMS.find(p => p.id === id)

  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef(null)

  const shots = project ? (project.screenshots || [project.img]) : []

  const resetTimer = () => {
    clearInterval(timerRef.current)
    if (shots.length > 1) {
      timerRef.current = setInterval(() => {
        setActiveIdx(i => (i + 1) % shots.length)
      }, AUTO_SLIDE_MS)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setActiveIdx(0)
  }, [id])

  useEffect(() => {
    resetTimer()
    return () => clearInterval(timerRef.current)
  }, [shots.length])

  if (!project) {
    return (
      <div className="pd-not-found">
        <p>Project tidak ditemukan.</p>
        <button onClick={() => navigate('/')}>← Kembali</button>
      </div>
    )
  }

  const prev = () => {
    setActiveIdx(i => (i - 1 + shots.length) % shots.length)
    resetTimer()
  }
  const next = () => {
    setActiveIdx(i => (i + 1) % shots.length)
    resetTimer()
  }
  const goTo = (i) => {
    setActiveIdx(i)
    resetTimer()
  }

  return (
    <div className="pd-page">
      {/* ── Carousel ── */}
      <div className="pd-carousel">
        <div className="pd-carousel-track" style={{ transform: `translateX(-${activeIdx * 100}%)` }}>
          {shots.map((src, i) => (
            <div className="pd-carousel-slide" key={i}>
              <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* Nav buttons — always shown */}
        <button className="pd-carousel-btn pd-carousel-prev" onClick={prev}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="pd-carousel-btn pd-carousel-next" onClick={next}>
          <i className="fas fa-chevron-right"></i>
        </button>

        {/* Dots — always shown */}
        <div className="pd-dots">
          {shots.map((_, i) => (
            <button
              key={i}
              className={`pd-dot${activeIdx === i ? ' active' : ''}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        {/* Back button */}
        <button className="pd-back-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>

        {/* Counter */}
        {shots.length > 1 && (
          <span className="pd-counter">{activeIdx + 1} / {shots.length}</span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="pd-content">
        <section className="pd-section">
          <span className="pd-badge">{project.badge}</span>
          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-desc">{project.fullDesc}</p>
        </section>

        <div className="pd-divider"></div>

        <section className="pd-section">
          <h2 className="pd-section-title">
            <i className="fas fa-code"></i> Tech Stack
          </h2>
          <div className="pd-skills">
            {project.skills.map(skill => (
              <span className="pd-skill-chip" key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        {shots.length > 1 && (
          <>
            <div className="pd-divider"></div>
            <section className="pd-section">
              <h2 className="pd-section-title">
                <i className="fas fa-images"></i> Screenshots
              </h2>
              <div className="pd-thumb-grid">
                {shots.map((src, i) => (
                  <button
                    key={i}
                    className={`pd-thumb-item${activeIdx === i ? ' active' : ''}`}
                    onClick={() => { goTo(i); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  >
                    <img src={src} alt={`screenshot ${i + 1}`} />
                  </button>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
