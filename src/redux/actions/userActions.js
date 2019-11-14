import Axios from 'axios'
import {urlApi} from '../../API/3.helpers/database'
import Swal from 'sweetalert2'

export const onLogin = (userObject) => {
console.log(userObject);

    return (dispatch) => {
        dispatch({
            type : 'IS_LOADING'
        })

        Axios.get(urlApi + '/auth/login',{ 
            params:{
            email : userObject.email,
            password : userObject.password
            }
        })
        .then((res) => {
            
            console.log(res)
            if(res.data.status === '401'){
                dispatch({
                    type : 'WRONG_CREDENTIALS',
                    error : res.data.error
                })
            }
            else {

                let { id , email, firstName, lastName, accountType} = res.data.user[0]
                
                console.log(res.data);
                

                localStorage.setItem(
                    'userData',
                    JSON.stringify({id, email, firstName, lastName, accountType})
                )
                
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    email : res.data.user[0].email,
                    firstName : res.data.user[0].firstName,
                    lastName : res.data.user[0].lastName,
                    id : res.data.user[0].id,
                    success : res.data.user[0].success,
                    accountType : res.data.user[0].accountType,
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

export const onLogOut = () => {
    localStorage.clear()

    return {
        type : 'LOGOUT_SUCCESS'
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
                    id : userObject.id,
                    email : userObject.email,
                    firstName : userObject.firstName,
                    lastName : userObject.lastName,
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

export const keepLogin = (userObject) => {
    return (dispatch) => {
        dispatch({
            type : 'KEEP_LOGIN',
            id : userObject.id,
            email : userObject.email,
            firstName : userObject.firstName,
            lastName : userObject.lastName,
            accountType : userObject.accountType,
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