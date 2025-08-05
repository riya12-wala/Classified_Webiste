import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBusiness,
  getBusinessById,
  similarBusiness,
} from "../../../../redux/store/actions/business-action";
import { getReviewAvgCount } from "../../../../redux/store/actions/review-action";
import ImageLightGallery from "./ImageLightGallery";
import { Row, Col, Container } from "react-bootstrap";
import { IoLocationOutline, IoCallOutline } from "react-icons/io5";
import StarRating from "../../../../component/StarComponent";
import NavTab from "./Navs&tab";
import YetAnotherPhoto from "./Photos";
import Review from "./Review";
import { TbWorld } from "react-icons/tb";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import MapFromApi from "./Location";
import { IoIosAlert } from "react-icons/io";
import { FaCaretRight } from "react-icons/fa";
import { GiStethoscope } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { Saved } from "../../../../redux/store/actions/user-action";
import BusinessListFav from "../../../../component/BusinessListFav";
import { includes } from "lodash";

const SingleBusinessListing = () => {
  const { id } = useParams();
  const { filepath } = useSelector((state) => state.login);
  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const name = queryParams.get("name");
  const address = queryParams.get("address");

  const [copied, setCopied] = useState(false);
  const dispatch = useDispatch();
  const { savedmsg } = useSelector((state) => state.login);
  const { business, similarbusiness } = useSelector((state) => state.business);

  const { avgRatingById, ratingCountById } = useSelector(
    (state) => state.review
  );
  const normal = Array.isArray(business) ? business[0] : business;
  // console.log(normal);

  const handleCopy = () => {
    navigator.clipboard.writeText(normal.address.compAdd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset after 2 seconds
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(getBusinessById(id));
    } else if (name && address) {
      dispatch(getBusiness({ name, address }));
    }
  }, [dispatch, name, address, id]);

  useEffect(() => {
    if (normal?.sub_category?.length > 0) {
      const subCategoryId = normal.sub_category[0]._id;
      dispatch(similarBusiness(subCategoryId));
    }
  }, [dispatch, normal]);

  useEffect(() => {
    if (id) {
      dispatch(getReviewAvgCount(id));
    } else {
      dispatch(getReviewAvgCount(normal?._id));
    }
  }, [dispatch, id, normal]);

  const addToFavourites = async (businessId) => {
    try {
      const result = await dispatch(Saved({ businessId })).unwrap();
      alert("Business saved successfully");
    } catch (err) {
      alert("Business already saved");
    }
  };

  return (
    <div>
      {normal ? (
        <div>
          <ImageLightGallery images={normal.images} />

          <Container fluid>
            <Row>
              <Col lg={8}>
                <Container>
                  <div className="p-lg-4">
                    <Row className="flex items-center">
                      <Col lg={2}>
                        <img
                          src={
                            normal.images &&
                            normal.images.length > 0 &&
                            `${filepath}/${normal.images[0]}`
                          }
                          alt=""
                          className="h-[150px] w-[200px] rounded-lg object-cover "
                        />
                      </Col>
                      <Col>
                        <div className="flex ">
                          <h1 className="font-sans">
                            {normal.name}{" "}
                            {normal?.contact?.contactPerson &&
                              ` - ${normal?.contact?.contactPerson}`}
                          </h1>
                        </div>

                        <div className="space-x-2 mb-2 flex items-center">
                          <StarRating rating={avgRatingById[normal._id] || 0} />

                          <span>
                            <strong>{avgRatingById[normal._id]}</strong> ★
                          </span>
                          <span> ({ratingCountById[normal._id]} ratings)</span>
                        </div>

                        <div className="flex text-2xl space-x-1">
                          <IoLocationOutline className="text-red-700 " />
                          <p>
                            {normal.address && normal.address.street},
                            {normal.address && normal.address.city}{" "}
                            {normal.address && normal.address.state}{" "}
                          </p>
                        </div>

                        <div className="flex items-center flex-wrap gap-2 m-0">
                          <a className="bg-red-600 rounded-sm p-2 no-underline  text-white flex items-center gap-2 ">
                            <IoCallOutline className="text-white text-xl " />
                            {normal.contact && normal.contact.phone[0]}
                          </a>

                          {normal.contact?.whatsapp && (
                            <div className="bg-slate-300 gap-2 p-2 flex">
                              <img
                                src="/squarewhatsapp_icon.svg"
                                alt="image present"
                                srcset=""
                              />{" "}
                              <p className="mb-0"> {normal.contact.whatsapp}</p>
                            </div>
                          )}

                          {normal?.category?.cat_name === "Restuarants" &&
                            normal.noofemployee && (
                              <p className="m-0">
                                Staff in Total - {normal.noofemployee}
                              </p>
                            )}

                          {normal?.category?.cat_name === "Education" &&
                            normal.noofemployee && (
                              <p className="m-0">
                                Teacher availability - {normal.noofemployee}
                              </p>
                            )}

                          {normal?.category?.cat_name === "Hospitals" &&
                            normal.noofemployee && (
                              <p className="m-0 flex items-center gap-2">
                                <GiStethoscope className="text-blue-500 text-2xl" />{" "}
                                {normal.noofemployee} Doctor Available{" "}
                              </p>
                            )}

                          {normal?.category?.cat_name === "Restuarants" &&
                            normal.costfortwo && (
                              <p className="m-0">
                                Cost Price For Two is - ₹ {normal.costfortwo}
                              </p>
                            )}

                          {normal?.category?.cat_name === "Education" &&
                            normal.costfortwo && (
                              <p className="m-0">
                                Annual Fee is - ₹ {normal.costfortwo}
                              </p>
                            )}

                          {normal?.category?.cat_name === "Hospitals" &&
                            normal.costfortwo && (
                              <p className="m-0">
                                Consultant Fee is - ₹ {normal.costfortwo}
                              </p>
                            )}

                          {normal?.category?.cat_name === "Gym" &&
                            normal.costfortwo && (
                              <p className="m-0">
                                {" "}
                                Starting At- ₹ {normal.costfortwo}
                              </p>
                            )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="p-lg-4">
                    <NavTab
                      text1="Quick Info"
                      text2="Photos"
                      text3="Reviews"
                      text4="Services"
                    />

                    <div id="quickinfo" className="p-8 bg-gray-100">
                      <h2 className="text-2xl font-bold">Quick Information</h2>
                      <p> {normal.description}</p>
                    </div>

                    <div id="photos" className="p-lg-8">
                      <h2 className="text-2xl font-bold">Photos</h2>

                      <div className="flex flex-wrap">
                        <YetAnotherPhoto media={normal.images} />
                      </div>
                    </div>

                   {normal.category &&
  normal?.category?.cat_name &&
  normal.category.cat_name.trim().toLowerCase() === "restuarants" &&
  Array.isArray(normal.menu) &&
  normal.menu.length > 0 && (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Menu</h2>
      <YetAnotherPhoto media={normal.menu} />
    </div>
)}

              {normal?.category?.cat_name &&
  ["gym", "hospitals", "education"].includes(
    normal.category.cat_name.trim().toLowerCase()
  ) &&
  Array.isArray(normal.menu) &&
  normal.menu.length > 0 && (
    <div className="p-8">
      <h2 className="text-2xl font-bold">Brochures</h2>
      <YetAnotherPhoto images={normal.menu} />
    </div>
)}



                    <div id="review" className="p-lg-8 ">
                      <h2 className="text-2xl font-bold">Reviews</h2>

                      <Review />
                    </div>

                    <div id="services" className="p-2 ">
                      <h2 className="text-2xl font-bold">Location & hours</h2>
                      {/* google map api:   AIzaSyDtAMzkkYNhgALJFrMbIDwrp4kFN7Xntno */}
                      <Row xs={1} lg={2}>
                        <Col>
                          {" "}
                          {normal?.address?.compAdd && (
                            <MapFromApi address={normal.address.compAdd} />
                          )}
                        </Col>
                        <Col>
                          <p>Opening hours : </p>

                          {normal.businessHours && (
                            <div>
                              <p>
                                {normal.businessHours.opensAt}{" "}
                                {normal.businessHours.opensAt == "Open 24 Hours"
                                  ? "Open 24 Hours"
                                  : ` - ${normal.businessHours.closesAt}`}{" "}
                              </p>
                            </div>
                          )}
                          <div className="flex flex-wrap">
                            {normal.workingDays &&
                              normal.workingDays.length > 0 &&
                              normal.workingDays.map((e) => (
                                <p className="bg-red-600 text-white p-2 text-xl ">
                                  {e}
                                </p>
                              ))}
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="m-3">
                      <h2>Amenities & More</h2>

                      {normal.yearofestablishment && (
                        <div className="p-8 bg-gray-100">
                          <h3>Year of establishment</h3>
                          <p>{normal.yearofestablishment}</p>
                        </div>
                      )}

{Array.isArray(normal.facilities) && normal.facilities.length > 0 && (
  <div className="m-4">
    <h4>Facilities</h4>
    <div className="flex gap-20">
      {/* First half */}
      <ul>
        {normal.facilities
          .slice(0, Math.ceil(normal.facilities.length / 2))
          .map((e, i) => (
            <li key={i} className="m-0 flex items-center">
              <FaCaretRight /> {e}
            </li>
          ))}
      </ul>

      {/* Second half */}
      <ul>
        {normal.facilities
          .slice(Math.ceil(normal.facilities.length / 2))
          .map((e, i) => (
            <li key={i + 100} className="m-0 flex items-center">
              <FaCaretRight /> {e}
            </li>
          ))}
      </ul>
    </div>
  </div>
)}

                      {Array.isArray(normal.knownfor) && normal.knownfor.length > 0 && (
  <div className="m-4">
    <h4>Known For</h4>
    <div className="flex flex-wrap gap-lg-20">
      {/* First half */}
      <ul>
        {normal.knownfor
          .slice(0, Math.ceil(normal.knownfor.length / 2))
          .map((e, i) => (
            <li key={i} className="m-0 flex items-center">
              <FaCaretRight /> {e}
            </li>
          ))}
      </ul>

      {/* Second half */}
      <ul>
        {normal.knownfor
          .slice(Math.ceil(normal.knownfor.length / 2))
          .map((e, i) => (
            <li key={i + 100} className="m-0 flex items-center">
              <FaCaretRight /> {e}
            </li>
          ))}
      </ul>
    </div>
  </div>
)}

                        
                      {
                        Array.isArray(normal.sub_category) &&
  normal.sub_category.some(sub => sub.sub_category === 'School')  && (
                          <>
                              <div className="">
                        {normal.board.length > 0  && (
                          <div className="m-4">
                            <h4>Board</h4>

                            <ul>
                            {normal.board.map((e) => (
                                <li className="m-0 flex items-center">
                                  <FaCaretRight /> {e}
                                </li>
                            ))}
                            </ul>
                          </div>
                        )}
                      </div>
                       <div>
                        {normal.typeofschool.length > 0  && (
                          <div className="m-4">
                            <h4>Type Of school</h4>

                            <ul>
                            {normal.typeofschool.map((e) => (
                                <li className="m-0 flex items-center">
                                  <FaCaretRight /> {e}
                                </li>
                            ))}
                            </ul>
                          </div>
                        )}
                      </div>
                          </>
                        )
                      }
                      

                        {
                        Array.isArray(normal.sub_category) &&
  normal.sub_category.some(sub => sub.sub_category === 'Colleges')  && (
                          <>
                              <div className="">
                        {normal.stream &&  normal.stream.length > 0  && (
                          <div className="m-4">
                            <h4>Stream</h4>

                            <ul>  
                            {normal.stream && normal.stream.map((e) => (
                                <li className="m-0 flex items-center">
                                  <FaCaretRight /> {e}
                                </li>
                            ))}
                            </ul>
                          </div>
                        )}
                      </div>
                       <div>
                        {normal.typeofschool.length > 0  && (
                          <div className="m-4">
                            <h4>Type Of school</h4>

                            {normal.typeofschool.map((e) => (
                              <ul>
                                <li className="m-0 flex items-center">
                                  <FaCaretRight /> {e}
                                </li>
                              </ul>
                            ))}
                          </div>
                        )}
                      </div>
                          </>
                        )
                     }

                     
                      
                      
                    </div>
                  </div>
                </Container>
              </Col>

              <Col className="sticky top-30  p-3">
                <div
                  className="flex items-center p-4 gap-2 cursor-pointer "
                  onClick={() => {
                    addToFavourites(normal._id);
                  }}
                >
                  <FaRegHeart className="text-xl text-red-600" />{" "}
                  <p className="m-0">Saved to Favourites </p>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4 space-y-4 w-full ">
                  {/* Contact Section */}
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Contact</h2>
                    <div className="flex items-center text-blue-600 space-x-2">
                      <BsFillTelephoneFill />
                      <a
                        href={`tel:${normal.contact.phone[0]}`}
                        className="text-black no-underline"
                      >
                        {normal.contact && normal.contact.phone[0]}
                      </a>
                    </div>
                  </div>
                  <hr />
                  {/* Address Section */}
                  <div>
                    <h2 className="font-semibold text-lg mb-2">Address</h2>
                    <p className="text-sm text-gray-700">
                      {normal?.address?.compAdd}
                    </p>
                    <div className="flex items-center justify-between mt-2 text-blue-600 text-sm">
                      <a
                        className="flex items-center gap-1 hover:underline"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          normal?.address?.compAdd
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* <img src="/map-icon.svg" alt="" className="w-4 h-4" /> */}
                        Get Directions
                      </a>
                      <button
                        className="flex items-center gap-1 transition duration-500 hover:underline"
                        onClick={handleCopy}
                      >
                        {/* <img src="/copy-icon.svg" alt="" className="w-4 h-4" /> */}
                        {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                  </div>

                  {/* Hours Section */}
                  <div className="flex items-center text-sm gap-2 text-green-600">
                    <FaClock />
                    <span className="font-semibold">Opens at</span>
                    <span className="text-gray-800">
                      {normal.businessHours.opensAt}
                    </span>
                  </div>

                  <div>
                    {normal.contact.email && (
                      <p>Email : {normal.contact.email}</p>
                    )}
                    <hr />
                    {normal.contact.website && (
                      <p className="flex items-center  gap-2">
                        <TbWorld className="text-blue-500 text-2xl" />
                        <a
                          href={`http://${normal.contact.website}`}
                          target="_blank"
                          className="text-black no-underline"
                        >
                          {normal.contact.website}
                        </a>
                      </p>
                    )}
                  </div>

                  <div></div>
                </div>
                <div className="flex items-center p-4 gap-2">
                  <IoIosAlert className="text-2xl" />
                  <h4>Similar Business </h4>
                </div>

                <div className="flex flex-col mr-4">
                  {similarbusiness
                    .filter((e) => e._id !== normal._id)
                    .slice(0, 3)
                    .map((e, i) => (
                      <BusinessListFav
                        key={i}
                        link={`/singleBusiness/${e._id}`}
                        address={
                          e.address && e.address.street && e.address.street
                        }
                        name={e.name}
                        src={
                          e.images && e.images.length > 0
                            ? `${filepath}/${e.images[0]}`
                            : person
                        }
                      />
                    ))}
                </div>

                <div></div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <Container fluid className="flex flex-col justify-center items-center">
          <img
            src="/error.jpg"
            alt="business not found"
            className="w-3/5 h-3/5"
          />
        </Container>
      )}
    </div>
  );
};

export default SingleBusinessListing;
