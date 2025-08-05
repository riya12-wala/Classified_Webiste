import React, { useEffect } from "react";
import { Container,Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { getReviewAvgCount, getReviewByUserId } from "../../../redux/store/actions/review-action";
import RecentActivityCard from "../../Introduction-pages/home/recentactivity/RecentActivityCard";
import StarRating from "../../../component/StarComponent";
function ViewYourProfile() {

    const { users, filepath } = useSelector((state) => state.login);  
    const { reviews, count } = useSelector((state) => state.review);
    
    const { avgRatingById, ratingCountById } = useSelector(
    (state) => state.review
  );
    console.log(count)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviewByUserId());
    }, [dispatch]);

     useEffect(() => {
         reviews.forEach((review) => {
            if (review.businessId && review.businessId._id) {
                dispatch(getReviewAvgCount(review.businessId._id));
             }   
         }
            );
  }, [])

  return (
    <div className=" p-lg-5 ">
      <Row className="g-0">
        <Col lg={4} className="p-0">
          <div>
            <div className="border p-4 mb-3 rounded-lg relative ">
              <img
                src="/nature.jpg"
                alt=""
                className="rounded-lg w-full object-cover h-48"
              />
              <div className="absolute transform lg:-translate-x-1/4 md:-translate-x-32 sm:left-4 md:left-48  top-32 flex flex-col items-center z-10 ">
                {" "}
                {users && users.profilePic ? (
                                  <img
                
                                      src={`${filepath}/${users.profilePic}`}

                                        alt="Profile"   
                                      className="rounded-full w-[110px] h-[110px] border-4 border-lg bg-white object-contain"
                                  />
                              ) : (   
                                      <p>no image :(</p>
                                )}
                              {users && (<p className="font-semibold pt-3 ">{ users.name} </p>)}
                              
                                </div>
                        <div className="mt-5 pt-5">
                              <Row>
                                  <Col className="">
                                      <div className="flex  items-center  flex-col">
                                       <p className="text-center text-lg font-semibold pr-4  ">
                                  Posts    
                                          </p>
                                          <p className=" pr-4"> {count} </p>
                                      </div>
                                       <Link to='/editprofile' className="no-underline"><p className="border-2 p-2 text-center  rounded-lg   ">Edit Your Profile</p></Link>
                                  </Col>   
                                  

               </Row>
                          </div>
              </div>
                      <div>
                          <hr/>
          <p className="text-2xl flex gap-2 items-center p-3 "> <FaRegHeart className=" text-red-600 "/> <Link to='/fav' className="no-underline text-black">Favourites</Link> </p>
        </div> 
                    
                      
                  </div>
                  
                 
        </Col>


              
              <Col className='p-0'>
               <Container className='my-5 p-0'> 
      
        {
          reviews.map((e, i) => (
         
              
                  <div className="border p-lg-4 m-2 rounded-lg shadow-md bg-white text-black" key={i}>              
              <RecentActivityCard src1={`${filepath}/${e.userId.profilePic}`} text2={(
                e.businessId && e.businessId.name && (
                  <Link to={`/singleBusiness/${e.businessId._id}`} className="no-underline text-black">
                    <p className="m-1 text-xl"> {e.userId.fname} rated {e.businessId.name}</p>
                    <div className="space-x-2 mb-2 flex items-center">
                      <StarRating rating={avgRatingById[e.businessId._id] || 0} />

                      <span>
                        <strong>{avgRatingById[e.businessId._id]}</strong> ★
                      </span>
                      <span> ({ratingCountById[e.businessId._id]} ratings)</span>
                    </div>

                    <div className="flex"><div className="flex space-x-1">
                      <IoLocationOutline className="text-red-700 " />
                      <p>
                        {e.businessId.address && e.businessId.address.street}
                           
                      </p>
                    </div>

                    </div>
                  </Link>
                ) 
          )} text={e.comment} text1={<StarRating rating={e.rating}/>} text3={e.createdAt} images={e.images} businessId={e.businessId}/>
               </div>
      
          ))
        }
   
        </Container>
              
              </Col>
      
      </Row>
    </div>
  );
}

export default ViewYourProfile;
