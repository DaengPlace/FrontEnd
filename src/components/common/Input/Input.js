import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Input = ({ placeholder, value, onChange, type, ...props }) => {
  const [error, setError] = useState("");

  const validateInput = (value) => {
    if (type === "birthdate") {
      if (!/^\d{6}$/.test(value)) {
        setError("생년월일은 6자리 숫자여야 합니다. (예: 000101)");
        return false;
      }
    } else if (type === "phone") {
      if (!/^\d{3}-\d{4}-\d{4}$/.test(value)) {
        setError("휴대폰 번호는 010-0000-0000 형식이어야 합니다.");
        return false;
      }
    } else if (type === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setError("올바른 이메일 형식이어야 합니다. (예: daengplace@gmail.com)");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    validateInput(inputValue);
    onChange(e);
  };

  return (
    <Wrapper>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        isValid={!error}
        maxLength={type === "text" ? 10 : undefined}
        {...props}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "birthdate", "phone", "email"]),
};

Input.defaultProps = {
  placeholder: "텍스트 입력",
  value: "",
  type: "text",
};

export default Input;

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border: 1px solid ${(props) => (props.isValid ? "#ccc" : "red")};
  border-radius: 10px;
  font-size: 14px;
  color: #333;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: ${(props) => (props.isValid ? "#3e3e3e" : "red")};
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 5px;
  display: block;
`;
