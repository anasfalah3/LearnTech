import { useMemo, useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Testimonials from '../../components/common/Testimonials'
import CourseGrid from '../../components/courses/CourseGrid'
import CourseFilters from '../../components/courses/CourseFilters'
import { useCourses, useCategories } from '../../hooks/useCourses'

function CoursesPage() {
      const [searchParams] = useSearchParams()
      const [search, setSearch] = useState('')
      const [category, setCategory] = useState('all')
      const { courses, loading: coursesLoading, error: coursesError } = useCourses()
      const { categories: apiCategories, loading: categoriesLoading, error: categoriesError } = useCategories()

      useEffect(() => {
            const categoryParam = searchParams.get('category')
            if (categoryParam) {
                  setCategory(categoryParam)
            }
      }, [searchParams])

      // Get unique category names from courses
      const categories = useMemo(() => {
            if (apiCategories.length > 0) {
                  return apiCategories.map(cat => cat.name)
            }
            return Array.from(new Set(courses.map((course) => course.category)))
      }, [apiCategories, courses])

      const filteredCourses = useMemo(() => {
            return courses.filter((course) => {
                  const matchesSearch = [course.title, course.teacher, course.category]
                        .join(' ')
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  const matchesCategory = category === 'all' || course.category === category
                  return matchesSearch && matchesCategory
            })
      }, [search, category, courses])

      return (
            <>
                  {/* Header Start */}
                  <div className="container-fluid bg-primary py-5 mb-5 page-header">
                        <div className="container py-5">
                              <div className="row justify-content-center">
                                    <div className="col-lg-10 text-center">
                                          <h1 className="display-3 text-white animated slideInDown">Courses</h1>
                                          <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb justify-content-center">
                                                      <li className="breadcrumb-item"><Link className="text-white" to="/">Home</Link></li>
                                                      <li className="breadcrumb-item text-white active" aria-current="page">Courses</li>
                                                </ol>
                                          </nav>
                                    </div>
                              </div>
                        </div>
                  </div>
                  {/* Header End  */}

                  {/* Filters Start */}
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <h6 className="section-title bg-white text-center text-primary px-3">Shop</h6>
                                    <h1 className="mb-5">Browse Courses</h1>
                              </div>
                              {categoriesError && (
                                    <div className="alert alert-danger mb-4" role="alert">
                                          Error loading categories: {categoriesError}
                                    </div>
                              )}
                              {coursesError && (
                                    <div className="alert alert-danger mb-4" role="alert">
                                          Error loading courses: {coursesError}
                                    </div>
                              )}
                              <CourseFilters
                                    search={search}
                                    category={category}
                                    categories={categories}
                                    onSearchChange={setSearch}
                                    onCategoryChange={setCategory}
                                    loading={categoriesLoading}
                              />
                              <div className="mb-4 text-end">
                                    {coursesLoading ? (
                                          <span className="text-muted">Loading...</span>
                                    ) : (
                                          <span className="text-muted">Showing {filteredCourses.length} of {courses.length} courses</span>
                                    )}
                              </div>
                        </div>
                  </div>
                  {/* Filters End */}

                  {/* Courses Start */}
                  <CourseGrid courses={filteredCourses} loading={coursesLoading} />
                  {/* Courses End */}

                  {/* Testimonial Start */}
                  <Testimonials />
                  {/* Testimonial End */}
            </>
      )
}

export default CoursesPage