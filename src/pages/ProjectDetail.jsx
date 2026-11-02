import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { store } from '../data/store.js'
import { LAYERS } from '../landing/content.js'

const AUTO_SLIDE_MS = 4500
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const LOGOS = Object.fromEntries(LAYERS.flatMap(l => l.c))

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

function Viewer({ shots, title }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const go = i => setActive((i + shots.length) % shots.length)

  useEffect(() => {
    if (reduced || paused || shots.length < 2) return
    const t = setTimeout(() => go(active + 1), AUTO_SLIDE_MS)
    return () => clearTimeout(t)
  }, [active, paused, shots.length])

  return (
    <div className="pd-viewer" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="pd-frame">
        {shots.map((src, i) => (
          <img key={src} className={i === active ? 'on' : ''} src={src} alt={`${title} screenshot ${i + 1}`} loading={i ? 'lazy' : 'eager'} />
        ))}
        {shots.length > 1 && <>
          <button type="button" className="pd-arrow pd-prev" onClick={() => go(active - 1)} aria-label="Previous screenshot"><Icon d="M15 5l-7 7 7 7" /></button>
          <button type="button" className="pd-arrow pd-next" onClick={() => go(active + 1)} aria-label="Next screenshot"><Icon d="M9 5l7 7-7 7" /></button>
          <span className="pd-counter">{active + 1} / {shots.length}</span>
        </>}
      </div>
      {shots.length > 1 && (
        <div className="pd-thumbs">
          {shots.map((src, i) => (
            <button type="button" key={src} className={i === active ? 'on' : ''} onClick={() => go(i)} aria-label={`Show screenshot ${i + 1}`} aria-current={i === active}>
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Project({ id }) {
  const navigate = useNavigate()
  const location = useLocation()
  const root = useRef(null)

  const projects = store.getPortfolio()
  const index = projects.findIndex(p => p.id === id)
  const project = projects[index]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!root.current) return
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
    }), { threshold: .15 })
    root.current.querySelectorAll('[data-reveal]').forEach(el => io.observe(el))
    const nav = root.current.querySelector('nav')
    const darkBands = root.current.querySelectorAll('.pd-hero, .pd-next-project')
    const onScroll = () => {
      if (!reduced) root.current.style.setProperty('--sy', window.scrollY)
      nav.style.setProperty('--p', (window.scrollY / (document.documentElement.scrollHeight - innerHeight || 1)).toFixed(4))
      nav.classList.toggle('dark', [...darkBands].some(b => {
        const r = b.getBoundingClientRect()
        return r.top < 40 && r.bottom > 40
      }))
    }
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', onScroll) }
  }, [])

  if (!project) {
    return (
      <main className="pd-missing">
        <h1>Project not found.</h1>
        <Link className="btn btn-solid" to="/#work">View all work</Link>
      </main>
    )
  }

  const title = project.shortTitle || project.title
  const shots = project.screenshots?.length ? project.screenshots : [project.img]
  const next = projects[(index + 1) % projects.length]
  const number = String(index + 1).padStart(2, '0')
  // A first visit has no page to go back to
  const back = () => (location.key === 'default' ? navigate('/#work') : navigate(-1))

  return (
    <div className="pd" ref={root}>
      <nav className="glass" aria-label="Main">
        <Link className="logo" to="/"><img src="/assets/redesign/brand/logo-nav.webp" alt="Muhammad Rizki, home" width="28" height="28" /></Link>
        <button type="button" className="pd-back" onClick={back}><Icon d="M19 12H5M11 6l-6 6 6 6" />All work</button>
        <Link className="btn btn-solid" to="/#contact">Hire Me</Link>
      </nav>

      <header className="pd-hero">
        <div className="pd-ghost" aria-hidden="true">{number}</div>
        <div className="pd-hero-in" data-reveal>
          <div className="eyebrow">Project {number} of {String(projects.length).padStart(2, '0')}, {project.badge}</div>
          <h1>{title}</h1>
          <p>{project.summary || project.desc}</p>
        </div>
      </header>

      <main className="pd-body">
        <div data-reveal><Viewer shots={shots} title={title} /></div>

        <div className="pd-info">
          <section data-reveal>
            <div className="eyebrow">Overview</div>
            <p className="pd-overview">{project.fullDesc}</p>
          </section>
          <section data-reveal>
            <div className="eyebrow">Built with</div>
            <ul className="pd-stack">
              {project.skills.map(s => (
                <li key={s}>
                  <div className="tile-face">
                    {LOGOS[s] ? <img src={`/assets/redesign/logos/${LOGOS[s]}.svg`} alt="" width="48" height="48" /> : <b aria-hidden="true">{s[0]}</b>}
                  </div>
                  {s}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Replace, so the back button always returns to the home page */}
      <Link className="pd-next-project" to={`/project/${next.id}`} replace>
        <div>
          <div className="eyebrow">Next project</div>
          <strong>{next.shortTitle || next.title}</strong>
        </div>
        <img src={next.cover || next.img} alt="" loading="lazy" />
      </Link>

      <footer>
        <span>2026 Muhammad Rizki</span>
        <div>
          <a href="https://github.com/zihunn" rel="noopener noreferrer" target="_blank">GitHub</a>
          <a href="https://www.linkedin.com/in/muhammad-rizki-938a1b286" rel="noopener noreferrer" target="_blank">LinkedIn</a>
          <a href="https://www.instagram.com/m.rizkky._" rel="noopener noreferrer" target="_blank">Instagram</a>
        </div>
      </footer>
    </div>
  )
}

export default function ProjectDetail() {
  const { id } = useParams()
  return <Project id={id} key={id} />
}
