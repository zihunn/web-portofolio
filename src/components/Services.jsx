import { useState } from 'react'

const MODALS = {
  'web-development': {
    title: 'Web Development',
    imgSrc: '/assets/image/web-development-model-img.jpg',
    desc: 'Membangun aplikasi web yang scalable dan production-ready menggunakan Laravel dan React. Dari desain sistem, REST API, hingga antarmuka frontend yang responsif.',
    points: [
      'Full-stack web app dengan Laravel, React, dan TypeScript',
      'REST API development dan integrasi third-party service',
      'Role-based access control dan manajemen multi-user',
    ],
  },
  'app-development': {
    title: 'App Development',
    imgSrc: '/assets/image/App-development-model-img.JPG',
    desc: 'Membangun aplikasi mobile cross-platform menggunakan Flutter yang berjalan mulus di Android dan iOS, dengan performa native dan UI yang polished.',
    points: [
      'Cross-platform mobile app dengan Flutter dan Dart',
      'Integrasi Firebase untuk auth, database, dan push notification',
      'UI yang responsif dan smooth di Android maupun iOS',
    ],
  },
  'server-infrastructure': {
    title: 'Server & Infrastructure',
    imgSrc: '/assets/image/ui-ux-model-img.jpg',
    desc: 'Mengelola Ubuntu VPS, konfigurasi Nginx, dan deployment pipeline untuk memastikan sistem production berjalan stabil, aman, dan siap digunakan 24/7.',
    points: [
      'Setup dan maintenance Ubuntu VPS dengan Nginx dan aaPanel',
      'Deployment aplikasi, backup-restore, dan monitoring sistem',
      'Konfigurasi Mikrotik, Cloudflare, dan network troubleshooting',
    ],
  },
  'it-consulting': {
    title: 'IT Consulting',
    imgSrc: '/assets/image/web-designer-model-img.jpg',
    desc: 'Memberikan rekomendasi teknis untuk keputusan teknologi, perencanaan sistem, dan digital infrastructure, berdasarkan pengalaman langsung di lingkungan production nyata.',
    points: [
      'Technology stack recommendation untuk kebutuhan project',
      'System architecture planning dan technical roadmap',
      'Audit dan evaluasi sistem yang sudah berjalan',
    ],
  },
}

function Modal({ title, imgSrc, desc, points, onClose }) {
  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
        onClick={onClose}
      />
      <div className="modal fade show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={onClose} aria-label="Close">
                <span aria-hidden="true"><i className="far fa-times"></i></span>
              </button>
            </div>
            <div className="modal-body service-model-content">
              <figure className="mb-0">
                <img src={imgSrc} alt={title} className="img-fluid" />
              </figure>
              <h4>{title}</h4>
              <p className="mb-md-4 mb-2">{desc}</p>
              <ul className="list-unstyled model-list mb-md-3 mb-2">
                {points.map((p, i) => (
                  <li key={i}><i className="fas fa-check-circle"></i> {p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function Services({ cursorRef, cursor2Ref }) {
  const [activeModal, setActiveModal] = useState(null)

  const moveCursor = (e) => {
    const c = cursorRef.current
    const c2 = cursor2Ref.current
    if (!c || !c2) return
    c.style.visibility = 'visible'
    c2.style.visibility = 'visible'
    c.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
    c2.style.left = e.clientX + 'px'
    c2.style.top = e.clientY + 'px'
  }

  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'rotate(-1deg)'
  }

  const handleMouseOut = (e) => {
    if (cursorRef.current) cursorRef.current.style.visibility = 'hidden'
    if (cursor2Ref.current) cursor2Ref.current.style.visibility = 'hidden'
    e.currentTarget.style.transform = 'rotate(0deg)'
  }

  const openModal = (e, id) => {
    e.preventDefault()
    setActiveModal(id)
  }

  return (
    <section className="w-100 float-left service-con padding-top padding-bottom position-relative" id="service-con">
      <div className="container">
        <div className="service-inner-con position-relative">
          <div className="generic-title text-center">
            <h6>My Expertise</h6>
            <h2 className="mb-0">From Idea to<br />Production</h2>
          </div>
          <div className="service-box wow fadeInUp">
            <div className="row mb-0">
              <div className="col-lg-6 col-md-6">
                <div
                  className="service-box-item"
                  onMouseMove={moveCursor}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <figure className="mb-0">
                    <img src="/assets/image/service-icon3.png" alt="service-icon" className="img-fluid" />
                  </figure>
                  <div className="service-box-item-content">
                    <h4>Web Development</h4>
                    <p>Building scalable web apps using Laravel and React, from REST API backends to modern frontend interfaces.</p>
                    <a href="#" onClick={(e) => openModal(e, 'web-development')}>Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div
                  className="service-box-item mb-0"
                  onMouseMove={moveCursor}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <figure className="mb-0">
                    <img src="/assets/image/service-icon4.png" alt="service-icon" className="img-fluid" />
                  </figure>
                  <div className="service-box-item-content">
                    <h4>App Development</h4>
                    <p>Crafting cross-platform mobile apps with Flutter, smooth, fast, and ready for both Android and iOS.</p>
                    <a href="#" onClick={(e) => openModal(e, 'app-development')}>Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div
                  className="service-box-item"
                  onMouseMove={moveCursor}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <figure className="mb-0">
                    <img src="/assets/image/service-icon1.png" alt="service-icon" className="img-fluid" />
                  </figure>
                  <div className="service-box-item-content">
                    <h4>Server & Infrastructure</h4>
                    <p>Managing Ubuntu VPS, Nginx, and deployment pipelines, keeping production systems stable, secure, and running 24/7.</p>
                    <a href="#" onClick={(e) => openModal(e, 'server-infrastructure')}>Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div
                  className="service-box-item mb-0"
                  onMouseMove={moveCursor}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <figure className="mb-0">
                    <img src="/assets/image/service-icon2.png" alt="service-icon" className="img-fluid" />
                  </figure>
                  <div className="service-box-item-content">
                    <h4>IT Consulting</h4>
                    <p>Providing technical recommendations for technology decisions, system planning, and digital infrastructure based on real production experience.</p>
                    <a href="#" onClick={(e) => openModal(e, 'it-consulting')}>Read More</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeModal && (
        <Modal {...MODALS[activeModal]} onClose={() => setActiveModal(null)} />
      )}
    </section>
  )
}
