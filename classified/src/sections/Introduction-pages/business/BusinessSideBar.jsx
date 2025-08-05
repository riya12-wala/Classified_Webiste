import React, { useEffect } from "react";
import { Sidebar, Menu } from "react-pro-sidebar";
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBusinessById } from "../../../redux/store/actions/business-action";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaCalendarAlt, FaUserEdit, FaUsers, FaLayerGroup, FaRupeeSign, FaBuilding } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoIosBusiness } from "react-icons/io";


function BusinessSideBar({ toggled, setToggled }) {
  const { business } = useSelector((state) => state.business);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBusinessById(id));
  }, [dispatch, id]);

  const InfoRow = ({ icon: Icon, title, value, missing ,to}) => (
    <div className="flex justify-between items-center border-b py-3 px-4">
          <Link to={to} className="no-underline text-inherit">
              <div className="flex items-start gap-3">
        <Icon className="text-xl text-blue-500" />
        <div>
          <p className="text-sm font-medium text-gray-600 m-0">{title}</p>
          <p className="text-black text-sm font-semibold">
            {value || <span className="text-red-600">Missing Info</span>}
          </p>
        </div>
      </div>
      </Link>
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", direction: "rtl" }}>
        <Sidebar
          onBackdropClick={() => setToggled(false)}
          toggled={toggled}
          breakPoint="all"
          rtl
          className="bg-white w-[100%] sm:w-[400px]"
        >
          <h2 className="text-lg font-bold px-4 py-3 border-b">Business Profile</h2>
          <Menu transitionDuration={300}>
            <InfoRow
              icon={IoIosBusiness}
              title="Business Name"
                          value={business?.name} 
                          to={`/editbusiness/${id}/businessname`}
            />
            <InfoRow
              icon={FaPhoneAlt}
              title="Contact Details"
                          value={business?.contact?.phone?.[0]}
                          to={`/editbusiness/${id}/contact`}
            />
            <InfoRow
              icon={FaMapMarkerAlt}
              title="Business Address"
                          value={business?.address?.compAdd}
                           to={`/editbusiness/${id}/businessaddress`}
            />
            <InfoRow
              icon={FaClock}
              title="Business Timings"
                          value={business?.businessHours?.opensAt ? `Opens at ${business.businessHours.opensAt}` : null}
                           to={`/editbusiness/${id}/businesstiming`}
            />
            <InfoRow
              icon={FaCalendarAlt}
              title="Year of Establishment"
                          value={business?.yearofestablishment}
                         to={`/editbusiness/${id}/additiondata`}
            />
            <InfoRow
              icon={FaLayerGroup}
              title="Business Categories"
              value={business?.category?.cat_name}
            />
            <InfoRow
              icon={FaRupeeSign}
              title="Yearly Turnover"
                          value={business?.turnover}
                           to={`/editbusiness/${id}/additiondata`}
            />
            <InfoRow
              icon={FaUsers}
              title="Number of Employees"
                          value={business?.noofemployee}
                           to={`/editbusiness/${id}/additiondata`}
            />
          </Menu>
        </Sidebar>
        <main className="flex-1"></main>
      </div>
    </div>
  );
}

export default BusinessSideBar;