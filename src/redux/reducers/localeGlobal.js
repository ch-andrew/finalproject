const INITIAL_STATE = {
    region: '',
    payment: false,
    complete: false,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_REGION':
            return{...INITIAL_STATE, region: action.region}
        case 'PAYMENT':
            return{...INITIAL_STATE, payment: true}
        case 'COMPLETE':
            return{...INITIAL_STATE, complete: true}
        default:
            return state
    }
}