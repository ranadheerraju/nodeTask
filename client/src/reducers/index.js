import { USER_LOGIN, USER_SIGNUP, USER_DETAILS, UPDATE_USER_CURRENT_INTEGER, GOOGLE_OAUTH } from '../actions/index'

const initialState = {
    // buttonName: {},
    userLoginData: {},
    userSignupData: {},
    userDetails: {},
    updateUserCurrentIntegerDetails: {},
    oauthuserLogin: {},
    // loader: true
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userLoginData: action.payload }
        case USER_SIGNUP:
            return { ...state, userSignupData: action.payload }
        case USER_DETAILS:
            return { ...state, userDetails: action.payload }
        case UPDATE_USER_CURRENT_INTEGER:
            return { ...state, updateUserCurrentIntegerDetails: action.payload }
        case GOOGLE_OAUTH:
            return { ...state, oauthuserLogin: action.payload }
        default:
            return state
    }
}
