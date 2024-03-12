import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formRef = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { email, password })
      .then((result) => {
        console.log(result);
        formRef.current.reset();
        if (result.data === "Success") {
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 404) {
          setErrorMessage("Not a user");
        } else if(err.response?.status === 401) {
          setErrorMessage("Incorrect credentials!");
        } else {
          setErrorMessage("Unexpected error. Please try again!");
        }
      });
  };

  return (
    <div className="h-screen w-screen bg-[rgb(17,25,38)] flex items-center justify-center">
      <div className="h-fit w-96 bg-[rgb(30,40,55)] p-8 rounded-xl text-white">
        <p className="text-center font-bold text-3xl mb-8">Login</p>
        <div>
          <form onSubmit={handleLogin} ref={formRef}>
            <div className="flex flex-col space-y-4 mb-4">
              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              />
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              />
            </div>

            {/* Display Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-center mt-4">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <Link to="#" className="text-gray-200">
                Forget Password?
              </Link>
              <button
                type="submit"
                className="rounded-lg bg-blue-700 text-white font-semibold px-6 py-2 hover:bg-blue-600 transition"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            Don't have an account?&nbsp;&nbsp;
            <span className="font-bold text-blue-600 hover:text-blue-500 transition">
              <Link to="/signup">Register</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
