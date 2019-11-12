const INITIAL_STATE = {cartLength : 0}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "CHECK_CART":
            return {...INITIAL_STATE, cartLength: action.total}
        default:
            return state
    }
}