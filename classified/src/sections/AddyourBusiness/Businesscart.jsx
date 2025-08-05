import React from "react";
import { getBusinessFilter } from "../../redux/store/actions/business-action";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import HomeButton from "../../component/HomeButton";
import person from "./hand.avif";
import cart from "./cart.webp";
import BusinessListFav from "../../component/BusinessListFav";
import { VscBlank } from "react-icons/vsc";
function Businesscart() {
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
    <Container>
      <Row className="flex justify-center items-center min-h-screent p-5" lg={2} xs={1}>
        <Col className="flex justify-center items-center">
          <img src={cart} alt="" srcset="" className="h-9/10 w-1/2 ml-5" />
        </Col>
        <Col>
          <div>
            
            <p>{error}</p>

            {/* {business?.name} */}

            {Array.isArray(business) && business.length > 0 && 
                        
            (<h1>Select Your Business</h1>) &&
              business.map((business, index) => (
                <>
                 <BusinessListFav  src={ business.images && business.images.length > 0 
                             ? `${filepath}/${business.images[0]}`
                    : person} name={business.name}
                   address={
        business.address && business.address.street
          && business.address.street
         
      }
                  />
                </>
              ))}

            <br></br>

            <Link to="/addbusiness">
              <button className="bg-red-700 border text-white p-3  w-full mt-5">
                Add Your Business
              </button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Businesscart;
