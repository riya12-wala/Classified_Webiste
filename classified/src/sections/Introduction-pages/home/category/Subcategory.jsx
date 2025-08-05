import React from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubcategory } from '../../../../redux/store/actions/category-action';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import Heading from '../../../../component/Heading';
import { useEffect } from 'react';
import BusinessListing from './BusinessListing';
function Subcategory() {
  const { categoryName } = useParams();

    const dispatch = useDispatch();
    const { subcategories, loading } = useSelector(state => state.category);
    const navigate = useNavigate();
  useEffect(() => {
    dispatch(getSubcategory(categoryName)); // <-- Fetch based on URL param
  }, [dispatch, categoryName]);


  const handleSubCategoryClick = (subcat) => {
    navigate(`/businesslist/${subcat.sub_category}`)
  }
 
      
          
          <Heading text={`Subcategories of '${categoryName}' `} />
         {/* Subcategory section */}
        
      if(loading)  {
      return (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" />
        </div>
      );
      }
        
        if (subcategories.length === 0) {
        // No subcategories --> Open Business Listing page directly
          return <BusinessListing />;
    }   
        

      
    return (
      <Container className='my-5'>
          <Heading text={`Subcategories of '${categoryName}'`} />
          <Row md={2} className='g-3'>
              {subcategories.map((subcat, idx) => (
                  <Col key={idx}>
                  <div
                    style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', textAlign: 'center' }}
                  onClick={()=>{handleSubCategoryClick(subcat)}}
                  >
                          {subcat.sub_category}
                      </div>
                  </Col>
              ))}
          </Row>
      </Container>
  );
  
}

export default Subcategory
