import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className='p-1 text-center absolute  w-[93%]  top-0 ' onClick={()=>{
         props.setridePopupPanel(false)
        }}><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
         <h3 className='text-2xl font-semibold mb-5'>New Ride Available</h3>
        <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
            <div className='flex items-center gap-3 '>
                <img className='h-12 rounded-full object-cover w-12' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zu52lvf7RuyygUgHpXInxtwjmdTWtl8N6w&s" alt="" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+ " "+props.ride?.user.fullname.lastname } </h2>
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
                <h3 className='text-lg font-medium'>{props.ride?.fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash </p>
              </div>
            </div>
          </div>
          <div className='flex mt-5 w-full  '>
            <button onClick={() => {
            props.setConfirmridePopupPanel(true)
            props.confirmRide()
          }}
           className='  bg-green-600 text-white py-2 px-10 font-semibold p-2 rounded-lg '>Accept </button>

           <button onClick={() => {
            props.setridePopupPanel(false)
          }}
           className='  bg-gray-400 text-gray-900 py-2 px-10 font-semibold p-2 rounded-lg '>Ignore </button>
          </div>
         </div>
    </div>
  )
}

export default RidePopUp