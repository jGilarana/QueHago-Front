import React, { useEffect, useState } from "react";
import ClubsEventsComponent from "./ComponenClubsEvent/ClubsEventsComponent.jsx";
import {
  createClubsEvents,
  getClubsEvents,
} from "../../Services/clubService.js";
import { deleteEvents, updateClubsEvent } from "../../Services/eventService.js";
import dayjs from "dayjs";

const ClubsEvents = () => {

  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [address, setAddress] = useState();
  const [rooms, setRooms] = useState();
  const [date, setDate] = useState();
  const [minimumAge, setMinimumAge] = useState();
  const [image, setImage] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [refresh,  setRefresh] = useState(false);
  const [openTime, setOpenTime] =   useState();
  const [closeTime, setCloseTime] = useState();
  const [description, setDescription] = useState()

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  const updateEvent = async (id) => {
    const response = await updateClubsEvent(id, {
      title,
      genre,
      address,
      latitude,
      longitude,
      rooms,
      date,
      openTime,
      closeTime,
      minimumAge,
      image,
    });
    console.log(response);
    handleCloseUpdate();
    setRefresh(!refresh)
  };
  const seeEvents = async () => {
    if (localStorage.getItem("subscriptionStatus") === null) {
      console.log("You are not logged in");
      return null;
    } else {
      const events = await getClubsEvents();
      setEvents(events.sort((a, b) => dayjs(b.date).diff(dayjs(a.date))))
    }
  };

  const postEvents = async () => {
    const data = await createClubsEvents({
      title,
      genre,
      address,
      latitude,
      longitude,
      rooms,
      date,
      minimumAge,
      image,
      openTime,
      closeTime,
      description
    });
    handleClose();
    setRefresh(!refresh)
  };

  const clubDeletesEvents = async (id) => {
    const response = await deleteEvents(id);
    console.log(response);
    setRefresh(!refresh)
  };

  useEffect(() => {
    seeEvents(); window.scrollTo(0, 0);
  }, [refresh]);

  return (
    <>
      <ClubsEventsComponent
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleOpenUpdate={handleOpenUpdate}
        handleCloseUpdate={handleCloseUpdate}
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        setOpen={setOpen}
        open={open}
        seeEvents={seeEvents}
        setTitle={setTitle}
        setGenre={setGenre}
        setAddress={setAddress}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        setRooms={setRooms}
        setDate={setDate}
        setMinimumAge={setMinimumAge}
        setImage={setImage}
        createEvent={postEvents}
        updateEvent={updateEvent}
        events={events && events}
        setOpenTime = {setOpenTime}
        setCloseTime={setCloseTime}
        clubDeletesEvent={clubDeletesEvents}    
        setDescription={setDescription}  
      />
    </>
  );
};

export default ClubsEvents;
