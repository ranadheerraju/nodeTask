import { combineReducers } from 'redux'
import { userReducer } from './index'

export default asyncReducers =>
    combineReducers({
        ...asyncReducers,
        userReducer
    });