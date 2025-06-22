import React, { useRef } from 'react'  
import { Link } from 'react-router-dom'
import logoBlack from '../assets/logo-black.png'
import CaptainDetail from '../components/CaptainDetail'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react';
import ConfirmridePopup from '../components/ConfirmridePopup'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking';
import axios from 'axios'

const CaptainHome = () => {


  const [ridePopupPanel, setridePopupPanel] = useState(false)
  const [confirmridePopupPanel, setConfirmridePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmridePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

  const {socket } = useContext(SocketContext)
  const {captain } = useContext(CaptainDataContext)

 useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

         const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])

     socket.on('new-ride', (data) => {

        setRide(data)
        setridePopupPanel(true)

    })

     async function confirmRide() {

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setridePopupPanel(false)
       setConfirmridePopupPanel(true)

    }

  useGSAP( function() {
   if(ridePopupPanel) {
     gsap.to(ridePopupPanelRef.current, {
      transform: 'translateY(0%)',
     })
    }else {
     gsap.to(ridePopupPanelRef.current, {
      transform: 'translateY(100%)',
     })
  }
},[ridePopupPanel])

useGSAP( function() {
   if(confirmridePopupPanel) {
     gsap.to(confirmridePopupPanelRef.current, {
      transform: 'translateY(0%)',
     })
    }else {
     gsap.to(confirmridePopupPanelRef.current, {
      transform: 'translateY(100%)',
     })
  }
},[confirmridePopupPanel])

  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen '>
          <img src={logoBlack} alt="" className='w-16 ' />
           <Link to='/home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
        </div>
        <div className='h-3/5'>
            <LiveTracking />
            
        </div>
        <div className='h-2/5 p-6'>
              <CaptainDetail />
        </div>
        <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <RidePopUp
        ride={ride}  
        setridePopupPanel={setridePopupPanel} setConfirmridePopupPanel={setConfirmridePopupPanel}
        confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmridePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full  bg-white px-3 py-10 pt-12'>
        <ConfirmridePopup
         ride={ride}
        setConfirmridePopupPanel={setConfirmridePopupPanel} setridePopupPanel={setridePopupPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome