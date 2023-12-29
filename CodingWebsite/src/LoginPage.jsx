import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';


export default function LoginPage({auth,setAuth}) 
{

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const config = {
    headers: {
      "Content-Type": "application/json"
      },
      withCredentials: true
    }

  async function handleSubmit(event)
  {
    event.preventDefault();    
    const response = await axios.post('http://127.0.0.1:8000/user/login/',{email:email,password:password},config);
    localStorage.setItem('jwt',response.data)
    setAuth(true);
  }

  return(
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box style={{backgroundColor:'white', padding:'1.5vw', borderRadius:'0.5vw', boxShadow: '0px 4px 8px 0px rgb(230,230,230)'}}
            sx={{
              marginTop: 8,
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
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue="test2@gmail.com"
                autoFocus
                onChange={(e) => {setEmail(e.target.value)}}
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
                defaultValue="test2@123"
                onChange={(e) => {setPassword(e.target.value)}}
              />
              <Button style={{fontSize:'1.2vw'}}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" fontSize={'0.8vw'}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" fontSize={'0.8vw'}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
  );
}