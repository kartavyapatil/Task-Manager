import React from 'react'
import logo from "../assets/logo.png"
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const { logOut } = useAuth();
    const navigate =useNavigate()
    const handlelogout= async()=>{
        try {
            await logOut();
            toast.success("logout successfully!");
            navigate("/login");
          } catch (err) {
            console.error("Logout failed:", err.message);
          }

    }
  return (
    <>
        <header>
            <nav className='flex justify-between'>
                <div className='flex items-center gap-4'><img src={logo} className='w-16 ml-3 mt-2'/> <div className='text-4xl font-sans'>Task Manager</div></div>
                <button className='pl-4 ml-3 p-6' onClick={handlelogout}><IoLogOutOutline size={32} /></button>
            </nav>
        </header>
    </>
  )
}

export default Header
