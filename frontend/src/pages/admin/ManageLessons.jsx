import React from 'react'
import { useParams } from 'react-router-dom'

function ManageLessons() {
      const { id } = useParams()

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Manage Lessons</h6>
                              <h1 className="mb-5">Lessons for Course {id}</h1>
                        </div>
                        <div className="row">
                              <div className="col-12">
                                    <div className="alert alert-info">
                                          <h5>Lesson management interface</h5>
                                          <p>This section will allow admins to manage lessons for course {id}.</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ManageLessons