import React from 'react'

export default function CourseFilters({ search, category, onSearchChange, onCategoryChange, categories }) {
      return (
            <div className="row g-3 mb-5">
                  <div className="col-md-6">
                        <div className="form-floating">
                              <input
                                    type="text"
                                    className="form-control"
                                    id="search"
                                    placeholder="Search courses"
                                    value={search}
                                    onChange={(e) => onSearchChange(e.target.value)}
                              />
                              <label htmlFor="search">Search courses</label>
                        </div>
                  </div>
                  <div className="col-md-4">
                        <div className="form-floating">
                              <select
                                    className="form-select"
                                    id="category"
                                    value={category}
                                    onChange={(e) => onCategoryChange(e.target.value)}
                              >
                                    <option value="all">All Categories</option>
                                    {categories.map((item) => (
                                          <option key={item} value={item}>
                                                {item}
                                          </option>
                                    ))}
                              </select>
                              <label htmlFor="category">Category</label>
                        </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                        <button
                              type="button"
                              className="btn btn-outline-secondary w-100"
                              onClick={() => {
                                    onSearchChange('')
                                    onCategoryChange('all')
                              }}
                        >
                              Reset
                        </button>
                  </div>
            </div>
      )
}
