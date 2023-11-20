import  { useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'
import './SignUp.css'
import { blue, green } from '@mui/material/colors'
import { signup } from '../../Services/accountService.js'
import { useNavigate } from 'react-router-dom'



const SignUp = () => {


    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    
    console.log(email)
    console.log(password)


     async function onSignup() {
        try {
          const signupResponse = await signup({email, password})
          localStorage.setItem('token', signupResponse.data.token)
          localStorage.setItem('role', response.data.role)
          navigate('/home')      
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
        }
      }
    
      return (
        <Card sx={{backgroundColor: blue[400]}}>
          <CardHeader  title= 'signup'/>
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
            <Button sx={{backgroundColor: green[600]}} onClick={() => onSignup()} color="success">
              signup
            </Button>
          </CardActions>
        </Card>
      )
    }

export default SignUp