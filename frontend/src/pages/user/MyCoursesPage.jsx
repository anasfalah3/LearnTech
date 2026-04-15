import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function MyCoursesPage() {
      const { user } = useAuth()
      const enrolledCourses = user?.myCourses || []

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">My Courses</h6>
                              <h1 className="mb-5">Your Enrolled Courses</h1>
                        </div>
                        {enrolledCourses.length === 0 ? (
                              <div className="row">
                                    <div className="col-12">
                                          <div className="alert alert-info">
                                                <h5>No courses enrolled yet</h5>
                                                <p>Browse our courses and start learning today!</p>
                                                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                                          </div>
                                    </div>
                              </div>
                        ) : (
                              <div className="row g-4">
                                    {enrolledCourses.map((course) => (
                                          <div key={course.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                                <div className="course-item bg-light">
                                                      <div className="position-relative overflow-hidden">
                                                            <img className="img-fluid" src={course.image} alt={course.title} />
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
                                    ))}
                              </div>
                        )}
                  </div>
            </div>
      )
}

export default MyCoursesPage