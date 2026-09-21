import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar.jsx'
import Banner from './components/Banner.jsx'
import Services from './components/Services.jsx'
import Skills from './components/Skills.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const cursorRef = useRef(null)
  const cursor2Ref = useRef(null)

  useEffect(() => {
    if (window.WOW) new window.WOW().init()

    const handleScroll = () => setIsScrolled(window.scrollY >= 113)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="header-and-banner-con w-100 float-left position-relative">
        <div className="header-and-banner-inner-con">
          <Navbar isScrolled={isScrolled} />
          <Banner isScrolled={isScrolled} cursorRef={cursorRef} cursor2Ref={cursor2Ref} />
        </div>
      </div>
      <Services cursorRef={cursorRef} cursor2Ref={cursor2Ref} />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor2" ref={cursor2Ref}></div>
    </>
  )
}
