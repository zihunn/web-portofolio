const portfolioItems = [
  {
    img: '/assets/image/portfolio-1.jpg',
    title: 'Aplikasi Akademik Mahardika',
    desc: 'Aplikasi untuk mempermudah dosen dan mahasiswa untuk...',
    classes: 'cars',
  },
  {
    img: '/assets/image/portfolio-2.svg',
    title: 'Chat App',
    desc: 'Berkomunikasi dengan saudar...',
    classes: 'colors fruits',
  },
  {
    img: '/assets/image/portfolio-3.svg',
    title: 'Poin of Sale',
    desc: 'Memperbaiki menejemen bisnis...',
    classes: 'cars',
  },
  {
    img: '/assets/image/portfolio-4.svg',
    title: 'Website Landing Page',
    desc: 'Website LKP Kesehatan...',
    classes: 'colors',
  },
  {
    img: '/assets/image/portfolio-5.svg',
    title: 'Clone ui gojek',
    desc: 'Dolar repellendus temporibus...',
    classes: 'cars animals',
  },
]

export default function Portfolio() {
  return (
    <>
      <section className="w-100 float-left portfolio-con padding-top" id="Portfolio">
        <div className="container">
          <div className="generic-title text-center">
            <h6 className="text-white">Creative Works</h6>
            <h2 className="mb-0 text-white">My Portfolio</h2>
          </div>
          <div id="myBtnContainer" className="text-center"></div>
        </div>
      </section>

      <section className="w-100 float-left portfolio-body-con">
        <div className="container">
          <div className="portfolio-img-con position-relative w-100 float-left wow fadeInUp">
            {portfolioItems.map((item, i) => (
              <div key={i} className={`filterDiv ${item.classes} show position-relative`}>
                <div className="portfolio-img position-relative">
                  <figure>
                    <img
                      src={item.img}
                      alt={`portfolio-${i + 1}`}
                      className="img-fluid"
                      style={{ borderRadius: '7%' }}
                    />
                  </figure>
                </div>
                <div className="portfolio-img-content text-left">
                  <div className="portfolio-img-title d-inline-block">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <a href="#" className="float-lg-right">
                    <i className="fas fa-arrow-right d-flex align-items-center justify-content-center"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
