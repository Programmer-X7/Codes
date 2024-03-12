import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center space-y-8 bg-[rgb(17,25,38)]'>
        <p className='text-8xl font-bold text-white'>Welcome</p>
        <div className='flex space-x-6'>
            <Link to="/login" className="rounded-lg bg-blue-700 text-white font-semibold px-6 py-2 hover:bg-blue-600 transition">Login</Link>
            <Link to="/signup" className="rounded-lg bg-blue-700 text-white font-semibold px-6 py-2 hover:bg-blue-600 transition">Sign Up</Link>
        </div>
    </div>
  )
}

export default LandingPage