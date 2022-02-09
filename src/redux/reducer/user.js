
import { USER_STATE_CHANGE, USER_CHART_STATE_CHANGE } from './constants'

let initialState = {
    currentUser: null,
    cart: []
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case USER_CHART_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        // case 'USER_LOGIN':
        //     return { value: state.value + 1 }
        // case 'USER_LOGOUT':
        //     return { value: state.value - 1 }
        default:
            return state
    }
}

export default userReducer;