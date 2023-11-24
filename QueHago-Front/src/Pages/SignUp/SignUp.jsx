import { useState } from "react"
import './SignUp.css'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from "@mui/material"
import "./SignUp.css"
import { blue, green } from "@mui/material/colors"
import { signup } from "../../Services/accountService.js"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()


  const userData = {
    firstName: "Jorge",
    lastName: "Gil de Arana",
    birthDate: "1998-11-13",
    password: "Reboot123!",
    telephone: 600115770,
    email: "sajor9798@gmail.com",
  }

const [password, setPassword] = useState(userData.password)
const [email, setEmail] = useState(userData.email)
const [telephone, setTelephone] = useState(userData.telephone)
const [firstName, setFirstName] = useState(userData.firstName)
const [lastName, setLastName] = useState(userData.lastName)
const [birthDate, setBirthDate] = useState(userData.birthDate)



  async function onSignup() {
    try {
      const signupResponse = await signup({ email, password,telephone,firstName,lastName,birthDate })
      localStorage.setItem("token", signupResponse.data.token)
    //localStorage.setItem("role", response.data.role)
      console.log(signupResponse)
      navigate("/")
    } catch (error) {
        console.log(signupResponse.data)
      console.error("Error al crear cuenta:", error)
    }
  }

  return (
    <>
    <div>
          <img className="signupBackground" src={'https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg'}>
  
          </img>
    </div>
    <Card sx={{ 
      backgroundColor: blue[400],
      position:'absolute',
      right:'0',
      width: '30vw',
      height: '100vh', 
      alignItems: 'center',
      justifyContent: 'space-between',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '12px',
      textAlign: 'center',
      overflow:'auto',
      textAlign:'left'
    
    }}>
      <CardHeader title="signup" />
      <CardContent>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          label="Nombre"
          variant="filled"
          fullWidth={true}
          sx={{ marginBottom: "20px", color: "white" }}
        />
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          label="Apellidos"
          variant="filled"
          fullWidth={true}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Tu mejor email"
          variant="filled"
          fullWidth={true}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          onChange={(e) => setTelephone(e.target.value)}
          label="Teléfono"
          variant="filled"
          fullWidth={true}
          type="number"

          sx={{ marginBottom: "20px" }}
        />
        <p>Fecha de nacimiento :</p>
        <TextField
          onChange={(e) => setBirthDate(e.target.value)}
          variant="filled"
          type="date"
          fullWidth={true}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Contraseña"
          variant="filled"
          type="password"
          fullWidth={true}
        />
        
      </CardContent>
      <Divider/>
      <CardActions>
        <Button
          sx={{ backgroundColor: '#917800', '&:hover': { backgroundColor: 'white' } }} 
          onClick={() => onSignup()}
          color="secondary"
        >
          signup
        </Button>
      </CardActions>
    </Card>
    </>
    
  )
}

export default SignUp
