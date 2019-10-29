import Axios from 'axios'
import {urlApi} from '../../API/3.helpers/database'
import Swal from 'sweetalert2'

export const onLogin = (userObject) => {
    /**
     * sama sepeerti loginObj
     * userObject = { 
     *      username : state/inputan,
     *      password : state/inputan
     * }
     * 
     * userObject = {asalNama : this.state.loginUsername, asalKunci : this.state.loginPassword}
     */

    return (dispatch) => {
        dispatch({
            type : 'IS_LOADING'
        })

        Axios.get(urlApi + 'users', {
            params : {
                // properti di kiri adalah column dari Database
                username : userObject.asalNama,
                password : userObject.asalKunci
            }
        })
        .then((res) => {
            console.log(res)
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        a : res.data[0].username,
                        b : res.data[0].role,
                        c : res.data[0].id
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err)
            // swal('System Error', 'A problem has occured, please contact an administrator', 'error')
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>'
              })
        })
    }
}

export const onRegister = (userObject) => {
    return (dispatch) => {
        dispatch({
            type : 'IS_LOADING'
        })

        Axios.post(urlApi + '/auth/register', {

            email : userObject.email,
            password : userObject.password,
            firstName : userObject.firstName,
            lastName : userObject.lastName

        })
        .then((res) => {
            
            // ERROR CHECK : EMAIL
            if(res.data.status === '400'){
                dispatch({
                    type : 'EMAIL_ALREADY_USED',
                    error : res.data.error
                })
            }
            
            // SUCCESS
            else{
                dispatch({
                    type : 'REGISTRATION_SUCCESS',
                    email : userObject.email,
                    firstName : userObject.firstName,
                    lastName : userObject.lastName,
                    id : userObject.id,
                    success : res.data.success
                })
                Swal.fire(
                    'Success!',
                    res.data.success,
                    'success'
                )
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const keepLogin = (cookieData) => {
    return (dispatch) => {
        Axios.get(urlApi + 'users', {
            params : {
                username : cookieData
            }
        })
        .then((res) => {
            dispatch({
                type : 'KEEP_LOGIN',
                payload : {
                    username : res.data[0].username,
                    role : res.data[0].role,
                    id : res.data[0].id
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const resetUser = () => {

    return (dispatch) => {
        dispatch({
            type : 'RESET_USER'
        })
    }
}

export const toggleUserId = () => {
    return(dispatch) => {
        dispatch({
            type : 'TOGGLE_ID'
        })
    }
}

export const cookieChecker = () => {
    return(dispatch) => {
        dispatch({
            type : 'COOKIE_CHECKED'
        })
    }
}