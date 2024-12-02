import React from "react";
import styled from "styled-components";
import BigFacilityCard from "../BigFacilityCard/BigFacilityCard";

const ScrollableContainer = ({facilities, toggleLike, bottomRef}) => {
  return (
    <Container id="scrollable-container">
      {facilities.map((fac) => (
        <BigFacilityCard key={fac.id} fac={fac} toggleLike={toggleLike} />
      ))}
      <Space />
    </Container>
  );
};

export default ScrollableContainer;

const Container = styled.div`
  width: 90%;
  overflow-y: auto;
  height: 100vh;
  padding-top: 20px;
  padding-bottom: 20px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Space = styled.div`
  height: 30px;
`;