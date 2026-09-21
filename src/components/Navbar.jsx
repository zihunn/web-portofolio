import { useState } from 'react'

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'services', label: 'Services', href: '#service-con' },
  { id: 'skills', label: 'My Skills', href: '#about-con' },
  { id: 'portfolio', label: 'Portfolio', href: '#Portfolio' },
]

export default function Navbar({ isScrolled }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  const handleNavClick = (id) => {
    setActiveLink(id)
    setIsOpen(false)
  }

  return (
    <header className={`main-header${isScrolled ? ' fixed-header' : ''}`}>
      <div className="container pl-0 pr-0">
        <div className="header-con">
          <nav className="navbar navbar-expand-lg navbar-light p-0">
            <a className="navbar-brand p-0" href="#home">
              <img src="/assets/image/a-me.svg" alt="logo-img" className="img-fluid" />
            </a>
            <button
              className={`navbar-toggler p-0${isOpen ? '' : ' collapsed'}`}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse justify-content-end${isOpen ? ' show' : ''}`}>
              <ul className="navbar-nav ml-auto">
                {navLinks.map(({ id, label, href }, i) => (
                  <li key={id} className={`nav-item${i === 0 ? ' active pl-0' : ''}`}>
                    <a
                      className={`nav-link p-0${activeLink === id ? ' is-active' : ''}`}
                      href={href}
                      onClick={() => handleNavClick(id)}
                    >
                      {label}
                      {i === 0 && <span className="sr-only">(current)</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="d-inline-block contact">
                <a href="#Contact" onClick={() => handleNavClick('contact')}>Contact</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
