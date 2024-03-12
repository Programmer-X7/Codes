import axios from "axios";
import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [ confirmPassword, setConfirmPassword ] = useState('');
  const [phoneNo, setPhoneNo] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", { name, email, password, phoneNo })
      .then((result) => {
        console.log(result);
        formRef.current.reset();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen w-screen bg-[rgb(17,25,38)] flex items-center justify-center">
      <div className="h-fit w-96 bg-[rgb(30,40,55)] p-8 rounded-xl text-white">
        <p className="text-center font-bold text-3xl mb-8">Sign Up</p>
        <div>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div className="flex flex-col space-y-4 mb-5">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Full Name"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              />
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              />
              {/* <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              /> */}
              <input
                id="phoneNo"
                name="phoneNo"
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
                placeholder="Phone no"
                className="rounded-lg h-10 border border-gray-400 px-4 bg-transparent"
              />
            </div>
            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                className="rounded-lg bg-blue-700 text-white w-full font-semibold py-2 hover:bg-blue-600 transition"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="text-center">
            <Link
              to="/login"
              className="font-bold text-blue-500 hover:text-blue-400 transition"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;