import React, { Component } from 'react'
import {connect} from 'react-redux'
// import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'






class Login extends Component {

    onLoginClick = () => {
        // Mengambil data dari textbox
        let username = this.username.value 
        let password = this.password.value

        // Memanggil Action Creator 'onLoginUser'
        this.props.onLoginUser(username, password)

    }

    

    render() {
        // jika user belum login
        if(!this.props.user_name){
            return (
                <div>
                    <div className='col-sm-4 mx-auto card my-5'>
                        <div className='card-body'>

                            <div className="card-title border-bottom border-secondary">
                                <h2>Login</h2>
                            </div>
                            
                            <form className='form-group'>
                                <div className="my-2">
                                    <h5 className="card-title "><b>Username</b></h5>
                                    <div>
                                    <input ref={(input) => {this.username = input}} type='text' className='form-control'/>
                                    </div>
                                </div>
                                
                                <div className="my-2">
                                    <h5 className="card-title "><b>Password</b></h5>
                                    <div>
                                    <input ref={(input) => {this.password = input}} type='password' className='form-control'/>
                                    </div>
                                </div>

                            </form>
    
                            <button className="btn-block btn btn-success mb-2" onClick={this.onLoginClick}>
                                Login
                            </button>
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
        isLoading : state.user.loading,
        message : state.user.msg,
        email : state.user.email,
        id : state.user.id
    }
}

export default connect(mapStateToProps)(Login)

// JSON.stringify akan mengubah bentuk object menjadi string