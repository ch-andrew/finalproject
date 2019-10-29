import React, {Component} from 'react'
import './main.css'

class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="page-footer font-small pt-4" style={{backgroundColor: "black", color: "white", fontFamily: "Roboto"}}>

                    <div className="container-fluid text-center text-md-left">

                        <div className="row m-5">

                            <div className="col-3 mt-md-0 mt-3">
                                <h5 className="text-uppercase">Explore</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        <a href="#!">Link</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-3 mt-md-0 mt-3">
                                <h5 className="text-uppercase">About</h5>
                                <p>Here you can use rows and columns to organize your footer content.</p>
                            </div>

                            <div className="col-3 mt-md-0 mt-3">
                                <h5 className="text-uppercase">Contact</h5>
                                <b>Phone Support</b>
                                <p>
                                    +6281290400773<br/>
                                    Mon - Fri: 0800 - 1700 (GMT+7)<br/>
                                    Closed on Public Holidays in Singapore
                                </p>
                                <b>Email Support</b>
                                <p>
                                    <a href="mailto:customercare.id@cimo.com" className="footer-email">customercare.id@cimo.com</a>
                                </p>
                            </div>

                            <div className="col-3 mt-md-0 mt-3">
                                <h5 className="text-uppercase">Subscribe to our newsletter</h5>
                                <p>
                                    By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives.
                                </p>
                                <form class="input-group">
                                    <input type="text" class="form-control form-control-sm" placeholder="Your email"
                                        aria-label="Your email" aria-describedby="basic-addon2"/>
                                    <div class="input-group-append">
                                        <button class="btn btn-sm btn-primary my-0" type="button">Sign up</button>
                                    </div>

                                </form>
                            </div>

                        </div>

                    <hr className="clearfix w-100 d-md-none pb-3"/>

                    </div>
                {/* Copyright */}
                <div className="footer-copyright font-weight-light text-center py-3">
                    © 2019 Copyright: Cimo
                </div>
            </footer>
        </div>
        )
    }
}

export default Footer