import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from "../../services/userAuthApi";
const ResetPassword = () => {
  const navigate = useNavigate()
  const { id, token } = useParams()
  const [serverError, setServerError] = useState({})
  const [serverMsg, setServerMsg] = useState({})
  const [resetPassword] = useResetPasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get('password'),
      password2: data.get('password2'),
    }
    const res = await resetPassword({ actualData, id, token })
    console.log("reset res",res)
    if (res.error) {
      setServerMsg({})
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      setServerMsg(res.data)
      setServerError({})
      document.getElementById('password-reset-form').reset();
      setTimeout(() => {
        navigate("/login")
      }, 3000);
    }

  }
  return <>
    <Grid container justifyContent='center'>
      <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
          <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
          {serverError.password ? <Typography style={{ "color": "red", "fontSize": 12, "paddingLeft": 10 }}>{serverError.password}</Typography> : ""}

          <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm New Password' type='password' />
          {serverError.password2 ? <Typography style={{ "color": "red", "fontSize": 12, "paddingLeft": 10 }}>{serverError.password2}</Typography> : ""}

          <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Save</Button>
          </Box>
          {serverError.non_field_errors ? <Alert severity='error'>{serverError.non_field_errors}</Alert> : ''}
          {serverMsg.msg ? <Alert severity='success'>{serverMsg.msg}</Alert> : ''}

        </Box>
      </Grid>
    </Grid>
  </>;
};

export default ResetPassword;