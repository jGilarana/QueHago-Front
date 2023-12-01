import { useState } from "react"
import "./SignUpClub.css"
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
import "./SignUpClub.css"
import { blue, green, purple } from "@mui/material/colors"
import { useNavigate } from "react-router-dom"
import { signupClub } from "../../../Services/clubService.js"

const SignUpClub = () => {
  const navigate = useNavigate()

  const userData = {
    companyName: "Shoko Barcelona",
    address: "Calle Luis Morote, 7",
    password: "Reboot123!",
    telephone: 600115770,
    email: "shokoClub@gmail.com",
  }

  const [email, setEmail] = useState(userData.email)
  const [password, setPassword] = useState(userData.password)
  const [telephone, setTelephone] = useState(userData.telephone)
  const [companyName, setCompanyName] = useState(userData.companyName)
  const [address, setAddress] = useState(userData.address)

  async function onSignupClub() {
    try {
      const signupResponse = await signupClub({
        email,
        password,
        telephone,
        companyName,
        address,
      })
      localStorage.setItem("token", signupResponse.data.token)
      localStorage.setItem("subscriptionStatus", true)
    ///IMPORTANTE MIRAR
      navigate("/bussiness")
    } catch (error) {
      console.error("Error al crear cuenta:", error)
    }
  }

  return (
    <>
      <img
        className="signupBackground"
        src={
          "https://res.cloudinary.com/djpdopxfy/image/upload/v1700780199/1700748592773_psb91d.jpg"
        }
      ></img>
      <Card
        sx={{
          backgroundColor: "#033c4e",
          opacity: "98.5%",
          position: "absolute",
          right: "0",
          width: "30vw",
          height: "100vh",
          alignItems: "center",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          textAlign: "center",
          overflow: "auto",
        }}
      >
        <CardHeader title="signup" />
        <CardContent>
          <TextField
            onChange={(e) => setCompanyName(e.target.value)}
            label="Nombre de la Empresa"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px", color: "white" }}
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="email de contacto"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="Localización de la empresa"
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
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            variant="filled"
            type="password"
            fullWidth={true}
          />
          <TextField
            onChange={(e) => e.target.value}
            label="Repite tu Contraseña"
            variant="filled"
            type="password"
            fullWidth={true}
          />
        </CardContent>
        <Divider />
        <CardActions>
        <Button
            sx={{
              backgroundColor: blue[300], marginBottom: '10vh',
              "&:hover": { backgroundColor: "white" },
            }}
            onClick={() => onSignupClub()}
            color="secondary"
          >
            signup
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default SignUpClub
