import * as THREE from 'three'
import Lenis from 'lenis'
import qrcode from 'qrcode-generator'
import { LAYERS } from './content.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = t => t * t * (3 - 2 * t)

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
const narrow = matchMedia('(max-width: 820px)')
const isFlat = () => reduced || narrow.matches
const isMob = () => narrow.matches && !reduced
const setFlat = () => {
  document.documentElement.classList.toggle('flat', isFlat())
  document.documentElement.classList.toggle('mob', isMob())
}

/* Content */
const face = ([n, f]) => `<div class="tile-face"><img src="/assets/redesign/logos/${f}.svg" alt="${n} logo" width="48" height="48"></div>`
const CLIENTS = [['bulog', 'BULOG'], ['peruri', 'Peruri'], ['borneo', 'Borneo FC Samarinda'], ['jampidmil', 'Jampidmil'], ['emmo', 'EMMO'], ['arora', 'Arora Kreatif Indonesia'], ['cakrawala', 'LPK Cakrawala'], ['uim', 'Universitas Insan Mahardika']]

/* Runs the page's motion on the markup in Home.jsx and returns a stop function. */
export function startLanding() {
  const ac = new AbortController(), { signal } = ac
  setFlat()

  // The canvas belongs to one run: its WebGL context is released on stop
  const canvas = document.createElement('canvas')
  canvas.id = 'core'
  canvas.setAttribute('aria-hidden', 'true')
  $('#bg').after(canvas)

  $('#orbit').innerHTML = LAYERS.map(l => '<div class="ring"></div>' +
    l.c.map(c => `<div class="tile">${face(c)}<span>${c[0]}</span></div>`).join('')).join('')
  $('#st-steps').innerHTML = LAYERS.map((l, i) => `<button type="button" data-i="${i}">${l.t}</button>`).join('')
  $('#st-flat').innerHTML = LAYERS.map(l => `<section data-reveal><h3>${l.t}</h3><p>${l.d}</p><ul>${
    l.c.map((c, i) => `<li style="--i:${i}">${face(c)}${c[0]}</li>`).join('')}</ul></section>`).join('')
  const clientSet = hidden => `<ul${hidden ? ' aria-hidden="true"' : ''}>${CLIENTS.map(([f, n]) =>
    `<li><img src="/assets/redesign/clients/${f}.webp" alt="${hidden ? '' : n}"></li>`).join('')}</ul>`
  $('#marquee').innerHTML = clientSet(false) + (reduced ? '' : clientSet(true))
  $('#marquee').innerHTML = clientSet(false) + (reduced ? '' : clientSet(true))

  /* Elements and measurements */
  const sections = Object.fromEntries(['hero', 'proof', 'build', 'stack', 'work', 'contact'].map(k => [k, $('#' + k)]))
  const slots = $$('.slot'), ghosts = $$('[data-ghost]'), floats = $$('.float'), stepBtns = $$('#st-steps button')
  const track = $('#track'), portrait = $('#portrait'), pars = $$('[data-par]')
  const projectImgs = () => $$('.project img')
  const orns = $$('.orn').map((el, i) => ({ el, d: +el.dataset.depth, ph: i * 1.7, x: 0, y: 0, vx: 0, vy: 0, near: 0, spin: 0, spinTo: 0, bx: 0, by: 0, r: 0, ox: 0, oy: 0 }))
  const deckTop = i => 84 + i * 12 // where each service card pins on phones
  let vw = innerWidth, vh = innerHeight, keys = [], tops = {}, docEnd = 1

  function measure() {
    setFlat()
    vw = innerWidth; vh = innerHeight
    const mob = isMob()
    slots.forEach((s, i) => { s.style.top = mob ? `${deckTop(i)}px` : '' })
    if (!mob) pars.forEach(el => { el.style.transform = '' })
    orns.forEach(o => {
      o.r = o.el.offsetWidth / 2 // 0 when hidden on phones
      o.bx = o.el.offsetLeft + o.r; o.by = o.el.offsetTop + o.r
      const dx = o.bx - vw / 2, dy = o.by - vh / 2, d = Math.hypot(dx, dy) || 1
      o.ox = dx / d; o.oy = dy / d
    })
    sections.work.style.height = reduced ? '' : `${track.scrollWidth - vw + vh * 1.15}px`
    docEnd = document.documentElement.scrollHeight - vh
    for (const k in sections) {
      const r = sections[k].getBoundingClientRect()
      tops[k] = { top: r.top + scrollY, h: r.height }
    }
    const end = k => tops[k].top + tops[k].h - vh
    const S = (x, y, s, rx, ry, gap, op = 1, fan = 0) => ({ x, y, s, rx, ry, gap, op, fan })
    keys = [
      [0, S(.3, .22, .62, .62, .7, .2)],
      [end('hero') * .9, S(0, -.26, 1.05, .9, 2.0, .34)],
      [tops.proof.top + vh * .15, S(.34, .24, .72, .6, 3.0, .24)],
      [tops.build.top - vh * .1, S(.37, .3, .4, .62, 3.6, .24)],
      [tops.build.top + (tops.build.h - vh) * .34, S(.37, .3, .4, .62, 4.2, .24, 1, 1)],
      [end('build'), S(.37, .3, .4, .62, 4.8, .24, 1, 1)],
      [tops.stack.top + vh * .2, S(.16, 0, .42, .62, 5.6, .26)],
      [end('stack'), S(.16, 0, .42, .62, 7.6, .26)],
      [tops.work.top + vh * .1, S(.08, -.04, 1.5, .95, 8.6, .4, .3)],
      [end('work'), S(-.1, .02, 1.5, .95, 11.4, .4, .3)],
      [tops.contact.top + vh * .25, S(.34, -.28, .55, .6, 13, .2)],
      [document.documentElement.scrollHeight - vh, S(.34, -.28, .55, .6, 13.8, .16)],
    ]
  }

  function poseAt(y) {
    if (isFlat()) {
      // Phones: the core sinks through the page as you scroll, swinging side to side
      const t = reduced ? 0 : clamp(y / docEnd)
      return { x: .36 * Math.cos(t * 12), y: .36 - t * .72, s: .3, rx: .62, ry: y * .0015, gap: .2, op: .4, fan: 0 }
    }
    let i = 0
    while (i < keys.length - 2 && y > keys[i + 1][0]) i++
    const [y0, a] = keys[i], [y1, b] = keys[i + 1]
    const t = smooth(clamp((y - y0) / (y1 - y0 || 1)))
    const o = {}
    for (const k in a) o[k] = lerp(a[k], b[k], t)
    return o
  }

  /* Pointer */
  const ptr = { x: 0, y: 0, sx: 0, sy: 0, seen: false }
  addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return
    ptr.x = e.clientX / vw * 2 - 1; ptr.y = e.clientY / vh * 2 - 1; ptr.seen = true
  }, { passive: true, signal })

  /* Glass Core */
  let core = null
  try { core = makeCore() } catch (e) { console.warn('core disabled', e); $('#core').remove() }

  function makeCore() {
    const renderer = new THREE.WebGLRenderer({ canvas: $('#core'), alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 50)
    camera.position.z = 10
    const VH = 2 * 10 * Math.tan(THREE.MathUtils.degToRad(17.5))

    // A hand-made studio so reflections stay icy blue, with no HDRI download.
    const env = new THREE.Scene()
    env.add(new THREE.Mesh(new THREE.SphereGeometry(20, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: 'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
      fragmentShader: 'varying vec3 p;void main(){float h=normalize(p).y*.5+.5;gl_FragColor=vec4(mix(vec3(.01,.05,.2),vec3(.72,.86,1.),smoothstep(.1,.9,h)),1.);}',
    })))
    const panel = (w, h, x, y, z, v) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(v, v, v * 1.1), side: THREE.DoubleSide }))
      m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m)
    }
    panel(10, 3, 0, 11, 4, 9); panel(2.4, 12, -12, 2, 3, 6); panel(2, 10, 12, 0, 5, 5); panel(9, 1.2, 0, -7, 11, 3); panel(5, 2, 3, 4, -13, 4)
    const pm = new THREE.PMREMGenerator(renderer)
    scene.environment = pm.fromScene(env, .02).texture
    pm.dispose()

    const geo = new RoundedBoxGeometry(2, .15, 2, 5, .07)
    const slabs = [...Array(5)].map(() => {
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x8fbfff, metalness: .78, roughness: .06, clearcoat: 1, clearcoatRoughness: .05,
        envMapIntensity: 1.5, transparent: true, opacity: .3, side: THREE.DoubleSide, depthWrite: false,
        emissive: 0x1E6BFF, emissiveIntensity: 0,
      })
      // Fresnel: faces stay see-through over the page, edges catch the light.
      mat.onBeforeCompile = sh => {
        sh.fragmentShader = sh.fragmentShader.replace('#include <opaque_fragment>', `
          float fr = pow(1. - abs(dot(normalize(normal), normalize(vViewPosition))), 2.4);
          outgoingLight += vec3(.55,.76,1.) * fr * .7;
          diffuseColor.a = mix(diffuseColor.a, min(1., opacity * 3.34), fr);
          #include <opaque_fragment>`)
      }
      const m = new THREE.Mesh(geo, mat)
      m.renderOrder = 1
      scene.add(m)
      return m
    })

    const resize = () => {
      renderer.setPixelRatio(Math.min(devicePixelRatio, isFlat() ? 1 : 1.5))
      renderer.setSize(innerWidth, innerHeight, false)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }
    const qA = new THREE.Quaternion(), qF = new THREE.Quaternion(), e = new THREE.Euler()
    const v = new THREE.Vector3(), up = new THREE.Vector3()
    let active = 0, slideS = [0, 0, 0, 0, 0]

    return {
      resize,
      dispose() { renderer.dispose(); renderer.forceContextLoss() },
      draw(p, time, activeLayer) {
        active = activeLayer
        const w = VH * vw / vh
        const px = p.x * w, py = p.y * VH
        const idle = reduced ? 0 : Math.sin(time * .6) * .05
        const rx = p.rx + ptr.sy * .12 + idle, ry = p.ry + ptr.sx * .22 + (reduced ? 0 : time * .05)
        e.set(rx, ry, 0); qA.setFromEuler(e)
        slabs.forEach((m, i) => {
          // Assembled stack
          slideS[i] = lerp(slideS[i], active === i ? 1 : 0, .1)
          up.set(0, (2 - i) * p.gap, 0).multiplyScalar(p.s).applyQuaternion(qA)
          v.set(px + up.x, py + up.y + (reduced ? 0 : Math.sin(time * .9 + i) * .012), up.z)
          m.quaternion.copy(qA)
          let sx = p.s, st = p.s, sz = p.s, plate = 0
          if (p.fan > .001) {
            // Each plate lands flat behind its service card, at the card's exact size
            const f = smooth(clamp(p.fan * 1.6 - i * .15))
            const r = slots[i] && slots[i].getBoundingClientRect()
            const unit = VH / vh
            const off = clamp(vw * .0062, 6, 11) // same as --off in the CSS
            const fx = r ? (r.left + r.width / 2 + off - vw / 2) * unit : v.x
            const fy = r ? -(r.top + r.height / 2 + off - vh / 2) * unit : v.y
            v.set(lerp(v.x, fx, f), lerp(v.y, fy, f), lerp(v.z, 0, f))
            sx = lerp(p.s, r ? r.width * unit / 2 : .001, f)
            sz = lerp(p.s, r ? r.height * unit / 2 : .001, f)
            st = lerp(p.s, .2, f)
            e.set(Math.PI / 2, 0, 0); qF.setFromEuler(e)
            m.quaternion.slerp(qF, f)
            // The last stretch hands over to a CSS plate, which matches the card's rounded corners
            plate = smooth(clamp((f - .93) / .07))
          }
          if (slots[i]) slots[i].style.setProperty('--plate', plate.toFixed(3))
          m.position.copy(v)
          m.scale.set(Math.max(sx, .001), Math.max(st, .001), Math.max(sz, .001))
          m.material.opacity = .3 * p.op * (1 - plate)
          m.material.emissiveIntensity = slideS[i] * 1.1
          m.visible = p.op > .01 && plate < 1
        })
        renderer.render(scene, camera)
      },
    }
  }

  /* Background depth: ice, then deep blue, then back to the surface */
  const BG = { hero: [234, 242, 251], proof: [228, 239, 251], build: [205, 224, 247], stack: [10, 28, 62], work: [6, 15, 36], contact: [233, 242, 252] }
  const bg = $('#bg'), order = Object.keys(BG)
  function paintBg() {
    let c = BG[order[0]]
    for (let i = 1; i < order.length; i++) {
      const t = smooth(clamp((vh * .75 - sections[order[i]].getBoundingClientRect().top) / (vh * .55)))
      if (t > 0) c = c.map((v, j) => lerp(v, BG[order[i]][j], t))
    }
    bg.style.backgroundColor = `rgb(${c.map(Math.round).join(',')})`
    bg.style.setProperty('--orb', clamp((c[0] - 40) / 160).toFixed(2))
  }

  /* Orbit tower: one ring of logos around each slab of the core */
  const VH = 2 * 10 * Math.tan(THREE.MathUtils.degToRad(17.5))
  const rings = (() => {
    const kids = [...$('#orbit').children]
    let at = 0
    return LAYERS.map(l => {
      const ring = kids[at++]
      const tiles = l.c.map(() => ({ el: kids[at++], hot: false }))
      const r = { ring, tiles, a: 0, held: 0 }
      tiles.forEach(t => {
        t.el.addEventListener('pointerenter', () => { t.hot = true; r.held++; t.el.classList.add('hot') })
        t.el.addEventListener('pointerleave', () => { t.hot = false; r.held--; t.el.classList.remove('hot') })
      })
      return r
    })
  })()
  const stackScroll = i => tops.stack.top + (tops.stack.h - vh) * (.05 + .9 * (i + .3) / 5)
  let lenis = null, stackF = 0, shownLayer = -1, lastT = 0, flatOp = .4
  function showLayer(i) {
    if (i === shownLayer) return
    shownLayer = i
    stepBtns.forEach((b, j) => b.classList.toggle('on', i === j))
    $('#sk-n').textContent = `0${i + 1}`
    $('#sk-t').textContent = LAYERS[i].t
    $('#sk-d').textContent = LAYERS[i].d
    if (!reduced) $('.st-active').animate([{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'ease-out' })
  }
  stepBtns.forEach(b => b.addEventListener('click', () => {
    const y = stackScroll(+b.dataset.i)
    lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
  }))
  showLayer(0)

  function drawOrbit(dt, spin) {
    const S = vh * .27, Rx = Math.min(vw * .24, vh * .46)
    rings.forEach((r, i) => {
      const w = smooth(clamp(1 - Math.abs(stackF - i)))
      const cy = (i - stackF) * S
      const R = Rx * lerp(.46, 1, w), Ry = R * (.42 + ptr.sy * .06)
      r.ring.style.width = `${R * 2}px`
      r.ring.style.height = `${Ry * 2}px`
      r.ring.style.transform = `translate(-50%,-50%) translate3d(0,${cy}px,0)`
      r.ring.style.opacity = lerp(.1, .42, w)
      if (!r.held) r.a += dt * .28
      const n = r.tiles.length, big = n <= 3 ? 1.24 : 1
      r.tiles.forEach((t, k) => {
        const a = r.a + k / n * Math.PI * 2 + spin + ptr.sx * .4
        const d = (Math.sin(a) + 1) / 2
        const sc = lerp(.48, big, w) * lerp(.84, 1.1, d) * (t.hot ? 1.2 : 1)
        const st = t.el.style
        st.transform = `translate3d(${Math.cos(a) * R}px,${cy + Math.sin(a) * Ry}px,0) translate(-50%,-50%) scale(${sc.toFixed(3)})`
        st.opacity = (lerp(.2, 1, w) * lerp(.85, 1, d)).toFixed(3)
        st.zIndex = Math.round(d * 50 + w * 100)
        st.pointerEvents = w > .5 ? 'auto' : 'none'
        st.setProperty('--l', w.toFixed(2))
      })
    })
  }

  /* Frame */
  const prog = el => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - vh || 1)) }
  const l1 = $('#l1'), l2 = $('#l2'), l3 = $('#l3'), hLeft = $('#h-left'), hRight = $('#h-right'), hint = $('.scroll-hint'), cPhoto = $('#c-photo')
  const h1 = $('#hero h1'), navLinks = $$('[data-nav]')
  const nav = $('nav'), navInd = $('.nav-ind'), navMenu = $('.nav-menu')
  let imgs = [], lastNav = '', frameId = 0, lenisId = 0

  function frame(ms) {
    const time = ms / 1000
    const dt = Math.min(.05, time - lastT); lastT = time
    const y = scrollY
    const ease = reduced ? 1 : .08
    ptr.sx = lerp(ptr.sx, ptr.x, ease); ptr.sy = lerp(ptr.sy, ptr.y, ease)
    const flat = isFlat(), mob = isMob()

    // Hero: letters split, the camera pushes through
    const hp = reduced ? 0 : prog(sections.hero)
    const hv = sections.hero.getBoundingClientRect().bottom > 0
    if (hv) {
      const mx = reduced ? 0 : ptr.sx, my = reduced ? 0 : ptr.sy
      const e = smooth(hp)
      h1.style.transform = `translate3d(${-mx * 10}px,${-my * 6}px,0)`
      l1.style.transform = `translate3d(${-e * 42}vw,0,0)`
      l3.style.transform = `translate3d(${e * 42}vw,0,0)`
      l2.style.transform = `translate3d(0,${-e * 70}vh,0)`
      portrait.style.transform = `translateX(-50%) translateY(${e * 5}vh) scale(${1 + e * .42})`
      portrait.style.transformOrigin = '50% 38%'
      portrait.style.opacity = 1 - smooth(clamp((hp - .55) / .4))
      const fade = 1 - clamp(hp * 3.2)
      hLeft.style.opacity = hRight.style.opacity = hint.style.opacity = fade
      hLeft.style.visibility = hRight.style.visibility = fade <= 0 ? 'hidden' : ''
      hLeft.style.transform = `translate3d(${-e * 16}vw,0,0)`
      hRight.style.transform = `translate3d(${e * 16}vw,0,0)`
      floats.forEach(f => {
        const d = +f.dataset.depth
        f.style.transform = `translate3d(${mx * d * 14}px,${my * d * 10 - e * vh * .75 * d}px,0)`
      })
      // Ornaments: float on their own, lean toward the cursor, get pushed away up close, spring back
      if (!reduced) {
        const fr = dt * 60, damp = .88 ** fr
        const cx = (ptr.x + 1) / 2 * vw, cy = (ptr.y + 1) / 2 * vh
        orns.forEach(o => {
          if (!o.r) return
          const tx = mx * o.d * 26 + Math.sin(time * (.5 + o.d * .2) + o.ph) * 9
          const ty = my * o.d * 18 + Math.cos(time * (.7 + o.d * .15) + o.ph) * 14
          let near = 0
          if (ptr.seen) {
            const dx = o.bx + o.x - cx, dy = o.by + o.y - cy, d = Math.hypot(dx, dy) || 1
            near = clamp(1 - d / (o.r + 150))
            const push = near * near * 5 * fr
            o.vx += dx / d * push; o.vy += dy / d * push
          }
          o.vx = (o.vx + (tx - o.x) * .035 * fr) * damp
          o.vy = (o.vy + (ty - o.y) * .035 * fr) * damp
          o.x += o.vx * fr; o.y += o.vy * fr
          o.near = lerp(o.near, near, .12)
          o.spin = lerp(o.spin, o.spinTo, .07)
          const rot = Math.sin(time * .4 + o.ph) * 10 + o.vx * 1.4 + o.spin
          o.el.style.transform = `translate3d(${o.x + o.ox * e * vw * .7}px,${o.y + o.oy * e * vh * .8}px,0) rotate(${rot.toFixed(2)}deg) scale(${(1 + o.near * .14).toFixed(3)})`
          o.el.style.opacity = 1 - clamp(hp * 2.6)
        })
      }
    }

    // Ghost type scrolls at the same slow rate everywhere
    ghosts.forEach(g => {
      const r = g.parentElement.closest('section').getBoundingClientRect()
      if (r.bottom < 0 || r.top > vh) return
      const t = (vh - r.top) / (vh + r.height)
      g.style.transform = `translate3d(${(.06 - t * .3) * 100}vw,0,0)`
    })

    // Build: four cards arrive in sequence
    if (!flat) {
      const bp = prog(sections.build)
      slots.forEach((s, i) => {
        const t = smooth(clamp((bp - i * .08) / .26))
        s.style.opacity = t
        s.style.transform = `translate3d(0,${(1 - t) * 50}vh,0) scale(${.94 + t * .06})`
      })
      // Stack: each layer holds, then the camera descends to the next
      const sb = sections.stack.getBoundingClientRect()
      if (sb.top < vh && sb.bottom > 0) {
        const pr = prog(sections.stack)
        const u = clamp((pr - .05) / .9) * 5
        const li = Math.min(4, Math.floor(u))
        stackF = lerp(stackF, li + (li < 4 ? smooth(clamp((u - li - .65) / .35)) : 0), .16)
        drawOrbit(dt, pr * 7)
        showLayer(Math.round(stackF))
      }
    }

    if (mob) {
      // Headings drift at their own speed against the content below them
      pars.forEach(el => {
        const r = el.parentElement.getBoundingClientRect()
        if (r.bottom < -vh * .5 || r.top > vh * 1.5) return
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - vh / 2) * +el.dataset.par}px,0)`
      })
      // Service deck: a pinned card shrinks back as the next one slides over it
      slots.forEach((s, i) => {
        const next = slots[i + 1]
        if (!next) { s.style.transform = ''; return }
        const t = 1 - clamp((next.getBoundingClientRect().top - deckTop(i + 1)) / s.offsetHeight)
        s.style.transform = `scale(${1 - t * .07})`
      })
    }

    if (!reduced) {
      // Work: vertical scroll drives the horizontal track
      const wp = prog(sections.work)
      const max = track.scrollWidth - vw
      track.style.transform = `translate3d(${-wp * max}px,0,0)`
      if (!imgs.length) imgs = projectImgs()
      imgs.forEach(im => {
        const c = im.parentElement.getBoundingClientRect()
        if (c.right < 0 || c.left > vw) return
        const t = (c.left + c.width / 2) / vw - .5
        im.style.transform = `translate3d(${-t * 6}%,0,0)`
      })
    }

    // Contact: portrait rises from below
    const cr = sections.contact.getBoundingClientRect()
    if (cr.top < vh && !reduced) {
      const t = clamp((vh - cr.top) / vh)
      cPhoto.style.transform = `translate3d(${ptr.sx * 8}px,${(1 - smooth(t)) * 22}vh,0)`
    }

    paintBg()
    // The core's slabs line up with the rings, so the tower reads as one object
    const pose = poseAt(y)
    const sr = sections.stack.getBoundingClientRect()
    let act = -1
    if (!flat && sr.top < vh && sr.bottom > 0) {
      const inW = smooth(clamp((vh * .5 - sr.top) / (vh * .4))) * smooth(clamp((sr.bottom - vh * .55) / (vh * .4)))
      const gapPx = .27
      pose.gap = lerp(pose.gap, gapPx * VH / (pose.s * Math.cos(pose.rx)), inW)
      pose.y = lerp(pose.y, (stackF - 2) * gapPx, inW)
      if (inW > .5) act = shownLayer
    }
    // Phones: fade the core out over the dark Stack cards so their text stays readable
    flatOp = lerp(flatOp, sr.top < vh * .7 && sr.bottom > vh * .1 ? 0 : .4, .1)
    if (flat) pose.op = flatOp
    if (core) core.draw(pose, time, act)

    // Nav state
    let cur = ''
    for (const k of ['proof', 'build', 'stack', 'work', 'contact']) if (sections[k].getBoundingClientRect().top < vh * .5) cur = k
    if (cur !== lastNav) { lastNav = cur; navLinks.forEach(a => a.classList.toggle('on', a.dataset.nav === cur)); moveInd() }
    nav.classList.toggle('dark', ['stack', 'work'].some(k => {
      const r = sections[k].getBoundingClientRect()
      return r.top < 40 && r.bottom > 40
    }))
    nav.style.setProperty('--p', clamp(y / docEnd).toFixed(4))

    frameId = requestAnimationFrame(frame)
  }

  /* Nav: the highlight slides to the hovered link and back to the current section */
  function moveInd(a = navLinks.find(l => l.classList.contains('on'))) {
    navInd.style.opacity = a ? 1 : 0
    if (!a) return
    navInd.style.transform = `translateX(${a.offsetLeft}px)`
    navInd.style.width = `${a.offsetWidth}px`
  }
  navLinks.forEach(a => {
    a.addEventListener('pointerenter', () => moveInd(a), { signal })
    a.addEventListener('pointerleave', () => moveInd(), { signal })
  })
  const setMenu = open => {
    nav.classList.toggle('open', open)
    navMenu.setAttribute('aria-expanded', open)
  }
  navMenu.addEventListener('click', () => setMenu(!nav.classList.contains('open')), { signal })
  addEventListener('click', e => { if (!navMenu.contains(e.target)) setMenu(false) }, { signal })

  /* Small interactions */
  if (!reduced) {
    // Ornaments ignore pointer events so they never block the hero, so clicks are matched by distance.
    // The radius is generous because an ornament has already drifted away from a nearby cursor.
    addEventListener('pointerdown', e => {
      if (scrollY > tops.hero.h) return
      orns.forEach(o => {
        if (o.r && Math.hypot(o.bx + o.x - e.clientX, o.by + o.y - e.clientY) < o.r + 70) o.spinTo += 360
      })
    }, { signal })
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - .5) * 9}deg`)
        el.style.setProperty('--rx', `${-((e.clientY - r.top) / r.height - .5) * 9}deg`)
      })
      el.addEventListener('pointerleave', () => { el.style.setProperty('--rx', '0'); el.style.setProperty('--ry', '0') })
    })
    $$('[data-mag]').forEach(el => {
      el.addEventListener('pointermove', e => {
        if (e.pointerType === 'touch') return
        const r = el.getBoundingClientRect()
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .28}px,${(e.clientY - r.top - r.height / 2) * .38}px)`
      })
      el.addEventListener('pointerleave', () => el.style.transform = '')
    })
  }

  const countUp = el => {
    const n = +el.dataset.count, suf = el.dataset.suffix || ''
    if (reduced) { el.textContent = n + suf; return }
    const t0 = performance.now()
    const tick = t => {
      const p = clamp((t - t0) / 1300)
      el.textContent = Math.round(n * (1 - (1 - p) ** 3)) + suf
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return
    e.target.classList.add('in')
    $$('[data-count]', e.target).forEach(countUp)
    io.unobserve(e.target)
  }), { threshold: .2 })
  $$('[data-reveal]').forEach(el => io.observe(el))

  /* Boot */
  function onResize() {
    measure()
    moveInd()
    core && core.resize()
    imgs = []
  }
  // A phone's address bar firing resize on scroll must not shift the pinned sections
  addEventListener('resize', () => { if (!(isMob() && innerWidth === vw)) onResize() }, { signal })
  function boot() {
    onResize()
    const q = qrcode(0, 'M')
    q.addData('https://rizki-portofolio.my.id'); q.make()
    $('#qr').innerHTML = q.createSvgTag({ cellSize: 3, margin: 0, scalable: true })
    if (!reduced && !narrow.matches) {
      lenis = new Lenis({ lerp: .1, anchors: true })
      const raf = t => { lenis.raf(t); lenisId = requestAnimationFrame(raf) }
      lenisId = requestAnimationFrame(raf)
    } else {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
  }
  // Arriving from another route, the window's load event has already fired
  if (document.readyState === 'complete') boot()
  else addEventListener('load', boot, { signal })
  onResize()
  frameId = requestAnimationFrame(frame)

  return () => {
    ac.abort()
    cancelAnimationFrame(frameId); cancelAnimationFrame(lenisId)
    if (lenis) lenis.destroy()
    io.disconnect()
    if (core) core.dispose()
    canvas.remove()
    document.documentElement.classList.remove('flat', 'mob')
    document.documentElement.style.scrollBehavior = ''
  }
}
