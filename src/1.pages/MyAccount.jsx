import React, { Component } from 'react'
import Dashboard from '../2.components/Dashboard'
import Footer from './Footer'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class MyAccount extends Component {
    render() {

        if(this.props.account === 'free'){
            
            return (
                <div style={{fontFamily: "Roboto"}}>
                    <h1 className="text-center pt-5">My Account</h1>
                    <Dashboard/>
                    <Footer/>
                </div>
            )
        }
        else {
            return <Redirect to='/'/>
        }
    }   
}

const mapStateToProps = (state) => {
    return {
        id : state.user.id,
        email : state.user.email,
        firstName : state.user.firstName,
        lastName : state.user.lastName,
        isLoading : state.user.loading,
        success : state.user.success,
        error : state.user.error,
        account : state.user.account
    }
}

  export default connect(mapStateToProps)(MyAccount)