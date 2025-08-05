import React, { useEffect } from 'react'
import BusinessListFav from '../../../component/BusinessListFav'
import { useSelector,useDispatch } from 'react-redux'
import person from './hand.avif'
import {Container} from 'react-bootstrap'
import { deleteSaved, getSaved } from '../../../redux/store/actions/user-action'
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
function MyFavourites() {
  const { save,filepath,savemsg } = useSelector(state => state.login)
  
    const dispatch = useDispatch();

  

    useEffect(() => {   
        // You can dispatch an action here if needed to fetch favourites
        dispatch(getSaved());
    }, [dispatch]);


  return (  
    <div>
         
          

          {/* {
              save.map((b, i) => (
                  <h1>{b.name}</h1>
              ))
          } */}
      <Container className=' flex flex-col justify-center items-center m-lg-4'>
           <h3>My Favourites </h3>
          {
              save ? save.length > 0 ? (
            save.map((business, index) => (
                    
              <>
                
                      <div className='w-3/4'>
                      
                          <BusinessListFav
                    key={index}
                    src={business.images && business.images.length > 0
                      ? `${filepath}/${business.images[0]}`
                      : person}
                    name={business.name}
                    address={
                      business.address ? (
                        <p>{business.address.street}</p>
                      ) : (
                        <p>No Address</p>
                      )
                    }
                    Icon={RxCross2}
                    link={`/singleBusiness/${business._id}`}
                    onClick={() => { dispatch(deleteSaved(business._id)) }}
                      />
                      
                    </div>
          </>
                ))
              ) : (
                      <div className="flex flex-col items-center justify-center  ">
                          
                          <img src="/heart.jpg" alt="" className='h-[550px] w-[550px] object-cover' />
                          <p className='font-serif'>No favourites yet</p>
                </div>
              ) : (
                <p>Loading...</p>
                )
          }
         </Container>
    </div>
  )
}

export default MyFavourites
