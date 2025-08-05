



import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getBusiness } from "../../../../redux/store/actions/business-action";
import { getReviewAvgCount } from "../../../../redux/store/actions/review-action";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { Col, Row } from "react-bootstrap";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import "leaflet/dist/leaflet.css";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import StarRating from "../../../../component/StarComponent";
import Filter from "./Filter";

function BusinessListing() {
  const dispatch = useDispatch();
  const { business } = useSelector((state) => state.business);
  const { avgRatingById, ratingCountById } = useSelector((state) => state.review);
  const { filepath } = useSelector((state) => state.login);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const cat_name = queryParams.get("cat_name");
  const sub_cat = queryParams.get("sub_cat");
  const address = queryParams.get("address");

  const { categoryName, subCategoryName } = useParams();

  // Initial fetch based on category/subcategory/address
  useEffect(() => {
    const filters = {
      ...(categoryName && { cat_name: categoryName }),
      ...(subCategoryName && { sub_cat: subCategoryName }),
      ...(cat_name && { cat_name }),
      ...(sub_cat && { sub_cat }),
      ...(address && { address }),
    };

    if (Object.keys(filters).length > 0) {
      dispatch(getBusiness(filters));
    }
  }, [dispatch, categoryName, subCategoryName, cat_name, sub_cat, address]);

  // Fetch average review data
  useEffect(() => {
    if (business.length > 0) {
      business.forEach((b) => {
        dispatch(getReviewAvgCount(b._id));
      });
    }
  }, [dispatch, business]);


  const arrowStyles = {
  cursor: 'pointer',
  fontSize: '2rem',
  color: '#fff',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '50%',
  padding: '4px',
  zIndex: 2,
};

const properties = {
  easing: 'ease',
  autoplay: false,
  prevArrow: (
    <div style={{ ...arrowStyles, marginRight: '10px' }}>
      <FaArrowAltCircleLeft />
    </div>
  ),
  nextArrow: (
    <div style={{ ...arrowStyles, marginLeft: '10px' }}>
      <FaArrowAltCircleRight />
    </div>
  ),
};

  

  return (
    <div>
      <Row>
        <Col lg={3}>
          <Filter
            categoryName={categoryName}
            subCategoryName={subCategoryName}
            address={address}
          />
        </Col>

        <Col md={8} className="p-lg-2">
          <h2>
            Businesses under {categoryName} {subCategoryName}
          </h2>

          {business.length > 0 ? (
            business.map((b, index) => (
              <div
                key={index}
                style={{
                  padding: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  borderRadius: "3px",
                }}
              >
                <div className="flex flex-wrap items-center px-2">
                  <div>
                    {b.images && b.images.length > 0 ? (
                      <div className="slide-container" style={{ width: "250px", margin: "auto" }}>
                        <Slide {...properties}>
                          {b.images.map((img, i) => (
                            <div key={i}>
                              <img
                                src={`${filepath}/${img}`}
                                alt=""
                                style={{ height: "180px", width: "100%", objectFit: "cover" }}
                              />
                            </div>
                          ))}
                        </Slide>
                      </div>
                    ) : (
                      <p>No image available</p>
                    )}
                  </div>

                  <div>
                    <Link to={`/singleBusiness/${b._id}`} className="no-underline text-inherit">
                      <h2 className="font-serif">{b.name}</h2>
                      <p className="flex gap-2 items-center">
                        <IoLocationOutline className="text-red-700" />
                        {b.address?.state} {b.address?.city} {b.address?.street}
                      </p>

                      <div className="flex items-center gap-2 mb-2">
                        <StarRating rating={avgRatingById[b._id] || 0} />
                        <span>
                          <strong>{avgRatingById[b._id]}</strong> ★
                        </span>
                        <span>({ratingCountById[b._id]} ratings)</span>
                      </div>

                      <div className="space-x-3">
                        {b.businessHours?.closesAt && <p>Open until {b.businessHours.closesAt}</p>}

                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${b.contact.phone[0]}`}
                            className="bg-red-600 text-white p-2 flex gap-2 rounded no-underline"
                          >
                            <IoCallOutline className="text-xl" />
                            {b.contact?.phone[0]}
                          </a>

                          {b.contact?.whatsapp && (
                            <div className="bg-slate-300 gap-2 p-2 flex items-center">
                              <img src="/squarewhatsapp_icon.svg" alt="whatsapp" />
                              <p className="mb-0">{b.contact.whatsapp}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3 m-2">
                          {b.knownfor.slice(0, 3).map((e, i) => (
                            <div key={i} className="border rounded-lg p-2 text-sm">
                              {e}
                            </div>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center">
              <img src="/error.jpg" alt="business not found" className="w-3/5 h-3/5" />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default BusinessListing;
