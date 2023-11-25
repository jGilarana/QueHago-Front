import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ClubsEvents from "../Pages/ClubsEvents/ClubsEvents.jsx";
import LoginClub from "../Pages/Login/LoginClub.jsx";
import SignUpClub from "../Pages/SignUp/SignUpClub/SignUpClub.jsx";
import SingleEvent from "../Pages/SingleEvent/SingleEvent.jsx";
import Map from "../Components/Map/Map.jsx";

const router = createBrowserRouter([
    {
        path:'/bussiness/login',
        element: <LoginClub/>
    },
    {
        path:'/bussiness/signup',
        element: <SignUpClub/>
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/signup',
        element: <SignUp/>
    },
    {
        path:'/',
        element: <Root/>,
        children: [
            {
                path:'/',
                element: <Home/>
            }, 
            {
                path:'/bussiness',
                element: <ClubsEvents/>
            }, 
            {
                path: '/event/:eventId',
                element : <SingleEvent/>
            },
            {
                path: '/map',
                element : <Map/>
            }
        ]
    }
])

export default router