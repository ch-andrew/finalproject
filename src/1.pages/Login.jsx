import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'

import {onLogin} from '../redux/actions/userActions'


class Login extends Component {

    onLoginClick = () => {
        // Mengambil data dari textbox
        let data_email = this.email.value 
        let data_password = this.password.value

        let loginData = {
            email : data_email,
            password : data_password
        }
        
        this.props.onLogin(loginData)

    }

    loadingButton = () => {
        if(this.props.isLoading){
            return (
                <button className="btn-block btn btn-success mb-2" type="button" disabled>
                    <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
                    Logging In...
                </button>
                
            )
        }

        return (
            <button 
                    className="btn-block btn btn-success mb-2"
                    onClick={this.onLoginClick}
                >Login</button>
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
        // jika user belum login
        if(!this.props.email){
            return (
                <div>
                    <div className='col-sm-4 mx-auto card my-5'>
                        <div className='card-body'>

                            <div className="card-title border-bottom border-secondary">
                                <h2>Login</h2>
                            </div>
                            
                            <form className='form-group'>
                                <div className="my-2">
                                    <h5 className="card-title "><b>Email</b></h5>
                                    <div>
                                    <input ref={(input) => {this.email = input}} type='text' className='form-control'/>
                                    </div>
                                </div>
                                
                                <div className="my-2">
                                    <h5 className="card-title "><b>Password</b></h5>
                                    <div>
                                    <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                                    </div>
                                </div>

                            </form>

                            {this.loadingButton()}

                            {this.notification()}
                            <div>
                                <div className="mt-2">Don't have an account? <Link to={`/register`}>Create one now!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            // jika sudah login, akan di arahkan ke halaman 'home'
            return <Redirect to='/'/>
        }
    }
}

// function yg akan mengambil data di redux state
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

export default connect(mapStateToProps, {onLogin})(Login);

// JSON.stringify akan mengubah bentuk object menjadi string