import { combineReducers } from 'redux';
import { reducer as toastReducer } from 'react-redux-toastr';
import loginReducer from './login';

export default combineReducers({
  toastr: toastReducer,
  login: loginReducer,
});
