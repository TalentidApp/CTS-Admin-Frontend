import { Navigate } from "react-router-dom";


import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
const PublicRoute = ({ children }) => {
    
    const {data,isLoggedIn} = useSelector((state)=>state.user);


    // If the user is not logged in, allow them to access the public route
    if (!isLoggedIn) {
        
        return children;
    }

    // If the user is logged in, redirect them to the desired route, like home or profile
    return <Navigate to="/" />;
};

export default PublicRoute;



