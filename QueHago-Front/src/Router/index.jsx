import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Root from "../Layouts/Root";

const router = createBrowserRouter([

    {
        path:'/',
        element: <Root/>,
        children: [
            {
                path:'/',
                element: <Home/>
            }
        ]
    }
])

export default router