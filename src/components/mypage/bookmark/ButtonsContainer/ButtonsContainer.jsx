import React from "react";
import styled from "styled-components";
import { Map } from "@styled-icons/bootstrap";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRouter } from "next/navigation";

  const ButtonsContainer = ({showScrollToTop, buttonBottom}) => {

  const router = useRouter();

  const scrollToTop = () => {
    const container = document.getElementById("scrollable-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const userId = 1;

  const handleMapView = () => {
    router.push(`/mypage/bookmark/map?id=${userId}`);
  }

  return (
    <Container>
      <MapButton bottom={buttonBottom} onClick={handleMapView}>
        <MapIcon />지도 보기
      </MapButton>
      {showScrollToTop && (
        <ScrollToTopButton bottom={buttonBottom} onClick={scrollToTop}>
          <KeyboardArrowUpIcon sx={{ fontSize: 36, marginBottom:"-10px"}} />
          <span>맨위로</span>
        </ScrollToTopButton>
      )}
    </Container>
  );
};

export default ButtonsContainer;

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 600px;
  padding: 10px 0;
  z-index: 1000;
`;

const MapButton = styled.button`
  position: fixed;
  bottom: ${({ bottom }) => `${bottom}px`};
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 40px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const MapIcon = styled(Map)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: ${({ bottom }) => `${bottom}px`}; 
  right: calc(50% - 280px); 
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
  
  span {
    margin-bottom: 10px;
  }
`;