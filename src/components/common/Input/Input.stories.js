import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "./Input";

export default {
  title: "Common/Input",
  component: Input,
};

const Template = ({ name, placeholder, type, rules }) => {
  const {
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <div style={{ maxWidth: "600px" }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder={placeholder}
              type={type}
              isValid={!errors[name]}
            />
            {errors[name] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors[name].message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export const Birthdate = Template.bind({});
Birthdate.args = {
  name: "birthdate",
  placeholder: "생년월일 (예시: 000101)",
  type: "text",
  rules: {
    required: "생년월일은 필수 입력입니다.",
    pattern: {
      value: /^\d{6}$/,
      message: "생년월일은 6자리 숫자여야 합니다.",
    },
  },
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  name: "phone",
  placeholder: "휴대폰 번호 (예시: 010-0000-0000)",
  type: "text",
  rules: {
    required: "휴대폰 번호는 필수 입력입니다.",
    pattern: {
      value: /^\d{3}-\d{4}-\d{4}$/,
      message: "010-0000-0000 형식이어야 합니다.",
    },
  },
};

export const Email = Template.bind({});
Email.args = {
  name: "email",
  placeholder: "이메일 (예시: daengplace@gmail.com)",
  type: "email",
  rules: {
    required: "이메일은 필수 입력입니다.",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "올바른 이메일 형식이어야 합니다.",
    },
  },
};

export const Text = Template.bind({});
Text.args = {
  name: "text",
  placeholder: "텍스트 입력",
  type: "text",
  rules: {
    required: "텍스트는 필수 입력입니다.",
  },
};
