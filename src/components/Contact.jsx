import { useState } from 'react'

const INITIAL = { name: '', emailHelp: '', phone: '', subject: '', comments: '' }

export default function Contact() {
  const [form, setForm] = useState(INITIAL)
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch('contact-form.php', {
        method: 'POST',
        body: new URLSearchParams(form),
      })
      const data = await res.json()
      setResult({ ok: data.status === 'Success', msg: data.msg })
    } catch {
      setResult({ ok: false, msg: 'Something went wrong. Please try again.' })
    }
    setSubmitting(false)
  }

  return (
    <section className="w-100 float-left form-main-con padding-top padding-bottom" id="Contact">
      <div className="container">
        <div className="form-main-inner-con position-relative">
          <div className="generic-title text-center">
            <h6>Get in Touch</h6>
            <h2 className="mb-0">Any Questions? Feel Free<br />to Contact</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 order-lg-0 order-2">
              <div className="contact-information position-relative wow slideInLeft">
                <ul className="list-unstyled">
                  <li>
                    <figure className="mb-0 d-flex align-items-center justify-content-center">
                      <img src="/assets/image/message-icon.png" alt="message-icon" className="img-fluid" />
                    </figure>
                    <div className="contact-information-content">
                      <h5>Email:</h5>
                      <p className="mb-0">muhammadrizki.personal@gmail.com</p>
                    </div>
                  </li>
                  <li className="mb-0">
                    <figure className="mb-0 d-flex align-items-center justify-content-center">
                      <img src="/assets/image/phone-icon.png" alt="phone-icon" className="img-fluid" />
                    </figure>
                    <div className="contact-information-content">
                      <h5>Phone:</h5>
                      <p className="mb-0">+6285896173893</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8">
              {result && (
                <div id="form_result">
                  <span className={result.ok ? 'form-success' : 'form-error'}>{result.msg}</span>
                </div>
              )}
              <form
                id="contactpage"
                method="POST"
                className="contact-form wow slideInRight text-lg-left text-center"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group mb-0">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group mb-0">
                      <input
                        type="email"
                        id="emailHelp"
                        name="emailHelp"
                        placeholder="Email"
                        value={form.emailHelp}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group mb-0">
                      <input
                        type="tel"
                        placeholder="Phone"
                        name="phone"
                        id="phone"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group mb-0">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        id="subject"
                        value={form.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mb-0">
                      <textarea
                        placeholder="Message"
                        rows="3"
                        name="comments"
                        id="comments"
                        value={form.comments}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button type="submit" id="submit" className="appointment-btn" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
