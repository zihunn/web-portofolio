import { store } from '../data/store.js'

export default function Skills() {
  const skills = store.getSkills()
  const cvPath = store.getCv()

  const downloadCV = (e) => {
    e.preventDefault()
    const el = document.createElement('a')
    el.href = cvPath
    el.download = cvPath.split('/').pop()
    document.body.appendChild(el)
    setTimeout(() => { el.click(); el.remove() }, 100)
  }

  return (
    <section className="w-100 float-left skill-con padding-top padding-bottom position-relative" id="about-con">
      <div className="container">
        <div className="skill-inner-con position-relative">
          <div className="row">
            <div className="col-lg-6 order-lg-0 order-2">
              <div className="skill-left-con text-center wow slideInLeft">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {skills.map(({ name, img }) => (
                    <div key={name} className="skill-left-item-con" style={{ margin: 0 }}>
                      <img src={img} alt={name} style={{ height: '4rem', paddingBottom: '8%' }} />
                      <div className="service-skill-sttaf-item-heading">
                        <p className="mb-0" style={{ fontSize: '13px' }}>{name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="skill-right-con wow slideInRight">
                <h6>My Skills</h6>
                <h2>The Stack Behind the Work</h2>
                <p>
                  I have been working with this stack since 2023 on real clients and real systems.
                  It is what I reach for when something actually needs to work.
                </p>
                <div className="generic-btn download-bnt">
                  <a href="#" id="downloadImg" onClick={downloadCV}>Download CV</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
