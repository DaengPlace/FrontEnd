import React from "react";
import styled from "styled-components";

const Hr = () => {
  return <StyledHr />;
};

export default Hr;

const StyledHr = styled.hr`
  width: 100%;
  padding : 0 1.25rem;
  margin-bottom: 10px;
  color: #ababab;
  border: none;
  border-top: 1px solid #ababab;
`;
