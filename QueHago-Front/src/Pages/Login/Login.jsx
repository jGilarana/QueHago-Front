import  { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'
import './Login.css'
import { blue, green } from '@mui/material/colors'
import { login } from '../../Services/accountService.js'
import { useNavigate } from 'react-router-dom'



const Login = () => {

  const userData = {
    firstName: "Jorge",
    lastName: "Gil de Arana",
    birthDate: "1998-11-13",
    password: "Reboot123!",
    telephone: 600115770,
    email: "sajor9798@gmail.com",
  }
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    



     async function onLogin() {
        try {
          const loginResponse = await login({email, password})
          localStorage.setItem('token', loginResponse.data.token)
          localStorage.setItem('role', loginResponse.data.role)
          navigate('/')      
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
      }
    
      return (
        <>
          <img className="loginBackground" src={'https://res.cloudinary.com/djpdopxfy/image/upload/v1700780199/1700748592773_psb91d.jpg'}>
          </img>
        <Card sx={{
          backgroundColor: '#1A759F',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '30vw',
          height: '100vh',         
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          textAlign: 'center',
        }}>
          <CardHeader  title= 'login'/>
          <CardContent>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label='Email'
            variant='filled'
            fullWidth={true}
            color='success'
            sx={{marginBottom:'20px'}}
          />
             <TextField
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            variant='filled'
            type='password'
            color='success'
            fullWidth={true}
          />
          </CardContent>
          <p>He olvidado mi contraseña</p>
          <p>Recordarme</p>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{backgroundColor: green[600]}} onClick={() => onLogin()} color="success">
              Login
            </Button>
          </CardActions>
        </Card>
        </>
      )
    }

export default Login