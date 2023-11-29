import React, { useEffect, useState } from "react";
import "./Header.css";
import UploadWidget from "../UploadWidget/UploadWidget";
import {
  getProfile,
  postPhoto,
  postProfile,
} from "../../Services/accountService";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import { Box, Button, MenuItem, Modal, TextField } from "@mui/material";
import { blueGrey, green } from "@mui/material/colors";
import { getOwnClub, postClubPhoto, updateOwnCLub } from "../../Services/clubService";

const Header = () => {


  const navigation = useNavigate();

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
    } else {
      setOpenClub(true);
      return
    }
    console.log(openClub);
  };
  const handleClose = () => {
    if (localStorage.role === "user" || localStorage.role === "admin") {
      setOpen(false);
    } else {
      setOpenClub(false);
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

  useEffect(() => {
    getPhoto();
  }, []);

  const getPhoto = async () => {
    if (localStorage.getItem("token") === null) {
      console.log("You are not logged in");
      return null;
    } else {
      const  {data}  = localStorage.getItem("role") 
        ? await getProfile()
        : await getOwnClub();
        if (data.image === null) {
          setPhoto('https://res.cloudinary.com/djpdopxfy/image/upload/v1700759387/QueHago/yfwbqcttpnfh8gdkbsdp.png')
          return
          }
      setPhoto(data.image);
      return data;
    }
  };

  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("subscriptionStatus");
    if (location === "/") {
      window.location.reload();
    }
    console.log("You are logged out");
  }

  return (
    <Box className="header-container">

      {/* /////////////////////////////////////////////// USER MODAL /////////////////////////////////////////////////////////////////////// */}
      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            height: "60vh",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "column",
            borderRadius: "12px",
            backgroundColor: "#9294ff",
            opacity: "85%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
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
            onChange={(e) => setTelephone(e.target.value)}
            label="Teléfono"
            variant="filled"
            fixed
            sx={{ marginBottom: "20px" }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Contraseña"
            variant="filled"
            type="password"
            fullWidth={true}
          />
          <UploadWidget setUrl={setPhoto} updatePhoto={updatePhoto} />
          <Button onClick={() => updateUserProfile()}>Update</Button>
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
            backgroundColor: "#9294ff",
            opacity: "90%",
            backdropFilter: "blur(800px)",
            zIndex: "2",
          }}
        >
            <TextField
            onChange={(e) => setCompanyName(e.target.value)}
            label="¿Has cambiado el nombre de tu compañía?"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
             <TextField
            onChange={(e) => setTelephone(e.target.value)}
            label="¿Has actualizado tu telefono?"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
            <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Aquí puedes cambiar tu contraseña"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
            <TextField
            onChange={(e) => setAddress(e.target.value)}
            label="Actualiza tu dirección física si la has cambiado"
            variant="filled"
            fullWidth={true}
            sx={{ marginBottom: "20px" }}
          />
          <UploadWidget setUrl={setPhoto} updatePhoto={updateClubPhoto}/>
          <Button onClick={() => updateClubProfile()}>Update</Button>
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
          sx={{ margin: "20px", backgroundColor: "#792350", color: "white",   display: (localStorage.getItem('token')) ? 'none' : 'initial' }}
          color="primary"
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
      <Link>
        <Button sx={{ display: (localStorage.getItem('token')) ? 'initial' : 'none'}}onClick={() => onLogout()}>Logout</Button>
      </Link>

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
