import React, { useState } from "react";
import Input from "./Input";

export default {
  title: "Common/Input",
  component: Input,
};

const Template = (args) => {
  const [value, setValue] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "이름 입력",
  type: "text",
};

export const Birthdate = Template.bind({});
Birthdate.args = {
  placeholder: "생년월일 (예시: 000101)",
  type: "birthdate",
};

export const PhoneNumber = Template.bind({});
PhoneNumber.args = {
  placeholder: "휴대폰 번호 (예시: 010-0000-0000)",
  type: "phone",
};

export const Email = Template.bind({});
Email.args = {
  placeholder: "이메일 (예시: daengplace@gmail.com)",
  type: "email",
};
