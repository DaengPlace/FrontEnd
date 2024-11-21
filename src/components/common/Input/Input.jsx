import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const Input = ({
  placeholder,
  name,
  type,
  rules,
  control,
  error,
  validate,
}) => {
  return (
    <Wrapper>
      <Controller
        name={name}
        control={control}
        rules={{
          ...rules,
          validate: validate,
        }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <StyledInput
            ref={ref}
            value={value || ""}
            onChange={(e) => {
              onChange(e);
            }}
            onBlur={onBlur}
            placeholder={placeholder}
            type={type === "birthdate" ? "text" : type}
            isValid={!error}
          />
        )}
      />
      {error && <ErrorText>{error.message}</ErrorText>}
    </Wrapper>
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["text", "birthdate", "phone", "email"]).isRequired,
  rules: PropTypes.object,
  control: PropTypes.object.isRequired,
  error: PropTypes.object,
  validate: PropTypes.func,
};

Input.defaultProps = {
  placeholder: "텍스트 입력",
  rules: {},
  error: null,
  validate: null,
};

export const BirthdateInput = ({ control, error }) => (
  <Input
    name="birthdate"
    placeholder="생년월일 (예: 000101)"
    type="birthdate"
    control={control}
    error={error}
    rules={{
      required: "생년월일은 필수 입력입니다.",
      pattern: {
        value: /^\d{6}$/,
        message: "생년월일은 6자리 숫자여야 합니다. (예: 000101)",
      },
    }}
  />
);

export const PhoneInput = ({ control, error }) => (
  <Input
    name="phone"
    placeholder="휴대폰 번호 (예: 010-0000-0000)"
    type="phone"
    control={control}
    error={error}
    rules={{
      required: "휴대폰 번호는 필수 입력입니다.",
      pattern: {
        value: /^\d{3}-\d{4}-\d{4}$/,
        message: "휴대폰 번호는 010-0000-0000 형식이어야 합니다.",
      },
    }}
  />
);

export const EmailInput = ({ control, error }) => (
  <Input
    name="email"
    placeholder="이메일 (예: daengplace@gmail.com)"
    type="email"
    control={control}
    error={error}
    rules={{
      required: "이메일은 필수 입력입니다.",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "올바른 이메일 형식이어야 합니다. (예: daengplace@gmail.com)",
      },
    }}
  />
);

export const TextInput = ({ control, error, placeholder, name, rules }) => (
  <Input
    name={name}
    placeholder={placeholder}
    type="text"
    control={control}
    error={error}
    rules={rules}
  />
);

const Wrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 16px;
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
    border-color: ${({ isValid, theme }) =>
      isValid ? theme.colors.primary : "red"};
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 5px;
  display: block;
`;
