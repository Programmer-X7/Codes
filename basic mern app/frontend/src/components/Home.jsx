import React from 'react'
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center bg-slate-800 h-[calc(100vh-4rem)] text-4xl font-bold text-slate-100 space-y-6'>
        <p>Home Page</p>
        <img src="/rickroll-roll.gif" alt="home" className='h-64 rounded-lg' />
        </div>
    </>
  )
}

export default Home