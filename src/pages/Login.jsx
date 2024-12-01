import React from "react";

import { useState } from "react";

import { useDispatch } from "react-redux";

import { setData } from "../redux/userSlice";

import axios from "axios";

import { useNavigate } from "react-router-dom";


import {toast} from "react-hot-toast"

const LoginPage = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const[userData,setUserData] = useState({email:"", password:""});

  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  
  const handleInputChange = (event) => {
    
    console.log(event.target.value);

    setUserData({...userData,[event.target.name]:event.target.value});
    
  };

  async function submitHandler(event){

    try{

      event.preventDefault();
      
      // For demonstration purposes, we'll just log the user data
      console.log(userData);

      const response = await axios.post(`${apiUrl}/api/users/login`,{email:userData.email,password:userData.password})

      console.log("data is ",response.data);

      if(response?.data?.role != "Admin" ){

        console.warn("role is not admin ");

        return ;
        

      }else{

        console.log("helow")

        dispatch(setData(response.data))

        userData.email = "";

        userData.password = "";

        navigate("/");

      }

    }catch(error){

      console.log(error);

      toast.error(error?.response?.data?.message);

    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-2">
          <img src="/image.png" alt="Employia Logo" className="h-10" />

        </div>
        <h1 className="text-5xl text-white font-bold">
          Make Employia the Great or die trying
        </h1>
        <p className="text-gray-400">Administration user log-in portal</p>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-white text-2xl mb-4 text-center">log in</h2>
          <form className="space-y-6" onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              onChange={handleInputChange}
              value={userData.email}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="Enter your Password"
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
