
export const getCartLength = (total) => {

    return (dispatch) => {
        dispatch({
            type : 'CHECK_CART',
            total
        })
    }
    
}