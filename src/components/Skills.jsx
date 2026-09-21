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
                {[skills.slice(0, 2), skills.slice(2)].map((row, ri) => (
                  <div key={ri} className="row service-skill-sttaf-con">
                    {row.map(({ name, img }) => (
                      <div key={name} className="col-lg-6 col-md-6 col-sm-6 col-12">
                        <div className="skill-left-item-con">
                          <img src={img} alt={name} style={{ height: '9rem', paddingBottom: '20%' }} />
                          <div className="service-skill-sttaf-item-heading">
                            <p className="mb-0">{name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center">
              <div className="skill-right-con wow slideInRight">
                <h6>My Skills</h6>
                <h2>Creating Apps that Turn Ideas into Reality</h2>
                <p>
                  I often use Laravel and Flutter frameworks to develop applications.
                  For data management, I use Firebase for cloud-based solutions and
                  MySQL for more traditional database needs.
                  This combination helps me provide effective and secure solutions for each project.
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
