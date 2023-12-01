import  { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'
import './Login.css'
import { blue, green, purple } from '@mui/material/colors'
import { login } from '../../Services/accountService.js'
import { useNavigate } from 'react-router-dom'



const Login = () => {


  const userData = {
    firstName: "Jorge",
    lastName: "Gil de Arana",
    birthDate: "1998-11-13",
    password: "Reboot123!",
    telephone: 600115770,
    email: "sajoradmin@gmail.com",
  }

    const navigate = useNavigate()
    const [password, setPassword] = useState(userData.password)
    const [email, setEmail] = useState(userData.email)
    
    
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
          <div className='background'></div>
          <Card sx={{
          background : ' linear-gradient(171deg, rgba(88,60,156,1) 17%, rgba(91,71,91,1) 90%)',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '30vw',
          height: '100vh',         
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
            sx={{backgroundColor:'#a3baf1', marginBottom:'20px'}}
          />
             <TextField sx={{backgroundColor:'#a3baf1', marginBottom:'40px'}}
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            variant='filled'
            type='password'
            color='success'
            fullWidth={true}
          />   
          <div className='loginActions'>
          <div>
          <p>He olvidado mi contraseña</p>
          <p>Recordarme</p>
          </div>
          <Button sx={{backgroundColor: blue[600], color:'white', marginTop:'30px'}} onClick={() => onLogin()}>
              Login
            </Button>
          </div>
          </CardContent>
          <Divider/>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <p>¿Aún no te has registrado?</p>
            <Button sx={{backgroundColor: 'green', color:'white', ':hover' : {backgroundColor: 'transparent'}}} onClick={() => navigate('/signup')}> Registrarse</Button>
          </CardActions>
        </Card>
        </>
      )
    }

export default Login