

import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";



const ProtectedRoute = ({ children }) => {

    // const {loggedIn} = useContext(MyContext);

    const {data,isLoggedIn} = useSelector((state)=>state.user);


    console.log("user data at protected route ",data);

    console.log("logged in hai kya ",isLoggedIn);

    if(isLoggedIn){

        return children;

    }
    return <Navigate to="/login"></Navigate>
};

export default ProtectedRoute;

