import React from 'react'
import CourseCard from './CourseCard'

function CourseGrid({ courses = [], title = 'Courses', subtitle = 'Popular Courses' }) {
      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">{title}</h6>
                              <h1 className="mb-5">{subtitle}</h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                              {courses.length > 0 ? (
                                    courses.map((course) => <CourseCard key={course.id} course={course} />)
                              ) : (
                                    <div className="col-12">
                                          <div className="alert alert-warning text-center">
                                                No courses match your search. Try another filter.
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      )
}

export default CourseGrid