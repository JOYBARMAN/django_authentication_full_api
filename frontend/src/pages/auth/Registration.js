import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeToken } from '../../services/localStoregService';
import { useRegisterUserMutation } from '../../services/userAuthApi';

const Registration = () => {
  const [serverError,setServerError]=useState({})

  const [registerUser,{isLoading}] = useRegisterUserMutation()
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
      password2: data.get('password2'),
      tc: data.get('tc'),
    }
    const res = await registerUser(actualData)
    if (res.error){
      setServerError(res.error.data.errors)
    }
    if (res.data){
      storeToken(res.data.token)
      navigate('/dashboard')
    }
  }
  return <>
    <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>

      <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
      {serverError.name?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.name}</Typography>:""}

      <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
      {serverError.email?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.email}</Typography>:""}

      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {serverError.password?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.password}</Typography>:""}

      <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm Password' type='password' />
      {serverError.password2?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.password2}</Typography>:""}

      <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to term and condition." />
      {serverError.tc?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.tc}</Typography>:""}

      <Box textAlign='center'>
        <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
      </Box>
      {serverError.non_field_errors? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
    </Box>
  </>;
};

export default Registration;