import {combineReducers} from 'redux'
import userGlobal from './userGlobal';
import localeGlobal from './localeGlobal'
import productGlobal from './productGlobal'
import cartGlobal from './cartGlobal'


export default combineReducers({
    user : userGlobal,
    locale : localeGlobal,
    product : productGlobal,
    cart : cartGlobal
})