import React from 'react'
import { useState, useContext } from 'react'
import logo from '../assets/logo-black.png'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const {user, setUser} = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const userData = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

    if (response.status === 200) {
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }
    
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img src={logo} className='w-16 mb-10  '/>
      <form onSubmit={(e) => {
        submitHandler(e)
        }}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email' 
        placeholder='email@example.com' 
        className=' bg-[#eeeeee] border border-gray-300 px-4 py-2 text-lg placeholder:text-base rounded w-full mb-7' />


        <h3 className='text-lg font-medium mb-2'>Enter Password </h3>
        <input 
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password' 
        placeholder='password' 
        className='bg-[#eeeeee] border border-gray-300 px-4 py-2 text-lg placeholder:text-base rounded w-full mb-7' />
        <button  
        className='bg-[#111] text-white  font-semibold  px-4 py-2 text-lg placeholder:text-base rounded w-full mb-2'>Login</button>

      </form>
      <p className='text-center'>Don't have an account? <Link to='/signup' className='text-blue-500 cursor-pointer'>Create new Account</Link></p>

      </div>
      <div>
        <Link to='/captain-login'
        className='bg-[#111] flex items-center justify-center text-white  font-semibold  px-4 py-2 text-lg placeholder:text-base rounded w-full mb-5'>Sign as Captain </Link>
      </div>
    </div>
  )
}

export default UserLogin