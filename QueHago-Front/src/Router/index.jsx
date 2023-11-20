import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/',
        element: <Root/>,
        children: [
            {
                path:'/home',
                element: <Home/>
            }
        ]
    }
])

export default router