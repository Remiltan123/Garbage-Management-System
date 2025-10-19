import React, { useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { GetCollectorLocation } from "./GetCollecterLocation/GetCollecterLocation";
import { CollectorDetails } from "./GetCollecterInfo/GetCollecterInfo";

export const CollectorRegister: React.FC = () => {
  const [startLocation, setStartLocation] = useState<[number, number] | null>(null);
  const [endLocation, setEndLocation] = useState<[number, number] | null>(null);
 
  return (
    <div style={{ height: "100vh", padding: "20px" }}>
        <GetCollectorLocation setStartLocation={setStartLocation}
        setEndLocation={setEndLocation}/>

        {startLocation && endLocation && (
        <CollectorDetails
          startLocation={startLocation}
          endLocation={endLocation}
        />
      )}
        
    </div>
  );
};


