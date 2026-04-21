import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Team from '../../components/common/Team';
import Testimonials from '../../components/common/Testimonials';
import CourseGrid from '../../components/courses/CourseGrid';
import { useCourses, useCategories } from '../../hooks/useCourses'

function HomePage() {
    const { courses, loading: coursesLoading, error: coursesError } = useCourses()
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
    const slides = [
        {
            img: "assets/img/carousel-1.jpg",
            title: "The Best Online Learning Platform",
        },
        {
            img: "assets/img/carousel-2.jpg",
            title: "Get Educated Online From Your Home",
        },
    ];

    const bestCourses = courses.slice(0, 3)

    return (
        <>
            {/* Carousel Start */}
            <div className="container-fluid p-0 mb-5">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    effect="fade"
                    loop
                    style={{ height: "600px" }}
                >
                    {slides.map((slide, i) => (
                        <SwiperSlide key={i}>
                            <div className="position-relative w-100 h-100">
                                <img
                                    src={slide.img}
                                    alt=""
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <div
                                    className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
                                    style={{ background: "rgba(24, 29, 56, .7)" }}
                                >
                                    <div className="container">
                                        <div className="row justify-content-start">
                                            <div className="col-sm-10 col-lg-8">
                                                <h5 className="text-primary text-uppercase mb-3 animated slideInDown">
                                                    Best Online Courses
                                                </h5>
                                                <h1 className="display-3 text-white animated slideInDown">
                                                    {slide.title}
                                                </h1>
                                                <p className="fs-5 text-white mb-4 pb-2">
                                                    Vero elitr justo clita lorem. Ipsum dolor at sed stet sit
                                                    diam no. Kasd rebum ipsum et diam justo clita et kasd rebum
                                                    sea sanctus eirmod elitr.
                                                </p>
                                                <a href="/about" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft">
                                                    Read More
                                                </a>
                                                <a href="" className="btn btn-light py-md-3 px-md-5 animated slideInRight">
                                                    Join Now
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* Carousel End */}


            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item text-center pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-graduation-cap text-primary mb-4"></i>
                                    <h5 className="mb-3">Skilled Instructors</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item text-center pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-globe text-primary mb-4"></i>
                                    <h5 className="mb-3">Online classNamees</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item text-center pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-home text-primary mb-4"></i>
                                    <h5 className="mb-3">Home Projects</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item text-center pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-book-open text-primary mb-4"></i>
                                    <h5 className="mb-3">Book Library</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}


            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: "400px" }}>
                            <div className="position-relative h-100">
                                <img className="img-fluid position-absolute w-100 h-100" src="assets/img/about.jpg" alt="" style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                            <h6 className="section-title bg-white text-start text-primary pe-3">About Us</h6>
                            <h1 className="mb-4">Welcome to eLEARNING</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.</p>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Skilled Instructors</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Online classNamees</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>International Certificate</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Skilled Instructors</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>Online classNamees</p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0"><i className="fa fa-arrow-right text-primary me-2"></i>International Certificate</p>
                                </div>
                            </div>
                            <a className="btn btn-primary py-3 px-5 mt-2" href="/about">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}


            {/* Categories Start */}
            <div className="container-xxl py-5 category">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">Categories</h6>
                        <h1 className="mb-5">Courses Categories</h1>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-7 col-md-6">
                            <div className="row g-3">
                                <div className="col-lg-12 col-md-12 wow zoomIn" data-wow-delay="0.1s">
                                    <Link className="position-relative d-block overflow-hidden" to="/courses?category=Web%20Design">
                                        <img className="img-fluid" src="assets/img/cat-1.jpg" alt="" />
                                        <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: "1px" }}>
                                            <h5 className="m-0">Web Design</h5>
                                            <small className="text-primary">3 Courses</small>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.3s">
                                    <Link className="position-relative d-block overflow-hidden" to="/courses?category=Graphic%20Design">
                                        <img className="img-fluid" src="assets/img/cat-2.jpg" alt="" />
                                        <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: "1px" }}>
                                            <h5 className="m-0">Graphic Design</h5>
                                            <small className="text-primary">1 Course</small>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-lg-6 col-md-12 wow zoomIn" data-wow-delay="0.5s">
                                    <Link className="position-relative d-block overflow-hidden" to="/courses?category=Video%20Editing">
                                        <img className="img-fluid" src="assets/img/cat-3.jpg" alt="" />
                                        <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: "1px" }}>
                                            <h5 className="m-0">Video Editing</h5>
                                            <small className="text-primary">1 Course</small>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 wow zoomIn" data-wow-delay="0.7s" style={{ minHeight: "350px" }}>
                            <Link className="position-relative d-block h-100 overflow-hidden" to="/courses?category=Online%20Marketing">
                                <img className="img-fluid position-absolute w-100 h-100" src="assets/img/cat-4.jpg" alt="" style={{ objectFit: "cover" }} />
                                <div className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3" style={{ margin: "1px" }}>
                                    <h5 className="m-0">Online Marketing</h5>
                                    <small className="text-primary">1 Course</small>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Categories Start */}


            {/* Best Courses Start */}
            <CourseGrid courses={bestCourses} title="Top Courses" subtitle="Our Best Courses" />
            {/* Best Courses End */}

            {/* Courses Start */}
            <CourseGrid />
            {/* Courses End */}


            {/* Team Start */}
            <Team />
            {/* Team End */}

            {/* Testimonial Start */}
            <Testimonials />
            {/* Testimonial End */}


        </>
    )
}

export default HomePage