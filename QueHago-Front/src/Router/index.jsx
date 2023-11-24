import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import clubsEvents from "../Pages/clubsEvents/clubsEvents";

const router = createBrowserRouter([
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
                element: <clubsEvents/>
            }
        ]
    }
])

export default router