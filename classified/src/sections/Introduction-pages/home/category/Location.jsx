import React, { useState, useEffect } from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useSelector, useDispatch } from 'react-redux';
import { getReviewByBusiness } from '../../../../redux/store/actions/review-action';
const containerStyle = {
  width: '100%',
  height: '300px',
};


const defaultCenter = { lat: 18.9582, lng: 72.8321 }

// 

const MapFromApi = ({address}) => {
    const [coords, setCoords] = useState(null);

       useEffect(() => {
           const geocodeAddress = async () => {
        
               if (!address) return;

      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=AIzaSyDtAMzkkYNhgALJFrMbIDwrp4kFN7Xntno`
        );
        const data = await response.json();
        if (data.status === "OK") {
          setCoords(data.results[0].geometry.location);
        } else {
          console.error("Geocoding failed:", data.status);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    geocodeAddress();
       }, [address]);
    

 
    
    return (
        <>
            <p>Google Map : </p>  

           <LoadScript googleMapsApiKey="AIzaSyDtAMzkkYNhgALJFrMbIDwrp4kFN7Xntno">
                {
                    coords && ( <GoogleMap
        mapContainerStyle={containerStyle}
        center={coords || defaultCenter}
        zoom={coords ? 15 : 5}
      >
        {coords && <Marker position={coords} />}
      </GoogleMap>)
     }
    </LoadScript>
            

        </>
    )

}

export default MapFromApi