import {
  registrationActionTypes,
  LOGIN_USER
} from '../store/types'

const initialState = null

const loginReducer = (state = initialState, action: registrationActionTypes) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log('logging in....')
  }
  return initialState
}

export default loginReducer