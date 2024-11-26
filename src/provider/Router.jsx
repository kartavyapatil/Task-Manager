import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Login from "../component/Login";
import Error from "../component/Error";
import Dashboard from "../component/Dashboard";
import Register from "../component/Register";
export const Routes=createBrowserRouter([
    {
        path:"/",
        Component:App,
        children:[
            {
                path:'/',
                Component:Dashboard,
                
            },{
                path:"*",
                Component:Error
            }
        ]
    },{
        path:"/login",
        Component:Login
    }
    ,{
        path:"/Register",
        Component:Register
    }
])