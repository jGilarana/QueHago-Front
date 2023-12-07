import  { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'
import './LoginClub.css'
import { blue, green, purple } from '@mui/material/colors'
import { login } from '../../Services/accountService.js'
import { useNavigate } from 'react-router-dom'



const LoginClub = () => {

    const clubData = {
        email : 'kalimaevents@gmail.com',
        password : 'Rebooting!'
    }

    const navigate = useNavigate()
    const [password, setPassword] = useState(clubData.password)
    const [email, setEmail] = useState(clubData.email)
    
     async function onLogin() {
        try {
          const loginResponse = await login({email, password})
          localStorage.setItem('token', loginResponse.data.token)
          localStorage.setItem('subscriptionStatus', loginResponse.data.subscriptionStatus)
          navigate('/bussiness')      
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
      }
    
      return (
        <>
          <img className="loginBackground" src='https://res.cloudinary.com/djpdopxfy/image/upload/v1701634561/1700748592781_yue2bq.jpg'>
          </img>
        <Card sx={{
          backgroundColor: '#1e1e5d',
          position: 'fixed',
          top: '0',
          right: '0',
          width: '37vw',
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
            sx={{ backgroundColor: '#a3baf1' , marginBottom:'20px'}}
          />
             <TextField sx={{backgroundColor:'#a3baf1',  marginBottom:'40px'}}
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
          <Button sx={{position:'absolute', backgroundColor: blue[800], top:'45%', right:'8vw', color:'white', marginTop:'20px', ':hover' : { backgroundColor: blue[600]}}} 
          onClick={() => onLogin()}>
              Login
            </Button>
          </div>
          </CardContent>
          <Divider/>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <p>¿Aún no te has registrado?</p>
            <Button sx={{backgroundColor: 'green', color:'white'}} onClick={() => navigate('/bussiness/signup')}> Registrarse</Button>
          </CardActions>
        </Card>
        </>
      )
    }

export default LoginClub