"use client";
import React from "react";
import styled from "styled-components";
import { GoogleMap, Circle } from "@react-google-maps/api";

const Map = ({ center, zoom, userLocation }) => (
  <MapContainer>
    <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={zoom}>
      {userLocation && (
        <Circle
            center={userLocation}
            radius={100} 
            options={{
            strokeColor: "#007bff", 
            strokeOpacity: 0.8, 
            strokeWeight: 2, 
            fillColor: "#007bff",
            fillOpacity: 0.2, 
            }}
        />
      )}
    </GoogleMap>
  </MapContainer>
);

export default Map;

const MapContainer = styled.div`
  flex: 1;
  background: #f2f2f2;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  height: 650px;
  position: relative;
  padding: 0;
  overflow: hidden;
`;
