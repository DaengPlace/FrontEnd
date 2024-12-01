import React from "react";
import styled from "styled-components";

const SubmitButton = ({ children }) => (
  <Button>{children}</Button>
);

export default SubmitButton;

const Button = styled.button`
  margin-left: 10px;
  margin-right: 10px;
  width: 557px;
  height: 50px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;
