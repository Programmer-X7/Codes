import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // to access saved cookies
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("user");
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:3000/home")
      .then((response) => {
        const { userId, userName, userEmail } = response.data.user;
        setUserName(userName);
      })
      .catch((error) => {
        console.log("unauthorized", error);
        navigate("/");
      });
  }, []);

  const handleLogout = () => {
    // Remove the cookie on logout and redirect back to "/"
    Cookies.remove("jwtoken");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Welcome, {userName}!
        </h2>
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
