import React, { useEffect, useState } from "react";
import "./Header.css";
import UploadWidget from "../UploadWidget/UploadWidget";
import {
  getProfile,
  postPhoto,
  postProfile,
} from "../../Services/accountService";
import { Link, Navigate, redirect, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { blueGrey, green } from "@mui/material/colors";
import { getOwnClub, postClubPhoto, updateOwnCLub } from "../../Services/clubService";
import dayjs from "dayjs";

const Header = () => {

  const { pathname } = useLocation()
  console.log(pathname)
  const navigate = useNavigate();

  const [info,setInfo] = useState({})
  console.log(info)

  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [telephone, setTelephone] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg"
  );

  const [companyName, setCompanyName] = useState();
  const [address, setAddress] = useState();

  const [open, setOpen] = useState(false);
  const [openClub, setOpenClub] = useState(false);
  const [openNotoken, setOpenNotoken] = useState(false);

  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const location = window.location.pathname;
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleOpen = () => {
    if (localStorage.role === "user" || localStorage.role === "admin") {
      setOpen(true);
      return
    } else if(localStorage.getItem('subscriptionStatus')) {
      setOpenClub(true);
      return
    } else {
      setOpenNotoken(true);
      return
    }
  };
  const handleClose = () => {
    if (localStorage.role === "user" || localStorage.role === "admin") {
      setOpen(false);
    } else if(localStorage.getItem('subscriptionStatus')) {
      setOpenClub(false);
      return
    } else {
      setOpenNotoken(false);
      return
    }
  };

  const updatePhoto = async (newPhoto) => {
    const data = await postPhoto(newPhoto);
    console.log("photo uploaded");
    return data;
  };

  const updateUserProfile = async () => {
    try {
      const updateResponse = await postProfile({
        email,
        password,
        telephone,
        firstName,
        lastName,
        birthDate,
        photo
      });
      handleClose()
      return updateResponse
    } catch (error) {
      
      console.error("Error al actualizar usuario:", error);
    }
  };


  const updateClubProfile = async () => {
    try {
      const updateResponse = await updateOwnCLub({
        companyName,
        email,
        telephone,
        address,
        photo,
        
      });
      console.log('Club Updated Succesfully')
      handleClose()
      return updateResponse
    } catch (error) {
      
      console.error("Error al actualizar usuario:", error);
    }
  };

  const updateClubPhoto = async (newPhoto) => {
    const data = await postClubPhoto(newPhoto);
    console.log("Club photo uploaded");
    return data;
  };

 
  const getPhoto = async () => {
    if (localStorage.getItem("token") === null) {
      console.log("You are not logged in");
      return null;
    } else {
      const  {data}  = localStorage.getItem("role") 
        ? await getProfile()
        : await getOwnClub();
        if (data.image === null) {
          setPhoto('https://res.cloudinary.com/djpdopxfy/image/upload/v1700755834/QueHago/grmqnv1mruknyknoyf5d.jpg')
          return
          }
      setPhoto(data.image);
      return data;
    }
  };

  const getAccountInfo = async() => {
    if (localStorage.getItem("token") === null) {
      console.log("You are not logged in");
      return null;
    } else {
      const  {data}  = localStorage.getItem("role") 
        ? await getProfile()
        : await getOwnClub();     
      setInfo(data);
      return data;
    }
  }

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("subscriptionStatus");
    navigate('/')
    if (location === "/") {
      window.location.reload();
    }
    console.log("You are logged out");
  }


  useEffect(() => {
    getPhoto(), getAccountInfo()
  }, []);


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
            width: "55vw",
            height: "100%",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            background: "linear-gradient(0deg, rgba(12,12,170,1) 20%, rgba(9,9,189,1) 95%)",
            opacity: "95%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
            position:'relative'
          }}
        >
          <h2 className="modalInfo">Actualizar Usuario</h2>
          <h2 className="modalInfo">Tu nombre : {info?.firstName}</h2>
          <TextField
            onChange={(e) => setFirstName(e.target.value)}
            label="¿Quieres que te llamemos de otra manera?"
            variant="filled"
            fullWidth={true}
            sx={{marginBottom: "25px", color: "white" }}
          />
          <h2 className="modalInfo">Tu apellido : {info?.lastName}</h2>
          <TextField
            onChange={(e) => setLastName(e.target.value)}
            label="¿Han cambiado tus apellidos?"
            variant="filled"
            fullWidth={true}
            sx={{marginBottom: "25px", color: "white" }}
          />
          <h2 className="modalInfo">TU telefono : {info?.telephone}</h2>
          <TextField
            onChange={(e) => setTelephone(e.target.value)}
            label="Escribe aquí tu nuevo número de teléfono"
            variant="filled"
            fixed
            sx={{ marginBottom: "25px", color: "white"}}
          />
          <h2 className="modalInfo">Tu cumpleaños : {dayjs(info?.birthDate).format('DD/MM/YYYY')}</h2>
          <h4>¿Pusiste mal tu cumpleaños? 🤔</h4>
           <TextField
            onChange={(e) => setBirthDate(e.target.value)}
            variant="filled"
            type="date"
            fullWidth={true}
            sx={{marginBottom: "25px", color: "white" }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            variant="filled"
            type="password"
            fullWidth={true}
            sx={{marginBottom: "25px", color: "white"}}
          />
          <UploadWidget setUrl={setPhoto} updatePhoto={updatePhoto} />
          <Button sx={{color:'white', border:'2px solid white', width:'10vw', position:'absolute', bottom:'10px', right:'40%' ,':hover' : {backgroundColor:'yellow', color:'black'}}} onClick={() => updateUserProfile()}>ACTUALIZAR USUARIO</Button>
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
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            background: 'linear-gradient(0deg, rgba(97,52,164,1) 24%, rgba(143,21,203,1) 82%)',
            opacity: "95%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
            position:'relative'
          }}
        >
            <h2>Actualizar Compañía</h2>
            <h2 className="modalInfo">Nombre de la empresa : {info?.companyName}</h2>
            <TextField
            onChange={(e) => setCompanyName(e.target.value)}
            label="¿Has cambiado el nombre de tu compañía?"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "25px" }}
          />
          <h2 className="modalInfo">Tu teléfono : {info?.telephone}</h2>
             <TextField
            onChange={(e) => setTelephone(e.target.value)}
            label="¿Has actualizado tu telefono?"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "25px" }}
          />
            <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Aquí puedes cambiar tu contraseña"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "25px" }}
          />
          <h2 className="modalInfo">Tu correo electrónico : {info?.email}</h2>
            <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="Actualiza tu dirección física si la has cambiado"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "25px" }}
          />
          <UploadWidget setUrl={setPhoto} updatePhoto={updateClubPhoto}/>
          <Button sx={{color:'white', border:'2px solid white', width:'10vw', position:'absolute', bottom : '8vh', right:'35%' ,':hover' : {backgroundColor:'yellow', color:'black'}}} onClick={() => updateClubProfile()}>Update</Button>
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
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            background:'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(6,6,201,1) 34%)',
            opacity: "90%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
           <h1>No puedes actualizar tu usuario porque no has iniciado sesión</h1>
          <Button onClick={() => navigate('/login')}>Iniciar sesión</Button>
        </Box>
      </Modal>

      <Link to={"/"}>
        <img
          className="logo"
          src="https://res.cloudinary.com/djpdopxfy/image/upload/v1700734298/QueHago_logo_1_dlxtrk.png"
        ></img>
      </Link>
      <Link to={"/login"}>
        <Button
          sx={{ margin: "20px", backgroundColor: "#792350", color: "green",   display: (localStorage.getItem('token')) ? 'none' : 'initial' }}
        >
          Login
        </Button>
      </Link>
      <Link to={"/signup"}>
        <Button
          sx={{ display: (localStorage.getItem('token')) ? 'none' : 'initial', margin: "20px", backgroundColor: green[600], color: "white" }}
          color="success"
        >
          Sign Up
        </Button>
      </Link>
      <Link to={"/bussiness/login"}>
        <Button
          sx={{display: (localStorage.getItem('token')) ? 'none' : 'initial', margin: "20px", backgroundColor: "#792350", color: "white" }}
          color="success"
        >
          Login Bussiness
        </Button>
      </Link>
      <Link to={"/bussiness/signup"}>
        <Button
          sx={{ display: (localStorage.getItem('token')) ? 'none' : 'initial', margin: "20px", backgroundColor: green[600], color: "white" }}
          color="success"
        >
          SignUp Bussiness
        </Button>
      </Link>
        <Button color="warning" sx={{ display: (localStorage.getItem('token'))  ? 'initial' : 'none'}}onClick={() => onLogout()}>Logout</Button>
        <Button sx={{ display:(localStorage.getItem('subscriptionStatus'))  ? 'initial' : 'none'}} onClick={() => navigate('/bussiness')}>Accede a tus eventos</Button>
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
    </Box>
  );
};

export default Header;
