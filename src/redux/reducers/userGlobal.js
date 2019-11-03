
const INITIAL_STATE = {
    id : 0, 
    email : '',
    firstName : '',
    lastName : '',
    loading : false, 
    error: '',
    success: '',
    account: ''
}


export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'IS_LOADING':
            return {...INITIAL_STATE, loading : true}
        case 'WRONG_CREDENTIALS':
            return {...INITIAL_STATE, error: action.error}
        case 'LOGIN_SUCCESS':
            return {...INITIAL_STATE, id : action.id, email : action.email, firstName : action.firstName, lastName : action.lastName, success : action.success, account: action.accountType}        
            case 'KEEP_LOGIN':
            return {...INITIAL_STATE, id : action.id, email : action.email, firstName : action.firstName, lastName : action.lastName, account: action.accountType}        
            case 'EMAIL_ALREADY_USED':
            return {...INITIAL_STATE, error : action.error}
        case 'REGISTRATION_SUCCESS':
            return {...INITIAL_STATE, success: action.success}
        case 'COOKIE_CHECKED':
            return {...INITIAL_STATE, cookie: true}
        default:
            return state
    }
}