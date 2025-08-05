import React, { useEffect } from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import RecentActivityCard from './RecentActivityCard'
import blogAuthor from './blog-author-2.jpg'
import blog from './blog-4.jpg'
import Heading from '../../../../component/Heading'
import { useDispatch,useSelector } from 'react-redux'
import { getReview } from '../../../../redux/store/actions/review-action'
import StarRating from '../../../../component/StarComponent'

function RecentActivity() {

  const { filepath } = useSelector(state => state.login)
  const { reviews } = useSelector(state => state.review)
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getReview({ page: 1, limit: 9 }))
  },[dispatch])

 
   
  return (
    <div>

          
          <div className='text-center m-5'>
             <Heading text='Recent Activity'/>
          </div>
       <Container className='my-5'> 
      <Row xs={1} xl={3} className='g-0' >
        {
          reviews.map((e, i) => (
            // <Col key={i}>
             <div className='grid'>
  <RecentActivityCard src1={`${filepath}/${e.userId.profilePic}`} text2={e.userId.name} text={ <p className="truncate-comment">
      {e.comment}
    </p>} text1={<StarRating rating={e.rating}/>} text3={e.createdAt} images={e.images} businessId={e.businessId}/>
               </div>
        // </Col>
          ))
        }
        </Row>
        </Container>
    </div>
  )
}

export default RecentActivity
