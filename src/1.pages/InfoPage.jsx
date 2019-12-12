import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class InfoPage extends Component {

    switch = () => {
        
        setTimeout(() => {
            window.location.href="/"
        }, 3000);
    }
    render() {
        this.switch()

        if(this.props.complete){
            return <Redirect to="/"/>
        }

        else {

            return (
                <div>
                    <div className="my-5" style={{paddingLeft: '15px', paddingRight: '15px', borderTop: '2px solid #1a1a1a'}}>
                        <div className="col-12 px-5 pb-5 text-center">
                            <div className="row">
                                <div className='col mb-3'>
                                    <h1>Thank you for your purchase!</h1>
                                    <h4>Please kindly wait while your transaction details is being confirmed.</h4>
                                </div>
                            </div>
    
                            <div className="row">
                                <div className='col'>
                                    <h1>Status : <b>Waiting Approval</b></h1>
                                    <h4>You can now leave this page and check your order status from your account page</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return{

        complete : state.locale.complete,
    }
}

export default connect(mapStateToProps)(InfoPage)