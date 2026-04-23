import { Link, useParams } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useCourseDetail } from '../../hooks/useCourses'
import { useEnrollmentStatus } from '../../hooks/useEnrollmentStatus'

function CourseDetailPage() {
      const { slug } = useParams()
      const { course, loading, error } = useCourseDetail(slug)
      const { addToCart, cartItems, openSidebar, showToast } = useCart()
      const { isEnrolled, loading: enrollmentLoading } = useEnrollmentStatus(course?.id)

      const inCart = cartItems.some((item) => item.id === course?.id)

      if (loading) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="alert alert-info">Loading course...</div>
                        </div>
                  </div>
            )
      }

      if (error || !course) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="alert alert-danger">{error || 'Course not found.'}</div>
                              <Link to="/courses" className="btn btn-primary">Back to Courses</Link>
                        </div>
                  </div>
            )
      }

      const handleAddToCart = () => {
            if (isEnrolled) {
                  showToast('You are already enrolled in this course!')
                  return
            }
            addToCart({
                  id: course.id,
                  slug: course.slug,
                  title: course.title,
                  price: parseFloat(course.price) || 0,
                  priceLabel: course.priceLabel,
                  teacher: course.teacher,
                  image: course.image,
                  hours: course.hours,
                  students: course.students
            })
      }

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="row g-5">
                              <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.1s">
                                    <img className="img-fluid rounded" src={course.image} alt={course.title} />
                              </div>
                              <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="mb-4">
                                          <Link to="/courses" className="btn btn-outline-secondary btn-sm">Back to Courses</Link>
                                    </div>
                                    <h6 className="section-title bg-white text-start text-primary pe-3">{course.category}</h6>
                                    <h1 className="mb-4">{course.title}</h1>

                                    {/* Already Enrolled Badge */}
                                    {isEnrolled && !enrollmentLoading && (
                                          <div className="alert alert-success mb-3">
                                                <i className="fa fa-check-circle me-2"></i>You are already enrolled in this course
                                          </div>
                                    )}

                                    <p className="mb-4">{course.description}</p>
                                    <div className="d-flex align-items-center mb-4">
                                          <span className="me-4 text-primary fs-4">{course.priceLabel}</span>
                                          <span className="me-3"><i className="fa fa-star text-primary me-2"></i>{course.rating}</span>
                                          <span className="me-3"><i className="fa fa-user text-primary me-2"></i>{course.students} students</span>
                                    </div>
                                    <div className="mb-4">
                                          <p><strong>Teacher:</strong> {course.teacher}</p>
                                          <p><strong>Length:</strong> {course.hours} hours</p>
                                    </div>
                                    <p>{course.details}</p>
                                    <div className="d-flex gap-2">
                                          <button
                                                onClick={handleAddToCart}
                                                disabled={inCart || isEnrolled || enrollmentLoading}
                                                className={`btn ${isEnrolled ? 'btn-success' : inCart ? 'btn-secondary' : 'btn-primary'} btn-lg`}
                                          >
                                                {isEnrolled ? 'Already Enrolled' : inCart ? 'In Cart' : 'Add to Cart'}
                                          </button>
                                          {!isEnrolled && (
                                                <button
                                                      type="button"
                                                      className="btn btn-outline-primary btn-lg"
                                                      onClick={openSidebar}
                                                >
                                                      View Cart
                                                </button>
                                          )}
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default CourseDetailPage