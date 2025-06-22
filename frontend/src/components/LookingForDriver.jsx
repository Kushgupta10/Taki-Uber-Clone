import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div className='mb-20'>
      <h5 className='p-1 text-center absolute  w-[93%]  top-0 ' onClick={()=>{
          props.setVehicleFound(false)
        }}><i className=" text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
         <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

         <div className='flex gap-2 justify-between flex-col items-center'>
          <img className='h-20' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'> 
              <i className=" text-lg ri-map-pin-user-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Pickup Location</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2 border-gray-200'>
              <i className=" text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Destination Location</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
              </div> 
            </div>
            <div className='flex items-center gap-5 p-3 '>
              <i className="text-lg  ri-currency-line"></i>
              <div >
                <h3 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash </p>
              </div>
            </div>
          </div>
          
         </div>
    </div>
  )
}

export default LookingForDriver