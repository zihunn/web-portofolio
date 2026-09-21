import { useState } from 'react'
import { store } from '../data/store.js'

const CATEGORIES = [
  { id: 'android', label: 'Android App' },
  { id: 'web', label: 'Web App' },
  { id: 'mobile', label: 'Mobile UI' },
  { id: 'other', label: 'Other' },
]

const EMPTY_PROJECT = {
  id: '', img: '', title: '', desc: '', fullDesc: '',
  category: 'android', badge: 'Android App',
  skills: [], screenshots: [],
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ── Portfolio Tab ── */
function PortfolioTab() {
  const [items, setItems] = useState(store.getPortfolio())
  const [form, setForm] = useState(null)       // null = closed, object = editing
  const [skillInput, setSkillInput] = useState('')
  const [shotInput, setShotInput] = useState('')

  const persist = (next) => { store.setPortfolio(next); setItems(next) }

  const openAdd = () => {
    setForm({ ...EMPTY_PROJECT })
    setSkillInput('')
    setShotInput('')
  }

  const openEdit = (item) => {
    setForm({ ...item })
    setSkillInput('')
    setShotInput('')
  }

  const closeForm = () => setForm(null)

  const setField = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !form.skills.includes(s)) setField('skills', [...form.skills, s])
    setSkillInput('')
  }

  const removeSkill = (s) => setField('skills', form.skills.filter(x => x !== s))

  const addShot = () => {
    const s = shotInput.trim()
    if (s) setField('screenshots', [...form.screenshots, s])
    setShotInput('')
  }

  const removeShot = (i) => setField('screenshots', form.screenshots.filter((_, idx) => idx !== i))

  const save = () => {
    if (!form.title.trim()) return alert('Judul wajib diisi')
    const id = form.id || slugify(form.title)
    const item = { ...form, id, img: form.img || (form.screenshots[0] || '') }
    const existing = items.findIndex(x => x.id === id)
    const next = existing >= 0
      ? items.map(x => x.id === id ? item : x)
      : [...items, item]
    persist(next)
    closeForm()
  }

  const remove = (id) => {
    if (!confirm('Hapus project ini?')) return
    persist(items.filter(x => x.id !== id))
  }

  return (
    <div className="adm-tab-content">
      <div className="adm-toolbar">
        <span className="adm-count">{items.length} project</span>
        <button className="adm-btn adm-btn-primary" onClick={openAdd}>
          <i className="fas fa-plus"></i> Tambah Project
        </button>
      </div>

      <div className="adm-list">
        {items.map(item => (
          <div className="adm-list-item" key={item.id}>
            <img src={item.img} alt={item.title} className="adm-list-thumb" />
            <div className="adm-list-info">
              <p className="adm-list-title">{item.title}</p>
              <span className="adm-list-badge">{item.badge}</span>
            </div>
            <div className="adm-list-actions">
              <button className="adm-icon-btn" onClick={() => openEdit(item)} title="Edit">
                <i className="fas fa-pen"></i>
              </button>
              <button className="adm-icon-btn adm-icon-btn-danger" onClick={() => remove(item.id)} title="Hapus">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Side panel form */}
      {form && (
        <div className="adm-panel-overlay" onClick={closeForm}>
          <div className="adm-panel" onClick={e => e.stopPropagation()}>
            <div className="adm-panel-header">
              <h3>{form.id ? 'Edit Project' : 'Tambah Project'}</h3>
              <button className="adm-close-btn" onClick={closeForm}><i className="fas fa-times"></i></button>
            </div>
            <div className="adm-panel-body">
              <label className="adm-label">Judul <span>*</span></label>
              <input className="adm-input" value={form.title} onChange={e => setField('title', e.target.value)} placeholder="Nama project" />

              <label className="adm-label">Deskripsi singkat</label>
              <input className="adm-input" value={form.desc} onChange={e => setField('desc', e.target.value)} placeholder="Satu kalimat deskripsi" />

              <label className="adm-label">Deskripsi lengkap</label>
              <textarea className="adm-input adm-textarea" value={form.fullDesc} onChange={e => setField('fullDesc', e.target.value)} placeholder="Deskripsi detail project" />

              <div className="adm-row-2">
                <div>
                  <label className="adm-label">Kategori</label>
                  <select className="adm-input adm-select" value={form.category} onChange={e => setField('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="adm-label">Badge</label>
                  <input className="adm-input" value={form.badge} onChange={e => setField('badge', e.target.value)} placeholder="Contoh: Android App" />
                </div>
              </div>

              <label className="adm-label">Gambar thumbnail (path)</label>
              <input className="adm-input" value={form.img} onChange={e => setField('img', e.target.value)} placeholder="/assets/image/nama-file.jpg" />

              <label className="adm-label">Screenshots (path)</label>
              {form.screenshots.map((s, i) => (
                <div className="adm-tag-row" key={i}>
                  <span className="adm-shot-path">{s}</span>
                  <button className="adm-tag-remove" onClick={() => removeShot(i)}><i className="fas fa-times"></i></button>
                </div>
              ))}
              <div className="adm-input-row">
                <input className="adm-input" value={shotInput} onChange={e => setShotInput(e.target.value)} placeholder="/assets/image/screenshot.jpg" onKeyDown={e => e.key === 'Enter' && addShot()} />
                <button className="adm-btn adm-btn-sm" onClick={addShot}>Tambah</button>
              </div>

              <label className="adm-label">Tech / Skills</label>
              <div className="adm-chips">
                {form.skills.map(s => (
                  <span className="adm-chip" key={s}>
                    {s}
                    <button onClick={() => removeSkill(s)}><i className="fas fa-times"></i></button>
                  </span>
                ))}
              </div>
              <div className="adm-input-row">
                <input className="adm-input" value={skillInput} onChange={e => setSkillInput(e.target.value)} placeholder="Contoh: Flutter" onKeyDown={e => e.key === 'Enter' && addSkill()} />
                <button className="adm-btn adm-btn-sm" onClick={addSkill}>Tambah</button>
              </div>
            </div>
            <div className="adm-panel-footer">
              <button className="adm-btn" onClick={closeForm}>Batal</button>
              <button className="adm-btn adm-btn-primary" onClick={save}>Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Skills Tab ── */
function SkillsTab() {
  const [skills, setSkills] = useState(store.getSkills())
  const [name, setName] = useState('')
  const [img, setImg] = useState('')

  const persist = (next) => { store.setSkills(next); setSkills(next) }

  const add = () => {
    if (!name.trim()) return alert('Nama skill wajib diisi')
    persist([...skills, { name: name.trim(), img: img.trim() || '/assets/image/default-skill.svg' }])
    setName(''); setImg('')
  }

  const remove = (n) => {
    if (!confirm(`Hapus skill "${n}"?`)) return
    persist(skills.filter(s => s.name !== n))
  }

  return (
    <div className="adm-tab-content">
      <div className="adm-toolbar">
        <span className="adm-count">{skills.length} skill</span>
      </div>

      <div className="adm-skill-grid">
        {skills.map(s => (
          <div className="adm-skill-card" key={s.name}>
            <img src={s.img} alt={s.name} />
            <p>{s.name}</p>
            <button className="adm-skill-remove" onClick={() => remove(s.name)} title="Hapus">
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>

      <div className="adm-add-skill-form">
        <h4 className="adm-form-title">Tambah Skill</h4>
        <div className="adm-row-2">
          <div>
            <label className="adm-label">Nama skill <span>*</span></label>
            <input className="adm-input" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Flutter" onKeyDown={e => e.key === 'Enter' && add()} />
          </div>
          <div>
            <label className="adm-label">Path icon</label>
            <input className="adm-input" value={img} onChange={e => setImg(e.target.value)} placeholder="/assets/image/flutter.svg" />
          </div>
        </div>
        <button className="adm-btn adm-btn-primary" onClick={add}>
          <i className="fas fa-plus"></i> Tambah
        </button>
      </div>
    </div>
  )
}

/* ── CV Tab ── */
function CvTab() {
  const [path, setPath] = useState(store.getCv())
  const [saved, setSaved] = useState(false)

  const save = () => {
    if (!path.trim()) return
    store.setCv(path.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="adm-tab-content">
      <div className="adm-cv-section">
        <p className="adm-cv-hint">
          Upload file CV kamu ke folder <code>public/assets/cv/</code> lalu masukkan path-nya di sini.
        </p>
        <label className="adm-label">Path file CV</label>
        <div className="adm-input-row">
          <input
            className="adm-input"
            value={path}
            onChange={e => { setPath(e.target.value); setSaved(false) }}
            placeholder="/assets/cv/nama-cv.pdf"
          />
          <button className="adm-btn adm-btn-primary" onClick={save}>
            {saved ? <><i className="fas fa-check"></i> Tersimpan</> : 'Simpan'}
          </button>
        </div>
        <div className="adm-cv-preview">
          <a href={path} target="_blank" rel="noopener noreferrer" className="adm-btn">
            <i className="fas fa-eye"></i> Preview CV
          </a>
          <span className="adm-cv-path">{path}</span>
        </div>
      </div>
    </div>
  )
}

/* ── Main Admin ── */
const TABS = [
  { id: 'portfolio', label: 'Portfolio', icon: 'fa-briefcase' },
  { id: 'skills', label: 'Skills', icon: 'fa-code' },
  { id: 'cv', label: 'CV', icon: 'fa-file-alt' },
]

export default function Admin() {
  const [tab, setTab] = useState('portfolio')

  const resetAll = () => {
    if (!confirm('Reset semua data ke default? Perubahan akan hilang.')) return
    store.reset()
    window.location.reload()
  }

  return (
    <div className="adm-page">
      <header className="adm-header">
        <div className="adm-header-inner">
          <div className="adm-logo">
            <i className="fas fa-layer-group"></i>
            <span>CMS Admin</span>
          </div>
          <div className="adm-header-actions">
            <a href="/" className="adm-btn adm-btn-ghost" target="_blank" rel="noopener noreferrer">
              <i className="fas fa-external-link-alt"></i> Lihat Portfolio
            </a>
            <button className="adm-btn adm-btn-danger-ghost" onClick={resetAll} title="Reset ke default">
              <i className="fas fa-rotate-left"></i> Reset
            </button>
          </div>
        </div>
      </header>

      <div className="adm-body">
        <nav className="adm-sidebar">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`adm-nav-btn${tab === t.id ? ' active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              <i className={`fas ${t.icon}`}></i>
              <span>{t.label}</span>
            </button>
          ))}
        </nav>

        <main className="adm-main">
          <div className="adm-section-header">
            <h2>{TABS.find(t => t.id === tab)?.label}</h2>
          </div>
          {tab === 'portfolio' && <PortfolioTab />}
          {tab === 'skills' && <SkillsTab />}
          {tab === 'cv' && <CvTab />}
        </main>
      </div>
    </div>
  )
}
