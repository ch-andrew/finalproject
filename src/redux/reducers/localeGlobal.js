const INITIAL_STATE = {
    region: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'SET_REGION':
            return{...INITIAL_STATE, region: action.region}
        default:
            return state
    }
}