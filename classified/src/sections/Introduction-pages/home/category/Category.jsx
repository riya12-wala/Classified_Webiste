import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getCategory } from '../../../../redux/store/actions/category-action';
import Heading from '../../../../component/Heading';
import CategoryCard from './CategoryCard';
import { Row, Col, Container ,Spinner} from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Category() {

  const dispatch = useDispatch();
  const { categories, loading , subcategories} = useSelector(state => state.category)
  const { filepath } = useSelector(state => state.login)
  const navigate = useNavigate();
  

 
  
  console.log(categories)
  useEffect(() => {
    dispatch(getCategory());
  }, [])


 

  const handleCategoryClick = (category) => {
    navigate(`/subcategory/${category}`);// Fetch subcategories on click
  };

  

  return (
 

    <Container className='my-5'>
      <Heading text='Categories' />
      
      {/* Category section */}
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <Row md={6} className='g-4' style={{ display: 'flex', justifyContent: 'center' }}>
          {categories && categories.map((category, idx) => (
            <Col key={idx}>
              <CategoryCard 
                head={category.cat_name}
                src={`${filepath}/${category.Icon}`}
                onClick={() => handleCategoryClick(category.cat_name)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>



  )
}

export default Category
