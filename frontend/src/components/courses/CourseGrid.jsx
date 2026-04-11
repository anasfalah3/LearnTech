import React from 'react'
import CourseCard from './CourseCard';

function CourseGrid() {
      const courses = [
            {
                  img: "assets/img/course-1.jpg",
                  title: "Web Design",
                  teacher: "John Doe",
                  price: "$99.00",
                  rating: "4.5",
                  students: "49",
                  hours: "1.49"
            },
            {
                  img: "assets/img/course-2.jpg",
                  title: "Web Design",
                  teacher: "John Doe",
                  price: "$99.00",
                  rating: "4.5",
                  students: "49",
                  hours: "1.49"
            },
            {
                  img: "assets/img/course-3.jpg",
                  title: "Web Design",
                  teacher: "John Doe",
                  price: "$99.00",
                  rating: "4.5",
                  students: "49",
                  hours: "1.49"
            }
      ];
      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Courses</h6>
                              <h1 className="mb-5">Popular Courses</h1>
                        </div>
                        <div className="row g-4 justify-content-center">
                              {courses.map((course, index) => (
                                    <CourseCard key={index} course={course} />
                              ))}
                        </div>
                  </div>
            </div>
      )
}

export default CourseGrid