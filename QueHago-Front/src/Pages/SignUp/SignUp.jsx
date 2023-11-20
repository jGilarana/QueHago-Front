import { useState } from "react"
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

const [password, setPassword] = useState()
const [email, setEmail] = useState()
const [telephone, setTelephone] = useState()
const [firstName, setFirstName] = useState()
const [lastName, setLastName] = useState()
const [birthDate, setBirthDate] = useState()



  async function onSignup() {
    try {
      const signupResponse = await signup({ email, password,telephone,firstName,lastName,birthDate })
      localStorage.setItem("token", signupResponse.data.token)
    //   localStorage.setItem("role", response.data.role)
      console.log(signupResponse)
      navigate("/home")
    } catch (error) {
        console.log(signupResponse.data)
      console.error("Error al crear cuenta:", error)
    }
  }

  return (
    <Card sx={{ backgroundColor: blue[400] }}>
      <CardHeader title="signup" />
      <CardContent>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          label="Nombre"
          variant="filled"
          fullWidth={true}
          sx={{ marginBottom: "20px" }}
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
        <p>Cumpleaños :</p>
        <TextField
          onChange={(e) => setBirthDate(e.target.value)}
          variant="filled"
        //   type="date"
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
         {/* <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Repite tu Contraseña"
          variant="filled"
          type="password"
          fullWidth={true}
        /> */}
      </CardContent>
      <Divider />
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          sx={{ backgroundColor: green[600] }}
          onClick={() => onSignup()}
          color="success"
        >
          signup
        </Button>
      </CardActions>
    </Card>
  )
}

export default SignUp
