import React from "react";
import styled from "styled-components";
import { GoogleMap, Circle } from "@react-google-maps/api";

const MapBottomSheet = ({ center, address, closeBottomSheet }) => {
  return (
    <>
      <Overlay onClick={closeBottomSheet} />
      <BottomSheet>
        <BottomSheetHeader>
          <BottomSheetTitle>지도에서 보기</BottomSheetTitle>
          <CloseButton onClick={closeBottomSheet}>X</CloseButton>
        </BottomSheetHeader>
        <BottomSheetAddress>{address}</BottomSheetAddress>
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "70vh",
            borderRadius: "10px",
            marginTop: "40px",
          }}
          center={center}
          zoom={15}
        >
          <Circle
            center={center}
            radius={100}
            options={{
              fillColor: "#0019F4",
              fillOpacity: 0.2,
            }}
          />
        </GoogleMap>
      </BottomSheet>
    </>
  );
};

export default MapBottomSheet;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const BottomSheet = styled.div`
 position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 100vh;
  max-width: 90%;
  background: ${({ theme }) => theme.colors.defaultBackground};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  z-index: 1000;
  border-radius: 20px;
  animation: slideUp 0.3s ease-out forwards;

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
    }
    to {
      transform: translate(-50%, -50%);
    }
  }
`;

const BottomSheetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const BottomSheetTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  flex-grow: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const BottomSheetAddress = styled.p`
  margin-top: 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.divider};
  text-align: center;
`;
