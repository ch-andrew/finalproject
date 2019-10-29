import React, { Component } from 'react'
import {onRegister} from '../redux/actions/userActions'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Register extends Component {

    state = {
    }

    onRegisterClick = () => {
        // Ambil semua data dari text input
        let data_email = this.email.value
        let data_password = this.password.value
        // Name Split
        let data_fullName = this.fullName.value
        let name = data_fullName.split(' ')
        let data_firstName = name.shift()
        let data_lastName = name.join(' ')

        let registerData = {
            email : data_email,
            password : data_password,
            firstName : data_firstName,
            lastName : data_lastName
        }

        this.props.onRegister(registerData)
    }

    loadingButton = () => {
        if(this.props.isLoading){
            return (
                <div className="spinner-grow" role='status'>
                    <span className="sr-only"></span>
                </div>
                
            )
        }

        return (
            <button 
                    className="btn-block btn btn-primary mt-2"
                    onClick={this.onRegisterClick}
                >Register</button>
        )
    }

    notification = () => {
        // Error Notification
        if(this.props.error !== ''){
            return (
                <div className="alert alert-danger mt-4">
                    {this.props.error}
                </div>
            )
        } 
        
        // Success Notification
        else if(this.props.success){
            return (
                <div className="alert alert-success mt-4">
                    {this.props.success}
                </div>
            )
        } 
        
        else {
            return null
        }
    }

    render() {
        if(!this.props.email){
            return (
                <div>
                    <div className='col-md-4 mx-auto card mt-5'>
                        <div className='card-body'>
    
                            <div className="card-title border-bottom border-secondary">
                                <h2>Create an Account</h2>
                            </div>

                            <form className="form-group">

                                <div className="my-2">
                                    <h5 className="card-title"><b>Full Name</b></h5>
                                        <div>
                                            <input ref={(input) => {this.fullName = input}} type="text" className="form-control"/>
                                        </div>
                                </div>

                                <div className="my-2">
                                    <h5 className="card-title"><b>Email</b></h5>
                                        <div>
                                            <input ref={(input) => {this.email = input}} type="text" className="form-control"/>
                                        </div>
                                </div>

                                <div className="my-2">
                                    <h5 className="card-title"><b>Password</b></h5>
                                        <div>
                                            <input ref={(input) => {this.password = input}} type="password" className="form-control"/>
                                        </div>
                                </div>

                            </form>

                            <div className="d-flex justify-content-center">
                                {this.loadingButton()}
                            </div>
    
                            {this.notification()}
    
                            <div className="mt-2">Already have an account? <Link to={`/login`}>Log in</Link></div>
                        </div>
                    </div>
                </div>
            )
        }else {
            return <Redirect to="/"/>
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
    }
}

// 3. connect (<MAPSTATETOPROPS>, {<ACTION>})(<COMPONENT>)
export default connect(mapStateToProps, {onRegister})(Register);