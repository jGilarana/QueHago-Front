import React, { useEffect, useState } from "react"
import "./Header.css"
import UploadWidget from "../UploadWidget/UploadWidget"
import {
  getProfile,
  postPhoto,
  postProfile,
} from "../../Services/accountService"
import {
  Link,
  Navigate,
  redirect,
  useLocation,
  useNavigate,
} from "react-router-dom"
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material"
import { blue, blueGrey, green, purple } from "@mui/material/colors"
import {
  getOwnClub,
  postClubPhoto,
  updateOwnCLub,
} from "../../Services/clubService"
import dayjs from "dayjs"

const Header = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [info, setInfo] = useState({})

  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [telephone, setTelephone] = useState()
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [birthDate, setBirthDate] = useState()
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
  )

  const [companyName, setCompanyName] = useState()
  const [address, setAddress] = useState()

  const [open, setOpen] = useState(false)
  const [openClub, setOpenClub] = useState(false)
  const [openNotoken, setOpenNotoken] = useState(false)

  const [hovered, setHovered] = useState(false)
  const handleMouseEnter = () => {
    setHovered(true)
  }

  const location = window.location.pathname
  const handleMouseLeave = () => {
    setHovered(false)
  }
  const handleOpen = () => {
    if (localStorage.role === "user" || localStorage.role === "admin") {
      setOpen(true)
      return
    } else if (localStorage.getItem("subscriptionStatus")) {
      setOpenClub(true)
      return
    } else {
      setOpenNotoken(true)
      return
    }
  }
  const handleClose = () => {
    if (localStorage.role === "user" || localStorage.role === "admin") {
      setOpen(false)
    } else if (localStorage.getItem("subscriptionStatus")) {
      setOpenClub(false)
      return
    } else {
      setOpenNotoken(false)
      return
    }
  }

  const updatePhoto = async (newPhoto) => {
    const data = await postPhoto(newPhoto)
    console.log("photo uploaded")
    return data
  }

  const updateUserProfile = async () => {
    try {
      const updateResponse = await postProfile({
        email,
        password,
        telephone,
        firstName,
        lastName,
        birthDate,
        photo,
      })
      handleClose()
      return updateResponse
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
    }
  }

  const updateClubProfile = async () => {
    try {
      const updateResponse = await updateOwnCLub({
        companyName,
        email,
        telephone,
        address,
        photo,
      })
      console.log("Club Updated Succesfully")
      handleClose()
      return updateResponse
    } catch (error) {
      console.error("Error al actualizar usuario:", error)
    }
  }

  const updateClubPhoto = async (newPhoto) => {
    const data = await postClubPhoto(newPhoto)
    console.log("Club photo uploaded")
    return data
  }

  const getPhoto = async () => {
    if (localStorage.getItem("token") === null) {
      console.log("You are not logged in")
      return null
    } else {
      const { data } = localStorage.getItem("role")
        ? await getProfile()
        : await getOwnClub()
      if (data.image === null) {
        setPhoto(
          "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
        )
        return
      }
      setPhoto(data.image)
      return data
    }
  }

  const getAccountInfo = async () => {
    if (localStorage.getItem("token") === null) {
      console.log("You are not logged in")
      return null
    } else {
      const { data } = localStorage.getItem("role")
        ? await getProfile()
        : await getOwnClub()
      setInfo(data)
      return data
    }
  }

  function onLogout() {
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("subscriptionStatus")
    navigate("/")
    if (location === "/") {
      window.location.reload()
    }
    console.log("You are logged out")
  }

  useEffect(() => {
    getPhoto(), getAccountInfo()
  }, [])

  return (
    <Box className="header-container">
      {/* /////////////////////////////////////////////// USER MODAL /////////////////////////////////////////////////////////////////////// */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "transparent",
          position: "fixed",
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            overflow: "auto",
            width: "30vw",
            height: "90%",
            marginTop: "9vh",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: "12px",
            background:
              "linear-gradient(0deg, rgba(12,12,170,1) 20%, rgba(9,9,189,1) 95%)",
            opacity: "95%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
            position: "relative",
            position: "absolute",
            right: "5vw",
          }}
        >
          <h2 id="updateUser">Actualizar Usuario</h2>
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            label="¿Quieres que te llamemos de otra manera?"
            variant="filled"
            fullWidth={true}
            defaultValue={info?.firstName}
            sx={{
              width: "80%",
              margin: "10px",
              marginBottom: "25px",
              backgroundColor: "white",
            }}
          />
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            label="¿Han cambiado tus apellidos?"
            variant="filled"
            fullWidth={true}
            defaultValue={info?.lastName}
            sx={{
              width: "80%",
              margin: "10px",
              marginBottom: "25px",
              backgroundColor: "white",
            }}
          />
          <TextField
            onChange={(e) => setTelephone(e.target.value)}
            label="Escribe aquí tu nuevo número de teléfono"
            variant="filled"
            type="number"
            defaultValue={info?.telephone}
            sx={{ width: "80%", margin: "10px", backgroundColor: "white" }}
          />
          <TextField
            onChange={(e) => setBirthDate(e.target.value)}
            variant="filled"
            label="¿Pusiste mal tu cumpleaños? 🤔"
            type="date"
            fullWidth={true}
            defaultValue={dayjs(info?.birthDate).format("YYYY-MM-DD")}
            sx={{
              width: "80%",
              margin: "10px",
              marginBottom: "25px",
              backgroundColor: "white",
            }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Actualizar Contraseña"
            variant="filled"
            type="password"
            fullWidth={true}
            sx={{
              width: "80%",
              backgroundColor: "white",
              marginTop: "17px",
              marginBottom: "17px",
            }}
          />
          <UploadWidget setUrl={setPhoto} updatePhoto={updatePhoto} />
          <Button
            sx={{
              backgroundColor: "white",
              border: "2px solid white",
              width: "10vw",
              position: "absolute",
              bottom: "48px",
              right: "33%",
              ":hover": { backgroundColor: blue[300], color: "black" },
            }}
            onClick={() => updateUserProfile()}
          >
            ACTUALIZAR USUARIO
          </Button>
        </Box>
      </Modal>
      {/* /////////////////////////////////////////////// CLUB MODAL /////////////////////////////////////////////////////////////////////// */}

      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "transparent",
          position: "fixed",
        }}
        open={openClub}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            overflow: "auto",
            width: "30vw",
            height: "80%",
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            borderRadius: "12px",
            background:
              "linear-gradient(0deg, rgba(97,52,164,1) 24%, rgba(143,21,203,1) 82%)",
            opacity: "95%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
            position: "absolute",
            right: "4.5vw",
          }}
        >
          <h2>Actualizar Compañía</h2>

          <TextField
            onChange={(e) => setCompanyName(e.target.value)}
            label="¿Has cambiado el nombre de tu compañía?"
            variant="filled"
            fullWidth={true}
            defaultValue={info?.companyName}
            sx={{
              width: "80%",
              marginBottom: "25px",
              backgroundColor: "#ffc7ff",
            }}
          />

          <TextField
            onChange={(e) => setTelephone(e.target.value)}
            label="¿Has actualizado tu telefono?"
            variant="filled"
            fullWidth={true}
            defaultValue={info?.telephone}
            sx={{
              width: "80%",
              marginBottom: "25px",
              backgroundColor: "#ffc7ff",
            }}
          />

          <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="Actualiza tu dirección física si la has cambiado"
            variant="filled"
            defaultValue={info?.address}
            fullWidth={true}
            sx={{
              width: "80%",
              marginBottom: "25px",
              backgroundColor: "#ffc7ff",
            }}
          />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Aquí puedes cambiar tu contraseña"
            variant="filled"
            fullWidth={true}
            sx={{
              width: "80%",
              marginBottom: "25px",
              backgroundColor: "#ffc7ff",
            }}
          />
          <p>Recomendamos cerrar sesión en caso de cambiar la contraseña</p>

          <UploadWidget setUrl={setPhoto} updatePhoto={updateClubPhoto} />
          <Button
            sx={{
              color: "white",
              border: "2px solid white",
              width: "10vw",

              ":hover": { color: "black", backgroundColor: "#ffc7ff" },
            }}
            onClick={() => updateClubProfile()}
          >
            Actualizar perfil
          </Button>
        </Box>
      </Modal>

      {/*       ///////////////////////////////////////////////////// NO TOKEN MODAL ///////////////////////////////////////////////////////////////////
       */}

      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
          backgroundColor: "transparent",
          position: "fixed",
        }}
        open={openNotoken}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            overflow: "auto",
            width: "30vw",
            height: "80%",
            display: "flex",
            alignContent: "center",
            justifyContent: "space-around",
            flexDirection: "column",
            borderRadius: "12px",
            background:
              "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(6,6,201,1) 34%)",
            opacity: "90%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
          <h1>No puedes actualizar tu usuario porque no has iniciado sesión</h1>
          <Button
            sx={{
              backgroundColor: "#cccccc",
              margin: "1vw",
              ":hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Modal>
      <div className="headerItemsContainer">
        <img
          onClick={
            window.location.pathname === "/"
              ? () => window.location.reload()
              : () => navigate("/")
          }
          className="logo"
          src="https://res.cloudinary.com/djpdopxfy/image/upload/v1700734298/QueHago_logo_1_dlxtrk.png"
        ></img>

        <Button
          onClick={() => navigate("/login")}
          sx={{
            margin: "20px",
            backgroundColor: blue[600],
            color: "white",
            display: localStorage.getItem("token") ? "none" : "initial",
            position: "absolute",
            right: "32vw",
            width: "250px",
            ":hover": {
              backgroundColor: blue[900],
            },
          }}
        >
          Soy Usuario
        </Button>
        <Button
          onClick={() => navigate("/bussiness/login")}
          sx={{
            display: localStorage.getItem("token") ? "none" : "initial",
            margin: "20px",
            backgroundColor: purple[600],
            color: "white",
            position: "absolute",
            right: "15vw",
            width: "250px",
            ":hover": {
              backgroundColor: purple[900],
            },
          }}
          color="success"
        >
          Soy Empresa
        </Button>
        <Button
          color="warning"
          sx={{ display: localStorage.getItem("token") ? "initial" : "none" }}
          onClick={() => onLogout()}
        >
          Logout
        </Button>
        <div>
          <img
            onClick={() => handleOpen()}
            className="profilePhoto"
            src={
              localStorage.getItem("token") === null
                ? "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
                : photo
            }
          ></img>
        </div>
      </div>
    </Box>
  )
}

export default Header
