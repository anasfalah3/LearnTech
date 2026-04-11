import React from 'react'

function Footer() {
    return (
        <div className="container-fluid bg-dark text-light footer mt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-12 text-center text-md-center mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">Your Site Name</a>, All Right Reserved.

                            Designed By <a className="border-bottom" href="https://htmlcodex.com">HTML Codex</a><br /><br />
                            Distributed By <a className="border-bottom" href="https://themewagon.com">ThemeWagon</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer