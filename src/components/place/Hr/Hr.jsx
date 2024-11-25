import React from "react";
import styled from "styled-components";

const Hr = () => {
  return <StyledHr />;
};

export default Hr;

const StyledHr = styled.hr`
  width: 100%;
  margin-left: 8px;
  margin-bottom: 10px;
  color: #ababab;
  border: none;
  border-top: 1px solid #ababab;
`;
