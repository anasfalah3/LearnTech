import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function CourseCard({ course }) {
      const { addToCart, cartItems } = useCart()

      const inCart = cartItems.some((item) => item.id === course.id)

      const handleAddToCart = () => {
            addToCart({
                  id: course.id,
                  slug: course.slug,
                  title: course.title,
                  price: course.price,
                  priceLabel: course.priceLabel,
                  teacher: course.teacher,
                  image: course.image,
                  hours: course.hours,
                  students: course.students
            })
      }

      return (
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="course-item bg-light">
                        <div className="position-relative overflow-hidden">
                              <img className="img-fluid" src={course.image} alt={course.title} />
                              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                    <Link
                                          to={`/courses/${course.slug}`}
                                          className="flex-shrink-0 btn btn-sm btn-outline-primary px-3 border-end"
                                          style={{ borderRadius: '30px 0 0 30px' }}
                                    >
                                          Details
                                    </Link>
                                    <button
                                          type="button"
                                          onClick={handleAddToCart}
                                          disabled={inCart}
                                          className={`flex-shrink-0 btn btn-sm ${inCart ? 'btn-secondary' : 'btn-primary'} px-3`}
                                          style={{ borderRadius: '0 30px 30px 0' }}
                                    >
                                          {inCart ? 'In Cart' : 'Add to Cart'}
                                    </button>
                              </div>
                        </div>
                        <div className="text-center p-4 pb-0">
                              <h3 className="mb-0">{course.priceLabel}</h3>
                              <div className="mb-3">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                          <small
                                                key={star}
                                                className={`fa fa-star ${star <= Math.round(course.rating) ? 'text-primary' : 'text-secondary'}`}
                                          ></small>
                                    ))}
                                    <small className="ms-2">({course.students})</small>
                              </div>
                              <h5 className="mb-4">{course.title}</h5>
                        </div>
                        <div className="d-flex border-top">
                              <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-user-tie text-primary me-2"></i>
                                    {course.teacher}
                              </small>
                              <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-clock text-primary me-2"></i>
                                    {course.hours} Hrs
                              </small>
                              <small className="flex-fill text-center py-2">
                                    <i className="fa fa-user text-primary me-2"></i>
                                    {course.students} Students
                              </small>
                        </div>
                  </div>
            </div>
      )
}

export default CourseCard