import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreateReducer from './quizCreateReducer'
import authReducer from './authReducer'

export default combineReducers({
  authReducer,
  quizReducer,
  quizCreateReducer,
})