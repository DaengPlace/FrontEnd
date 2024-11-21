import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BirthdateInput, PhoneInput, EmailInput, TextInput } from "./Input";

export const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("폼 데이터:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BirthdateInput control={control} error={errors.birthdate} />
      <PhoneInput control={control} error={errors.phone} />
      <EmailInput control={control} error={errors.email} />
      <TextInput
        name="name"
        placeholder="이름 입력"
        control={control}
        error={errors.name}
        rules={{ required: "이름은 필수 입력입니다." }}
      />
      <SubmitButton type="submit">제출</SubmitButton>
    </form>
  );
};

const SubmitButton = styled.button`
  width: 100%;
  max-width: 600px;
  height: 40px;
  background-color: #3e3e3e;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

export default Form;
