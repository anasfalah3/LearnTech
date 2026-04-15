import React from 'react'
import { useParams } from 'react-router-dom'

function CoursePlayerPage() {
      const { slug } = useParams()

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Course Player</h6>
                              <h1 className="mb-5">Playing: {slug}</h1>
                        </div>
                        <div className="row">
                              <div className="col-12">
                                    <div className="alert alert-info">
                                          <h5>Course player coming soon</h5>
                                          <p>Video player and lesson content will be available here.</p>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default CoursePlayerPage