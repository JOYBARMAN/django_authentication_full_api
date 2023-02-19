import { Box, TextField, Button, Alert,Typography } from '@mui/material';
import { useState } from 'react';
import { getToken } from '../../services/localStoregService';
import { useChangeUserPasswordMutation } from '../../services/userAuthApi';
// import { useSelector } from 'react-redux';

const ChangePassword = () => {
  const [serverError,setServerError]=useState({})
  const [serverMsg,setServerMsg]=useState({})
  const [changeUserPassword] = useChangeUserPasswordMutation()
  const {access_token} = getToken()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }
    const res = await changeUserPassword({actualData,access_token})
    if (res.error){
      setServerMsg({})
      setServerError(res.error.data.errors)
    }
    if (res.data){
      setServerMsg(res.data)
      setServerError({})
      document.getElementById('password-change-form').reset();
    }

  }
  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
      <h1>Change Password</h1>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} id="password-change-form">
        <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
        {serverError.password?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.password}</Typography>:""}

        <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" />
        {serverError.password2?<Typography style={{"color":"red","fontSize":12,"paddingLeft":10}}>{serverError.password2}</Typography>:""}
        
        <Box textAlign='center'>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, px: 5 }}> Update </Button>
        </Box>
        {serverError.non_field_errors? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
        {serverMsg.msg? <Alert severity='success'>{serverMsg.msg}</Alert> : ''}
      </Box>
    </Box>
  </>;
};

export default ChangePassword;