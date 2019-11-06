import { combineReducers } from 'redux';
import { reducer as toastReducer } from 'react-redux-toastr';
import loginReducer from './login';
import registerReducer from './register';

export default combineReducers({
  toastr: toastReducer,
  login: loginReducer,
  register: registerReducer
});
