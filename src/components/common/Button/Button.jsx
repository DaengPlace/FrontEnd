"use client";

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "next/image";

const Button = ({ isActive, onClick, children, hasImage, style }) => {
  return (
    <Wrapper style={style}>
      {hasImage && (
        <StyledImage
          src="/assets/common/dog.svg"
          alt="강아지 이미지"
          width={70}
          height={70}
        />
      )}
      <StyledButton $isActive={isActive} onClick={onClick} disabled={!isActive}>
        {children}
      </StyledButton>
    </Wrapper>
  );
};

Button.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  hasImage: PropTypes.bool,
};

Button.defaultProps = {
  isActive: false,
  hasImage: false,
};

export default Button;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  max-width: 600px;
  width: 100%;

  img {
    position: absolute;
    z-index: 1;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? "#ffffff" : "#999999")};
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : "#f2f2f2"};
  border: none;
  border-radius: 8px;
  cursor: ${({ isActive }) => (isActive ? "pointer" : undefined)};
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.colors.primaryHover : "#f2f2f2"};
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: -60px;
  right: 10px;
`;
