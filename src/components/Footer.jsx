export default function Footer() {
  return (
    <div className="w-100 float-left weight-footer-con position-relative">
      <div className="container">
        <div className="weight-footer-content text-center wow fadeInUp">
          <figure className="">
            <img src="/assets/image/logo-me.svg" alt="footer-logo" className="img-fluid" />
          </figure>
          <div className="footer-navbar">
            <ul className="list-unstyled">
              <li className="d-inline-block border-left-0 pl-0"><a href="#home">Home</a></li>
              <li className="d-inline-block"><a href="#about-con">My Skills</a></li>
              <li className="d-inline-block"><a href="#service-con">Services</a></li>
              <li className="d-inline-block"><a href="#Portfolio">Portfolio</a></li>
              <li className="d-inline-block pr-0"><a href="#Contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-social-icon">
            <ul className="mb-0">
              <li className="d-inline-block">
                <a href="https://github.com/zihunn">
                  <i className="fab fa-github d-flex align-items-center justify-content-center"></i>
                </a>
              </li>
              <li className="d-inline-block">
                <a href="https://www.instagram.com/m.rizkky._" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram d-flex align-items-center justify-content-center"></i>
                </a>
              </li>
              <li className="d-inline-block">
                <a href="https://www.linkedin.com/in/muhammad-rizki-938a1b286" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in d-flex align-items-center justify-content-center"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copy-right-content text-center">
          <p className="mb-0">Copyright {new Date().getFullYear()} rizki-portofolio.my.id | All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}
