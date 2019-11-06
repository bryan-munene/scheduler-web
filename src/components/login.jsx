import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import loginUser from '../actions/loginUser';
import { registerUser } from '../actions/registerUser';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  margin: {
    margin: theme.spacing(1),
  },
  formDiv: {    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: '40%',
    margin: '0 auto',
    background: '#f5f5f5',
    padding: '50px',
    marginTop: '50px'
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  header: {
      textAlign: 'center'
  },
}));

const Login = ({ login, register, history, loginUser, registerUser }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    usernameEmail: '',
    password: '',
    showPassword: false,
  });

  if (login.user) {
    if(login.user.success) {
      history.push('/');
    }
  }

  const processLogin = () => {
    const credentials = {
      usernameEmail: values.usernameEmail,
      password: values.password
    };
    loginUser(credentials);
  }

  const processRegister = () => {
    const userData = {
      username: values.createUsername,
      email: values.newEmail,
      password: values.createPassword,
    };

    if (values.createPassword !== values.confirmPassword) {
      toastr.error("Passwords do not match");
    } else {
      registerUser(userData);
    }
  }

  const handleChange = prop => event => {
    console.log(prop);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <div className={classes.formDiv}>
      <h2 className={classes.header}>Login</h2>
      <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Username / Email</InputLabel>
          <Input
            id="standard-adornment-password"
            value={values.usernameEmail}
            onChange={handleChange('usernameEmail')}
            endAdornment={
              <InputAdornment position="end">
                  <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment
               position="end"
               aria-label="toggle password visibility"
               onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword}
               >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={processLogin}>LOGIN</Button>
      </div>
      <div className={classes.formDiv}>
      <h2 className={classes.header}>New User? Create a new account</h2>
      <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="new-email">Email</InputLabel>
          <Input
            id="new-email"
            value={values.newEmail}
            onChange={handleChange('newEmail')}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="new-username">Choose a username</InputLabel>
          <Input
            id="new-username"
            type='text'
            value={values.createUsername}
            onChange={handleChange('createUsername')}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="new-password">Select Password</InputLabel>
          <Input
            id="new-password"
            type="password"
            value={values.createPassword}
            onChange={handleChange('createPassword')}
          />
        </FormControl>
        <FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
          <Input
            id="confirm-password"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
        </FormControl>
        <Button variant="contained" color="primary" onClick={processRegister}>SIGN UP</Button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ login, register }) => ({
  login,
  register
});
export default connect(
  mapStateToProps,
  { loginUser, registerUser },
)(withRouter(Login));
