import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text}) => <div style={{fontSize:'30px'}}>{text}</div>;
const AnyReactComponents = ({ text}) => <div style={{fontSize:'30px'}}>{text}</div>;

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 11

    const handleClick = ({lat , lng}) => {
        console.log(lat , lng)
        setCoordinates({lat , lng})
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '70vh', width: '90%', margin: 'auto'}}>
            <GoogleMapReact
                onClick={handleClick}
                yesIWantToUseGoogleMapApiInternals
                bootstrapURLKeys={{ key: "AIzaSyCeWUwjnr3j9Y-ufnPEzoVIjqf5GtvXNnk" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    {...coordinates}
                    text="📌"
                    />
                <AnyReactComponents                   
                    lat = {32.772}
                    lng = {35.01}
                    text="📌"
                />
            </GoogleMapReact>
        </div>
    );
}