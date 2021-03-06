import * as React from 'react';
import { useNavigate } from "react-router-dom"
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const theme = createTheme();

export default function SignInSide() {

 
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');


  // States for checking the errors
  let navigate = useNavigate();
  const [error, setError] = useState(false);



  const goToSignUp  = (event) =>{
    event.preventDefault();
    navigate("signup");
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
      let email = data.get('email');
      let password = data.get('password')

      console.log({
        email:email,
        password:password
      })

      if (email === '' || password === '') {
        setError(true);
      } 
     
      axios.get('./data.json')
     .then((res)=>{
      if(res.data[0].email===email && res.data[0].password===password)
      {
        setError(false); 
        navigate("home") 

      }
      
      else{
        setError(true);
        console.log(error)
      }
   
   }).catch((err)=>{
    setError(true);
   })

   
  };

// Showing error message if error is true
const errorMessage = () => {
  return (
  <div
  className="error"
  style={{
  display: error ? '' : 'none',
  }}>
  <h1>Wrong Credentials</h1>
  </div>
  );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <div className="messages">
            {errorMessage()}
           
            </div>


            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>


              <Grid container>
                
                <Grid item>
                <Button
                sx={{ mt: 3, mb: 2 }}
                onClick = {goToSignUp}
              >
                Don't have an account? Sign Up
                </Button>
                </Grid>
              </Grid>
            
             
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}