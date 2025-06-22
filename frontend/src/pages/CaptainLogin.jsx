import React from 'react'
import  { useState } from 'react'
import driver from '../assets/driver.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain= {
      email: email,
      password: password
    }
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
        
      }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img src={driver} className='w-16 mb-3  '/>
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
      <p className='text-center'> Join a fleet ? <Link to='/captain-signup' className='text-blue-500 cursor-pointer'>Register as a Captain</Link></p>

      </div>
      <div>
        <Link to='/login'
        className='bg-[#111] flex items-center justify-center text-white  font-semibold  px-4 py-2 text-lg placeholder:text-base rounded w-full mb-5'>Sign as User </Link>
      </div>
    </div>
  )
}

export default Captainlogin