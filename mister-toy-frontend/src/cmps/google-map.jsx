import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '30px' }}>{text}</div>;
const Loc1 = ({ text }) => <div style={{ fontSize: '30px' }}>{text}</div>
const Loc2 = ({ text }) => <div style={{ fontSize: '30px' }}>{text}</div>
export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 9

    const handleClick = ({ lat, lng }) => {
        console.log(lat, lng)
        setCoordinates({ lat, lng })
    }

    return (
        <div style={{ height: '70vh', width: '90%', margin: 'auto' }}>
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
                    text="📍"
                />
                <Loc1
                    lat={32.3853}
                    lng={34.8818}
                    text="📍"
                />
                <Loc2
                    lat={32.2853}
                    lng={34.9818}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
    );
}