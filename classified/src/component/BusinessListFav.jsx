import React from 'react'
import {Link} from 'react-router-dom'
function BusinessListFav({src,name,address,Icon,link,...props}) {
  return (
    <div>
       
          
           <div className=" w-full border-grey-300 border-2 flex rounded p-3 gap-3 m-1 m-lg-3 items-center justify-between">
        <Link to={link} className='no-underline text-black'>
          <div className='flex  flex-wrap gap-3'>
                      <img
                        src={src}
                        alt=""
                        className="h-[100px] w-[130px] rounded-lg object-contain "
          /> 
            <div >
                      <h4  className="p-0 my-1">
                        {name}  </h4>
                        <p>{address}</p>
            
        </div>
                    </div>    
        </Link>       
        <div> {Icon && <Icon className='text-2xl text-red-600' {...props} />}</div>
              
                  </div>
    </div>
  )
}

export default BusinessListFav;



{/* <div className=" w-full border-grey-300 border-2 flex  rounded p-3 gap-3 m-3 items-center">
                    <div>
                      <img
                        src={
                          business.images && business.images.length > 0 
                             ? `${filepath}/${business.images[0]}`
                             : person

                          
                        }
                        alt=""
                        className="h-[100px] w-[130px] rounded-lg object-cover "
                      />

                      
                    </div>
                    <div class="">
                      <h4 key={index} className="p-0 my-1">
                        {business.name}
                      </h4>
                       {
                    business ? ( <p>{business.address["street"]}</p>) : (
                      <p>No Address</p>
                    )
                } 
                    </div>
                  </div> */}