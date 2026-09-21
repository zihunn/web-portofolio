import { useEffect, useState } from 'react'

export default function ProjectDetail({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const screenshots = project.screenshots || [project.img]

  return (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-panel" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="pd-header">
          <button className="pd-back" onClick={onClose}>
            <i className="fas fa-arrow-left"></i>
            <span>Back</span>
          </button>
          <span className="pd-header-badge">{project.badge}</span>
        </div>

        {/* Content */}
        <div className="pd-body">
          {/* Main image viewer */}
          <div className="pd-main-img-wrap">
            <img
              src={screenshots[activeImg]}
              alt={project.title}
              className="pd-main-img"
            />
            {screenshots.length > 1 && (
              <>
                <button
                  className="pd-nav pd-nav-prev"
                  onClick={() => setActiveImg(i => (i - 1 + screenshots.length) % screenshots.length)}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button
                  className="pd-nav pd-nav-next"
                  onClick={() => setActiveImg(i => (i + 1) % screenshots.length)}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <span className="pd-img-count">{activeImg + 1} / {screenshots.length}</span>
              </>
            )}
          </div>

          {/* Info */}
          <div className="pd-info">
            <h2 className="pd-title">{project.title}</h2>
            <p className="pd-desc">{project.desc}</p>
          </div>

          {/* Thumbnail strip */}
          {screenshots.length > 1 && (
            <div className="pd-thumbs">
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  className={`pd-thumb${activeImg === i ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={src} alt={`screenshot ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
