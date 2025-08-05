import React from 'react'
import BusinessListFav from '../../../component/BusinessListFav'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import person from '../../AddyourBusiness/hand.avif'
import { getBusinessFilter } from '../../../redux/store/actions/business-action';
function Business() {

   const dispatch = useDispatch();
    const { error, business, phoneNumber } = useSelector(
      (state) => state.business
    );
   
    console.log(business)
    const { filepath } = useSelector((state) => state.login);
  
   
  
    useEffect(() => {
      dispatch(getBusinessFilter({phone: phoneNumber}));
    }, []);
  return (
    <div className='m-lg-5 p-3'>
      <h1> My  Business </h1>
       <div>
           
            <p>{error}</p>

            {/* {business?.name} */}

            {Array.isArray(business) &&
              business.map((business, index) => (
                <div className='w-lg-1/2 m-lg-2'>
                 <BusinessListFav  src={ business.images && business.images.length > 0 
                             ? `${filepath}/${business.images[0]}`
                    : person} name={business.name}
                   address={
        business.address && business.address.street
          && business.address.street      
                    }
                    link={`/editbusiness/${business._id}`}
                  />
                </div>
              ))}

            <br></br>

          </div>
    </div>
  )
}

export default Business
