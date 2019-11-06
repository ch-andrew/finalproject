const INITIAL_STATE = {
    id: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'PRODUCT_DETAIL':
            return{...INITIAL_STATE, id: action.productId}
        default:
            return state
    }
}