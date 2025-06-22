import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmridePopup = (props) => {
  const [otp, setOtp] = useState('')
     const navigate = useNavigate()


  const submitHandler = async (e)=>{
    e.preventDefault()

            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
            params: {
                rideId: props.ride._id,
                otp: otp
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            props.setConfirmridePopupPanel(false)
            props.setridePopupPanel(false)
            navigate('/captain-riding', { state: { ride: props.ride } })
        }

  }
  return (
     <div >
        <h5 className='p-1 text-center absolute  w-[93%]  top-0 ' onClick={()=>{
         props.setridePopupPanel(false)
        }}><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
         <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
        <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 rounded-full object-cover w-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zu52lvf7RuyygUgHpXInxtwjmdTWtl8N6w&s" alt="" />
                <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2Km</h5>
        </div>
         <div className='flex gap-2 justify-between flex-col items-center'>
          
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'> 
              <i className=" text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Pickup Location</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Destination Location</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
              </div> 
            </div>
            <div className='flex items-center gap-5 p-3 '>
              <i className="text-lg  ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash </p>
              </div>
            </div>
          </div>
          <form >

          </form>
          <div className='mt-6 w-full'>
           <form onSubmit={(e)=>{
            submitHandler(e)
           }}>
            <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />
             <button 
           className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg '>Confirm </button>

           <button onClick={() => {
            props.setConfirmridePopupPanel(false)
            props.setridePopupPanel(false)
          }}
           className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel </button>
           </form>
          </div>
         </div>
    </div>
  )
}

export default ConfirmridePopup