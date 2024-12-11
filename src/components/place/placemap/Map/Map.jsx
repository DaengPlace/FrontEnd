"use client";
import React from "react";
import styled from "styled-components";
import { GoogleMap, Circle, Marker } from "@react-google-maps/api";
import { useRouter } from "next/navigation";

const Map = ({ center, zoom, userLocation, markers }) => {
  const router = useRouter();

  const categoryMapping = {
    미용: "서비스",
    반려동물용품: "서비스",
    위탁관리: "서비스",
    식당: "음식점",
    카페: "음식점",
    문예회관: "문화시설",
    박물관: "문화시설",
    미술관: "문화시설",
    여행지: "문화시설",
    동물병원: "의료시설",
    동물약국: "의료시설",
  };

  const getMarkerIcon = (category) => {
    const mainCategory = categoryMapping[category] || "기타"; 
    const iconUrls = {
      서비스: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      음식점: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      문화시설: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      의료시설: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
      기타: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png", 
    };

    return iconUrls[mainCategory];
  };

  const handleMarkerClick = (id) => {
    router.push(`/place/placedetail?placeId=${id}`);
  };
  
  return (
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
        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              title={marker.name}
              icon={getMarkerIcon(marker.category)}
              onClick={() => handleMarkerClick(marker.id)} 
            />
          ))}
      </GoogleMap>
    </MapContainer>
  );
};
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
