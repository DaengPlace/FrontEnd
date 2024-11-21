import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
  ({ placeholder, type, isValid, ...rest }, ref) => {
    return (
      <StyledInput
        ref={ref}
        placeholder={placeholder}
        type={type}
        $isValid={isValid}
        {...rest}
      />
    );
  }
);

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  isValid: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: "텍스트 입력",
  type: "text",
  isValid: true,
};

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
  &:focus {
    outline: none;
  }
`;
