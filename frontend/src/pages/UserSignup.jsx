import React from 'react'
import logo from '../assets/logo-black.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'


const UserSignup = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser, )
    if (response.status === 201) {
      const data =  response.data
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
    }

      setEmail('')
      setPassword('')
      setFirstName('')
      setLastName('')
    
  }
  return (
   <div>
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img src={logo} className='w-16 mb-10  '/>

      <form onSubmit={(e) => {
        submitHandler(e)
        }}>
        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-4 mb-5'>
          <input
          required
          className='bg-[#eeeeee] border border-gray-300 w-1/2 px-4 py-2 text-lg placeholder:text-base rounded  '
          type='text'
          placeholder='First name'
          value={firstName}
          onChange={(e) => {setFirstName(e.target.value)}}
          />

          <input
          required
          className='bg-[#eeeeee] border border-gray-300 w-1/2 px-4 py-2 text-lg placeholder:text-base rounded  '
          type='text'
          placeholder='Lastname'
          value={lastName}
          onChange={(e)=>{
            setLastName(e.target.value)
          }}/>
        </div>
      
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        required
        type='email' 
        placeholder='email@example.com'
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
          }}
        className=' bg-[#eeeeee] border border-gray-300 px-4 py-2 text-lg placeholder:text-base rounded w-full mb-5' />


        <h3 className='text-lg font-medium mb-2'>Enter Password </h3>
        <input 
        required
        type='password' 
        placeholder='password' 
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value)
          }}
        className='bg-[#eeeeee] border border-gray-300 px-4 py-2 text-lg placeholder:text-base rounded w-full mb-5' />
        <button  
        className='bg-[#111] text-white  font-semibold  px-4 py-2 text-lg placeholder:text-base rounded w-full mb-2'>Create account</button>

      </form>
      <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-500 cursor-pointer'>Login here</Link></p>

      </div>
      <div>
       <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span> </p>
      </div>
    </div>
   </div>
  )
}

export default UserSignup