
const INITIAL_STATE = {
    id : 0, 
    email : '',
    firstName : '',
    lastName : '',
    loading : false, 
    error: '',
    success: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...INITIAL_STATE, email : action.a, id : action.payload.c, role : action.payload.b, cookie:true}
        case 'IS_LOADING':
            return {...INITIAL_STATE, loading : true}
        case 'EMAIL_ALREADY_USED':
            return {...INITIAL_STATE, error : action.error}
        case 'REGISTRATION_SUCCESS':
            return {...INITIAL_STATE, success: action.success}
        default:
            return state
    }
}