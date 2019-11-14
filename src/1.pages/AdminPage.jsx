import React, { Component } from 'react'
import Dashboard from '../2.components/Dashboard'
import Footer from './Footer'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { onLogOut } from '../redux/actions/userActions'

class AdminPage extends Component {
    render() {

        if(this.props.account === 'admin'){
            
            return (
                <div style={{fontFamily: "Roboto"}}>
                    <h1 className="text-center pt-5">Admin Page</h1>
                    <h4 className="text-center pt-2">Welcome back, {this.props.firstName}</h4>
                    <button onClick={this.props.onLogOut}>LogOut</button>
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

  export default connect(mapStateToProps, {onLogOut})(AdminPage)