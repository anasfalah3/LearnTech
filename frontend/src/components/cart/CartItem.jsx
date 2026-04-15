import React from 'react'

export default function CartItem({ item, onRemove }) {
      return (
            <div className="card mb-3">
                  <div className="row g-0 align-items-center">
                        <div className="col-md-3">
                              <img src={item.image} className="img-fluid rounded-start" alt={item.title} />
                        </div>
                        <div className="col-md-9">
                              <div className="card-body d-flex flex-column h-100 justify-content-between">
                                    <div>
                                          <h5 className="card-title">{item.title}</h5>
                                          <p className="card-text mb-1">{item.teacher}</p>
                                          <p className="card-text mb-1">{item.hours} Hrs</p>
                                          <p className="card-text mb-1 fw-bold">{item.priceLabel}</p>
                                    </div>
                                    <div className="text-end">
                                          <button className="btn btn-danger btn-sm" onClick={() => onRemove(item.id)}>
                                                Remove
                                          </button>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}
