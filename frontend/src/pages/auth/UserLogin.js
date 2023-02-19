import { TextField, Button, Box, Alert,Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../services/userAuthApi';
import { getToken, storeToken } from '../../services/localStoregService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../features/authSlice';

const UserLogin = () => {
  const [serverError,setServerError]=useState({})
  const dispatch = useDispatch()
  const [loginUser,{isLoading}] = useLoginUserMutation()
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
    if (res.error){
      setServerError(res.error.data.errors)
    }
    if (res.data){
      storeToken(res.data.token)
      let {access_token} = getToken()
      dispatch(setUserToken({access_token:access_token}))
      navigate('/dashboard')
    }

  }
  let {access_token} = getToken()
  useEffect(()=>{
    dispatch(setUserToken({access_token:access_token}))
  },[access_token,dispatch])


  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {serverError.email?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.email}</Typography>:""}

      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {serverError.password?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.password}</Typography>:""}

      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>
      </Box>
      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
      {serverError.non_field_errors? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
    </Box>
  </>;
};

export default UserLogin;