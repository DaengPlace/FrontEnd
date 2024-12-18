"use client";

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Image from "next/image";

const Button = ({
  isActive,
  onClick,
  children,
  hasImage,
  style,
  className,
  type = "button",
  disabled = false,
}) => {
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
      <StyledButton
        $isActive={isActive}
        onClick={onClick}
        type={type}
        className={className}
        disabled={disabled}
      >
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
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  isActive: false,
  hasImage: false,
  type: "button",
  disabled: false,
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

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive" && prop !== "disabled",
})`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ $isActive, disabled }) =>
    disabled ? "#999999" : $isActive ? "#ffffff" : "#999999"};
  background-color: ${({ $isActive, theme, disabled }) =>
    disabled ? "#f2f2f2" : $isActive ? theme.colors.primary : "#f2f2f2"};
  border: none;
  border-radius: 8px;
  cursor: ${({ $isActive, disabled, className }) =>
    disabled
      ? "default"
      : $isActive || ["cancel", "edit"].includes(className)
      ? "pointer"
      : undefined};
  transition: all 0.3s ease;

  word-wrap: break-word;
  white-space: normal;
  text-align: center;

  &:hover {
    background-color: ${({ $isActive, theme, disabled }) =>
      disabled ? "#f2f2f2" : $isActive ? theme.colors.primaryHover : "#f2f2f2"};
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #999999;
  }
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: -60px;
  right: 10px;
`;
