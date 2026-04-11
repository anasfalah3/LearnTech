import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

function Testimonials() {
      const testimonials = [
            {
                  img: "assets/img/testimonial-1.jpg",
                  name: "Client Name",
                  profession: "Profession",
                  text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
            },
            {
                  img: "assets/img/testimonial-2.jpg",
                  name: "Client Name",
                  profession: "Profession",
                  text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
            },
            {
                  img: "assets/img/testimonial-3.jpg",
                  name: "Client Name",
                  profession: "Profession",
                  text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
            },
            {
                  img: "assets/img/testimonial-4.jpg",
                  name: "Client Name",
                  profession: "Profession",
                  text: "Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum et lorem et sit.",
            },
      ];
      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center">
                              <h6 className="section-title bg-white text-center text-primary px-3">Testimonial</h6>
                              <h1 className="mb-5">Our Students Say!</h1>
                        </div>
                        <Swiper
                              modules={[Pagination, Autoplay]}
                              pagination={{ clickable: true }}
                              autoplay={{ delay: 4000, disableOnInteraction: false }}
                              loop
                              slidesPerView={1}
                              spaceBetween={30}
                              breakpoints={{
                                    576: { slidesPerView: 1 },
                                    768: { slidesPerView: 2 },
                                    992: { slidesPerView: 3 },
                              }}
                              style={{ paddingBottom: "50px" }}
                        >
                              {testimonials.map((t, i) => (
                                    <SwiperSlide key={i}>
                                          <div className="testimonial-item text-center">
                                                <img
                                                      className="border rounded-circle p-2 mx-auto mb-3"
                                                      src={t.img}
                                                      alt={t.name}
                                                      style={{ width: "80px", height: "80px", display: "block" }}
                                                />
                                                <h5 className="mb-0">{t.name}</h5>
                                                <p>{t.profession}</p>
                                                <div className="testimonial-text bg-light text-center p-4">
                                                      <p className="mb-0">{t.text}</p>
                                                </div>
                                          </div>
                                    </SwiperSlide>
                              ))}
                        </Swiper>
                  </div>
            </div>
      )
}

export default Testimonials