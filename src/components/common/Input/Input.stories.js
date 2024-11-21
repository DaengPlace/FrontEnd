import React from "react";
import { useForm } from "react-hook-form";
import { BirthdateInput, PhoneInput, EmailInput, TextInput } from "./Input";

export default {
  title: "Common/Input",
  component: TextInput,
};

const Template = (Component) => {
  const Wrapper = (args) => {
    const {
      control,
      formState: { errors },
    } = useForm({
      mode: "onChange",
    });

    return <Component control={control} error={errors[args.name]} {...args} />;
  };

  return Wrapper;
};

export const Birthdate = Template(BirthdateInput).bind({});
Birthdate.args = {
  name: "birthdate",
  placeholder: "생년월일 (예시: 000101)",
};

export const PhoneNumber = Template(PhoneInput).bind({});
PhoneNumber.args = {
  name: "phone",
  placeholder: "휴대폰 번호 (예시: 010-0000-0000)",
};

export const Email = Template(EmailInput).bind({});
Email.args = {
  name: "email",
  placeholder: "이메일 (예시: daengplace@gmail.com)",
};

export const Text = Template(TextInput).bind({});
Text.args = {
  name: "text",
  placeholder: "텍스트 입력",
  rules: { required: "텍스트는 필수 입력입니다." },
};
