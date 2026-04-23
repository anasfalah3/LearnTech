import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

function CoursePlayerPage() {
      const { slug } = useParams()
      const navigate = useNavigate()
      const { token } = useAuth()
      const [lessons, setLessons] = useState([])
      const [selectedLesson, setSelectedLesson] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)

      useEffect(() => {
            fetchLessons()
      }, [slug])

      const fetchLessons = async () => {
            setLoading(true)
            setError(null)
            try {
                  const response = await axios.get(`${BASE_URL}/enrollments/${slug}/lessons`, {
                        headers: { Authorization: `Bearer ${token}` },
                  })
                  const lessonsData = response.data.data
                  setLessons(lessonsData)
                  if (lessonsData.length > 0) {
                        setSelectedLesson(lessonsData[0])
                  }
            } catch (err) {
                  const errorMessage = err.response?.data?.message || err.message || 'Failed to load lessons'
                  setError(errorMessage)
                  console.error('Error fetching lessons:', err)
            } finally {
                  setLoading(false)
            }
      }

      if (loading) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="text-center">
                                    <div className="spinner-border" role="status">
                                          <span className="visually-hidden">Loading...</span>
                                    </div>
                              </div>
                        </div>
                  </div>
            )
      }

      if (error) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="alert alert-danger" role="alert">
                                    <h4 className="alert-heading">Error</h4>
                                    <p>{error}</p>
                                    <button className="btn btn-primary mt-3" onClick={() => navigate('/my-courses')}>
                                          Back to My Courses
                                    </button>
                              </div>
                        </div>
                  </div>
            )
      }

      if (lessons.length === 0) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="alert alert-info" role="alert">
                                    <h4 className="alert-heading">No Lessons</h4>
                                    <p>This course doesn't have any lessons yet.</p>
                                    <button className="btn btn-primary mt-3" onClick={() => navigate('/my-courses')}>
                                          Back to My Courses
                                    </button>
                              </div>
                        </div>
                  </div>
            )
      }

      const formatDuration = (seconds) => {
            if (!seconds) return '0:00'
            const hours = Math.floor(seconds / 3600)
            const minutes = Math.floor((seconds % 3600) / 60)
            const secs = seconds % 60
            if (hours > 0) {
                  return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
            }
            return `${minutes}:${secs.toString().padStart(2, '0')}`
      }

      return (
            <div className="container-xxl py-5">
                  <div className="container-fluid">
                        <div className="row g-4">
                              {/* Video Player */}
                              <div className="col-lg-9">
                                    <div className="card shadow-lg">
                                          <div className="ratio ratio-16x9 bg-dark">
                                                {selectedLesson?.video_url ? (
                                                      <video
                                                            controls
                                                            className="ratio ratio-16x9"
                                                            style={{ backgroundColor: '#000' }}
                                                      >
                                                            <source src={selectedLesson.video_url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                      </video>
                                                ) : (
                                                      <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: '#000' }}>
                                                            <div className="text-center text-white">
                                                                  <i className="fa fa-video fa-3x mb-3"></i>
                                                                  <p>No video available for this lesson</p>
                                                            </div>
                                                      </div>
                                                )}
                                          </div>
                                          <div className="card-body">
                                                <h3 className="card-title">{selectedLesson?.title}</h3>
                                                <div className="d-flex align-items-center gap-3 text-muted mb-3">
                                                      <span>
                                                            <i className="fa fa-clock me-2"></i>
                                                            {formatDuration(selectedLesson?.duration)}
                                                      </span>
                                                      {selectedLesson?.is_free && (
                                                            <span className="badge bg-success">
                                                                  Free Preview
                                                            </span>
                                                      )}
                                                </div>
                                                <hr />
                                                <div className="d-flex gap-2">
                                                      <button className="btn btn-primary" onClick={() => navigate('/my-courses')}>
                                                            Back to Course
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              {/* Lessons Sidebar */}
                              <div className="col-lg-3">
                                    <div className="card shadow">
                                          <div className="card-header bg-primary text-white">
                                                <h5 className="mb-0">
                                                      <i className="fa fa-list me-2"></i>
                                                      Course Lessons
                                                </h5>
                                          </div>
                                          <div className="list-group list-group-flush" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                                {lessons.map((lesson, index) => (
                                                      <button
                                                            key={lesson.id}
                                                            type="button"
                                                            className={`list-group-item list-group-item-action text-start ${selectedLesson?.id === lesson.id ? 'active' : ''
                                                                  }`}
                                                            onClick={() => setSelectedLesson(lesson)}
                                                      >
                                                            <div className="d-flex justify-content-between align-items-start w-100">
                                                                  <div className="flex-grow-1">
                                                                        <div className="fw-500">
                                                                              <span className="badge bg-secondary me-2">
                                                                                    {index + 1}
                                                                              </span>
                                                                              {lesson.title}
                                                                        </div>
                                                                        <small className="text-muted d-block mt-1">
                                                                              {formatDuration(lesson.duration)}
                                                                        </small>
                                                                  </div>
                                                                  {lesson.is_free && (
                                                                        <small className="badge bg-success ms-2">Free</small>
                                                                  )}
                                                            </div>
                                                      </button>
                                                ))}
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default CoursePlayerPage