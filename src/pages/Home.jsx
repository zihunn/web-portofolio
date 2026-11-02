import { useEffect } from 'react'
import { Link, useLocation, useNavigationType } from 'react-router-dom'
import { store } from '../data/store.js'
import { startLanding } from '../landing/engine.js'

export default function Home() {
  const projects = store.getPortfolio()
  const cv = store.getCv()

  const navType = useNavigationType()
  const { hash } = useLocation()

  useEffect(() => {
    const stop = startLanding()
    // Back from a project page: return to its card. The browser can't, the page was too short when it tried.
    const y = sessionStorage.getItem('landingY')
    sessionStorage.removeItem('landingY')
    if (navType === 'POP' && y) window.scrollTo({ top: +y, behavior: 'instant' })
    // Arriving from a project page's links
    else if (hash) document.querySelector(hash)?.scrollIntoView({ behavior: 'instant' })
    return stop
  }, [])

  return (
    <>
      <div id="bg" aria-hidden="true"></div>
      <nav className="glass" aria-label="Main">
        <a className="logo" href="#hero"><img src="/assets/redesign/brand/logo-nav.webp" alt="Muhammad Rizki, home" width="28" height="28" /></a>
        <button type="button" className="nav-menu" aria-expanded="false">Menu</button>
        <div className="nav-links" id="nav-links">
          <span className="nav-ind" aria-hidden="true"></span>
          <ul>
            <li><a href="#proof" data-nav="proof">About</a></li>
            <li><a href="#build" data-nav="build">Services</a></li>
            <li><a href="#stack" data-nav="stack">Stack</a></li>
            <li><a href="#work" data-nav="work">Work</a></li>
            <li><a href="#contact" data-nav="contact">Contact</a></li>
          </ul>
        </div>
        <a className="btn btn-solid" href="#contact">Hire Me</a>
      </nav>

      <main>
      <section id="hero">
        <div className="stage">
          <h1 aria-label="Rizki"><span id="l1" aria-hidden="true">RI</span><span id="l2" aria-hidden="true">Z</span><span id="l3" aria-hidden="true">KI</span></h1>
          <img className="orn o-ring" data-depth=".5" src="/assets/redesign/ornaments/orn-ring.webp" alt="" />
          <img className="orn o-braces" data-depth="1.3" src="/assets/redesign/ornaments/orn-braces.webp" alt="" />
          <img className="orn o-cube" data-depth="1" src="/assets/redesign/ornaments/orn-cube.webp" alt="" />
          <img className="orn o-cursor" data-depth="1.6" src="/assets/redesign/ornaments/orn-cursor.webp" alt="" />
          <img className="orn o-orb" data-depth=".8" src="/assets/redesign/ornaments/orn-orb.webp" alt="" />
          <div id="portrait"><img src="/assets/redesign/hero.webp" alt="Portrait of Muhammad Rizki" fetchpriority="high" /></div>
          <div className="float f1 glass pill" data-depth="1.3"><b>800+</b> internal users on BION</div>
          <div className="float f2 glass pill" data-depth="1.8"><b>Since 2023</b> in production</div>
          <div className="float f3 glass pill" data-depth="1.5"><span className="dot"></span> Open to opportunities</div>
          <div className="h-left" id="h-left">
            <h2 className="h-role">Full-stack <em>Developer</em></h2>
            <p>I build digital systems and keep them stable, secure, and ready to use.</p>
            <div className="h-cta">
              <a className="btn btn-solid" href="#work" data-mag>View Work</a>
              <a className="btn btn-ghost glass" href={cv} download data-mag>Download CV</a>
            </div>
          </div>
          <div className="h-right" id="h-right">
            <h2>Full-stack <em>Developer</em></h2>
            <p>IT Generalist, based in Cirebon, Indonesia</p>
          </div>
          <div className="scroll-hint" aria-hidden="true"></div>
        </div>
      </section>

      <section id="proof">
        <div className="ghost" aria-hidden="true" data-ghost>Since 2023</div>
        <div className="head" data-reveal>
          <div className="eyebrow" data-par=".1">Layer 01, Proof</div>
          <h2 className="h2" data-par=".1">Real systems, <em>real users,</em> in production.</h2>
        </div>
        <div className="stats glass" data-reveal>
          <div><strong data-count="3" data-suffix="+">0</strong><span>Years of hands-on experience</span></div>
          <div><strong data-count={projects.length}>0</strong><span>Featured projects shipped</span></div>
          <div><strong data-count="800" data-suffix="+">0</strong><span>Active internal users on BION Bulog</span></div>
          <div><strong data-count="500" data-suffix="+">0</strong><span>Institution users supported</span></div>
        </div>
        <div className="clients" data-reveal>
          <small>Built for</small>
          <div className="marquee" id="marquee"></div>
        </div>
      </section>

      <section id="build">
        <div className="stage">
          <div className="build-in">
            <div>
              <div className="eyebrow" data-par=".1">Layer 02, Build</div>
              <h2 className="h2" data-par=".1">From idea <em>to production.</em></h2>
            </div>
            <div className="cards">
              <div className="slot"><article className="card glass" data-tilt><div className="card-top"><div className="tile-face"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/></svg></div><span className="num">01</span></div><h3>Web Development</h3><p>Production web apps with Laravel, React, and Next.js: dashboards, multi-role access, and REST APIs.</p></article></div>
              <div className="slot"><article className="card glass" data-tilt><div className="card-top"><div className="tile-face"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/></svg></div><span className="num">02</span></div><h3>App Development</h3><p>Flutter apps connected to Laravel backends, from nursing documentation to field technician tools.</p></article></div>
              <div className="slot"><article className="card glass" data-tilt><div className="card-top"><div className="tile-face"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01M12 7.5h5M12 16.5h5"/></svg></div><span className="num">03</span></div><h3>Server and Infrastructure</h3><p>Ubuntu VPS, Nginx, Docker, and Cloudflare, with deployment, backup and restore, and network care.</p></article></div>
              <div className="slot"><article className="card glass" data-tilt><div className="card-top"><div className="tile-face"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/></svg></div><span className="num">04</span></div><h3>IT Consulting</h3><p>Requirement analysis, system flow, and technical recommendations before a line of code gets written.</p></article></div>
            </div>
          </div>
        </div>
      </section>

      <section id="stack">
        <div className="stage">
          <div className="st-copy">
            <div className="eyebrow" data-par=".1">Layer 03, Stack</div>
            <h2 className="h2" data-par=".1">Every layer, end to end.</h2>
            <div className="st-active" aria-live="polite">
              <div className="st-count"><b id="sk-n">01</b>/ 05</div>
              <h3 id="sk-t"></h3>
              <p id="sk-d"></p>
            </div>
            <div className="st-steps" id="st-steps" role="group" aria-label="Stack layers"></div>
          </div>
          <div className="orbit" id="orbit"></div>
          <div className="st-flat" id="st-flat"></div>
        </div>
      </section>

      <section id="work">
        <div className="stage">
          <div className="ghost" aria-hidden="true" data-ghost>Production</div>
          <div className="track" id="track">
            <div className="work-head">
              <div className="eyebrow">Layer 04, Production</div>
              <h2 className="h2">Selected work.</h2>
              <p>{projects.length} systems and sites across government-linked enterprises, campuses, and corporate clients.</p>
            </div>
            {projects.map((p, i) => (
              <Link className="project" to={`/project/${p.id}`} onClick={() => sessionStorage.setItem('landingY', window.scrollY)} data-tilt key={p.id}>
                <span className="shot">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <img src={p.cover || p.img} alt={`${p.title} preview`} loading="lazy" width="1200" height="750" />
                </span>
                <div className="meta">
                  <div><h3>{p.shortTitle || p.title}</h3><p>{p.summary || p.desc}</p></div>
                  <ul className="chips">{p.skills.slice(0, 4).map(c => <li key={c}>{c}</li>)}</ul>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="ghost" aria-hidden="true" data-ghost>Let's Build</div>
        <img className="c-photo" id="c-photo" src="/assets/redesign/contact.webp" loading="lazy" alt="Muhammad Rizki" />
        <div className="c-panel glass" data-reveal>
          <div className="eyebrow">Back to the surface</div>
          <h2 className="h2">Have a system to build?</h2>
          <div className="c-grid">
            <ul className="c-list">
              <li><small>Email</small><a href="mailto:muhammadrizki.personal@gmail.com">muhammadrizki.personal@gmail.com</a></li>
              <li><small>Phone</small><a href="tel:+6285896173893">+62 858 9617 3893</a></li>
              <li><small>Location</small>Cirebon, West Java</li>
            </ul>
            <div><div id="qr" aria-hidden="true"></div><small>rizki-portofolio.my.id</small></div>
          </div>
          <div className="c-cta">
            <a className="btn btn-solid" href="mailto:muhammadrizki.personal@gmail.com" data-mag>Start a Project</a>
            <a className="btn btn-ghost glass" href={cv} download data-mag>Download CV</a>
          </div>
        </div>
      </section>
      </main>

      <footer>
        <span>2026 Muhammad Rizki</span>
        <div>
          <a href="https://github.com/zihunn" rel="noopener noreferrer" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/muhammad-rizki-938a1b286" rel="noopener noreferrer" target="_blank">LinkedIn</a>
          <a href="https://www.instagram.com/m.rizkky._" rel="noopener noreferrer" target="_blank">Instagram</a>
        </div>
      </footer>
    </>
  )
}
