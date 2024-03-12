import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="bg-[rgb(30,41,59)]">
      <Navbar />
      <div className="flex w-3/4 mx-auto space-x-10 h-[calc(100vh-4rem)] text-white">
        <div className="w-2/4">
          <img
            className="object-cover w-h-64 h-64 rounded-full ring ring-green-500 dark:ring-green-400 mx-auto mt-12 mb-6"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
            alt="profile-image"
          />
          <p className="text-center text-2xl font-bold text-white">
            Suman Mondal
          </p>
        </div>
        <div className="w-3/4 px-6">
          <p className="mt-12 text-2xl text-green-500 font-bold">
            Account Settings
          </p>
          <div className="flex flex-col space-y-4 my-6">
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-lg">Name</p>
              <div className="border border-slate-200 bg-slate-700 text-white w-fit px-4 py-2 text-lg">
                Suman Mondal
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-lg">Email address</p>
              <div className="border border-slate-200 bg-slate-700 text-white w-fit px-4 py-2 text-lg">
                sumanmondal@gmail.com
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-lg">Password</p>
              <div className="border border-slate-200 bg-slate-700 text-white w-fit px-4 py-2 text-lg">
                *********
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="font-bold text-lg">Phone No</p>
              <div className="border border-slate-200 bg-slate-700 text-white w-fit px-4 py-2 text-lg">
                +91-1234567890
              </div>
            </div>
          </div>
          <Link to="/" className="rounded-lg bg-red-600 text-white font-semibold px-4 py-2 hover:bg-red-500 transition">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
