import React from "react";
import styled from "styled-components";
import BigFacilityCard from "../BigFacilityCard/BigFacilityCard";

const ScrollableContainer = ({facilities, toggleLike, bottomRef}) => {
  return (
    <Container id="scrollable-container">
      {facilities.map((fac) => (
        <BigFacilityCard key={fac.id} fac={fac} toggleLike={toggleLike} />
      ))}
      <div ref={bottomRef} style={{ height: "1px" }}></div>
    </Container>
  );
};

export default ScrollableContainer;

const Container = styled.div`
  overflow-y: auto;
  height: calc(100vh - 65px);
  padding-bottom: 70px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;