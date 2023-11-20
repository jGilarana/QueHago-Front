import  { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'
import './Login.css'
import { blue, green } from '@mui/material/colors'
import { login } from '../../Services/accountService.js'
import { useNavigate } from 'react-router-dom'



const Login = () => {


    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    console.log(email)
    console.log(password)


     async function onLogin() {
        try {
          const loginResponse = await login({email, password})
          localStorage.setItem('token', loginResponse.data.token)
          navigate('/home')      
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
      }
    
      return (
        <Card sx={{backgroundColor: blue[400]}}>
          <CardHeader  title= 'login'/>
          <CardContent>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label='Email'
            variant='filled'
            fullWidth={true}
            sx={{marginBottom:'20px'}}
          />
             <TextField
            onChange={(e) => setPassword(e.target.value)}
            label='Password'
            variant='filled'
            type='password'
            fullWidth={true}
          />
          </CardContent>
          <Divider />
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{backgroundColor: green[600]}} onClick={() => onLogin()} color="success">
              Login
            </Button>
          </CardActions>
        </Card>
      )
    }

export default Login