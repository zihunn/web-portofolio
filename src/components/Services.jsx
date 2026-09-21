import { useState } from 'react'

const MODALS = {
  'web-development': {
    title: 'Web Development',
    imgSrc: '/assets/image/web-development-model-img.jpg',
  },
  'app-development': {
    title: 'App Development',
    imgSrc: '/assets/image/App-development-model-img.JPG',
  },
}

function Modal({ title, imgSrc, onClose }) {
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
              <p className="mb-md-4 mb-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <ul className="list-unstyled model-list mb-md-3 mb-2">
                <li><i className="fas fa-check-circle"></i> Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                <li><i className="fas fa-check-circle"></i> Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
                <li><i className="fas fa-check-circle"></i> Lorem Ipsum is simply dummy text of the printing and typesetting industry</li>
              </ul>
              <p className="mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
            <h2 className="mb-0">Provide Wide Range of<br />Digital Services</h2>
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
                    <p>Web development is the process of creating and managing websites using various programming languages.</p>
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
                    <p>App development is the process of creating applications for mobile devices.</p>
                    <a href="#" onClick={(e) => openModal(e, 'app-development')}>Read More</a>
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
