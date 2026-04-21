import { useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCategories, useCourses } from '../../hooks/useCourses'

function CategoryPage() {
      const { categories, loading: categoriesLoading, error: categoriesError } = useCategories()
      const { courses } = useCourses()

      // If no API categories, build from courses
      const displayCategories = useMemo(() => {
            if (categories.length > 0) {
                  return categories.map(cat => ({
                        id: cat.id,
                        name: cat.name,
                        slug: cat.slug,
                        image: cat.image,
                        count: courses.filter(c => c.category === cat.name).length
                  }))
            }

            // Fallback: build from courses
            const categoryMap = courses.reduce((acc, course) => {
                  if (!acc[course.category]) {
                        acc[course.category] = {
                              name: course.category,
                              slug: course.category.toLowerCase().replace(/\s+/g, '-'),
                              count: 0,
                              image: course.image
                        }
                  }
                  acc[course.category].count++
                  return acc
            }, {})
            return Object.values(categoryMap)
      }, [categories, courses])

      return (
            <>
                  {/* Header Start */}
                  <div className="container-fluid bg-primary py-5 mb-5 page-header">
                        <div className="container py-5">
                              <div className="row justify-content-center">
                                    <div className="col-lg-10 text-center">
                                          <h1 className="display-3 text-white animated slideInDown">Course Categories</h1>
                                          <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb justify-content-center">
                                                      <li className="breadcrumb-item"><Link className="text-white" to="/">Home</Link></li>
                                                      <li className="breadcrumb-item text-white active" aria-current="page">Categories</li>
                                                </ol>
                                          </nav>
                                    </div>
                              </div>
                        </div>
                  </div>
                  {/* Header End */}

                  {/* Categories Start */}
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <h6 className="section-title bg-white text-center text-primary px-3">Categories</h6>
                                    <h1 className="mb-5">Browse by Category</h1>
                              </div>
                              {categoriesError && (
                                    <div className="alert alert-danger mb-4" role="alert">
                                          Error loading categories: {categoriesError}
                                    </div>
                              )}
                              <div className="row g-4">
                                    {categoriesLoading ? (
                                          <div className="col-12">
                                                <div className="alert alert-info text-center">Loading categories...</div>
                                          </div>
                                    ) : displayCategories.length > 0 ? (
                                          displayCategories.map((category) => (
                                                <div key={category.name} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                                      <Link
                                                            to={`/courses?category=${encodeURIComponent(category.name)}`}
                                                            className="position-relative d-block overflow-hidden"
                                                            style={{ height: "250px" }}
                                                      >
                                                            <img
                                                                  className="img-fluid w-100 h-100"
                                                                  src={category.image || 'assets/img/course-1.jpg'}
                                                                  alt={category.name}
                                                                  style={{ objectFit: "cover" }}
                                                            />
                                                            <div className="bg-white text-center position-absolute bottom-0 end-0 py-3 px-4" style={{ margin: "1px" }}>
                                                                  <h5 className="m-0">{category.name}</h5>
                                                                  <small className="text-primary">{category.count} Course{category.count !== 1 ? 's' : ''}</small>
                                                            </div>
                                                      </Link>
                                                </div>
                                          ))
                                    ) : (
                                          <div className="col-12">
                                                <div className="alert alert-info text-center">No categories available.</div>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
                  {/* Categories End */}
            </>
      )
}

export default CategoryPage
