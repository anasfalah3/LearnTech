import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { courses as courseData } from '../../data/courses'

function CategoryPage() {
      const categories = useMemo(() => {
            const categoryMap = courseData.reduce((acc, course) => {
                  if (!acc[course.category]) {
                        acc[course.category] = {
                              name: course.category,
                              slug: course.category.toLowerCase().replace(/\s+/g, '-'),
                              count: 0,
                              image: course.image // Use first course's image as category image
                        }
                  }
                  acc[course.category].count++
                  return acc
            }, {})
            return Object.values(categoryMap)
      }, [])

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
                              <div className="row g-4">
                                    {categories.map((category) => (
                                          <div key={category.name} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                                <Link
                                                      to={`/courses?category=${encodeURIComponent(category.name)}`}
                                                      className="position-relative d-block overflow-hidden"
                                                      style={{ height: "250px" }}
                                                >
                                                      <img
                                                            className="img-fluid w-100 h-100"
                                                            src={category.image}
                                                            alt={category.name}
                                                            style={{ objectFit: "cover" }}
                                                      />
                                                      <div className="bg-white text-center position-absolute bottom-0 end-0 py-3 px-4" style={{ margin: "1px" }}>
                                                            <h5 className="m-0">{category.name}</h5>
                                                            <small className="text-primary">{category.count} Course{category.count !== 1 ? 's' : ''}</small>
                                                      </div>
                                                </Link>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>
                  {/* Categories End */}
            </>
      )
}

export default CategoryPage
