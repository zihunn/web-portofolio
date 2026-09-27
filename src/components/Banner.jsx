import { useState, useEffect, useRef } from 'react'

export default function Banner({ isScrolled, cursorRef, cursor2Ref }) {
  const [count, setCount] = useState(0)
  const imgRef = useRef(null)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      if (current < 21) {
        current++
        setCount(current)
      } else {
        clearInterval(interval)
      }
    }, 165)
    return () => clearInterval(interval)
  }, [])

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

  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.style.visibility = 'hidden'
    if (cursor2Ref.current) cursor2Ref.current.style.visibility = 'hidden'
  }

  const handleImgMouseMove = (e) => {
    const x = e.nativeEvent.layerX
    if (imgRef.current) imgRef.current.style.transform = `translate(-${x / 6}px)`
  }

  return (
    <section className={`banner-main-con${isScrolled ? ' banner-main-con2' : ''}`} id="home">
      <div className="container pl-0 pr-0">
        <div className="footer-social-icon banner-social-icon mb-0">
          <ul className="mb-0 list-unstyled">
            <li>
              <a href="https://github.com/zihunn">
                <i className="fab fa-github d-flex align-items-center justify-content-center"></i>
              </a>
            </li>
            <li className="mt-3 mb-3">
              <a href="https://www.instagram.com/m.rizkky._" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram d-flex align-items-center justify-content-center ml-0 mr-0"></i>
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/muhammad-rizki-938a1b286" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in d-flex align-items-center justify-content-center"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="banner-con text-lg-left text-center">
          <div className="row">
            <div className="col-lg-7 col-sm-10 d-flex justify-content-center flex-column">
              <div className="banner-left-con wow slideInLeft">
                <div className="banner-heading">
                  <h2>Hello, I Am</h2>
                  <ul className="dynamic-txts">
                    <li><h1>Rizki</h1></li>
                    <li><h1>Rizki</h1></li>
                    <li><h1>Rizki</h1></li>
                    <li><h1>Rizki</h1></li>
                  </ul>
                  <p style={{ paddingRight: '2%' }}>
                    Full-stack developer with hands-on experience delivering production-ready systems for institutions, government-linked enterprises, and corporate clients.
                  </p>
                </div>
                <div className="banner-btn generic-btn d-inline-block">
                  <a href="#Contact">Hire Me</a>
                </div>
                <a href="#Portfolio" className="See-btn">See My Work</a>
              </div>
            </div>

            <div className="col-lg-5 col-sm-12">
              <div
                className="banner-right-con position-relative wow slideInRight"
                id="banner-right-con"
                onMouseMove={moveCursor}
                onMouseLeave={hideCursor}
              >
                <figure className="mb-0">
                  <img
                    src="/assets/image/me.png"
                    alt="banner-right-img"
                    id="banner-right-img"
                    ref={imgRef}
                    onMouseMove={handleImgMouseMove}
                  />
                </figure>
                <div className="best-award-con d-inline-block wow bounceInUp" data-wow-duration="1s" data-wow-delay="1s">
                  <div className="best-award-inner-con">
                    <figure className="mb-0">
                      <img src="/assets/image/cup-img.png" alt="cup-img" className="img-fluid" />
                    </figure>
                    <div className="best-award-title">
                      <p className="mb-0">Full-stack<br />Developer</p>
                    </div>
                  </div>
                </div>
                <div className="best-award-con d-inline-block happy-con wow bounceInUp" data-wow-duration="1s" data-wow-delay="1s">
                  <div className="best-award-inner-con text-center">
                    <figure>
                      <img src="/assets/image/admin-icon.png" alt="admin-icon" className="img-fluid" />
                    </figure>
                    <div className="best-award-title d-inline-block ml-0">
                      <p className="mb-0 d-inline-block">{count}</p>
                      <p className="mb-0 d-inline-block"></p>
                      <span className="d-block">Years<br />Old</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
