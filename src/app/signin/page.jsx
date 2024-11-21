"use client";

import React from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/common/Input/Input";

const SigninPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Container>
      <Title>
        <p>보호자님의</p>
        <p>휴대폰 번호를 입력해주세요</p>
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이어야 합니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder="이메일 (예: daengplace@gmail.com)"
                  type="email"
                  isValid={!fieldState.invalid}
                />
                {fieldState.error && (
                  <ErrorText>{fieldState.error.message}</ErrorText>
                )}
              </>
            )}
          />
        </InputBox>

        <InputBox>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "휴대폰 번호는 필수 입력입니다.",
              pattern: {
                value: /^\d{3}-\d{4}-\d{4}$/,
                message: "010-0000-0000 형식이어야 합니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder="휴대폰 번호 (예: 010-0000-0000)"
                  type="text"
                  isValid={!fieldState.invalid}
                />
                {fieldState.error && (
                  <ErrorText>{fieldState.error.message}</ErrorText>
                )}
              </>
            )}
          />
        </InputBox>

        <InputBox>
          <Controller
            name="birthdate"
            control={control}
            rules={{
              required: "생년월일은 필수 입력입니다.",
              pattern: {
                value: /^\d{6}$/,
                message: "생년월일은 6자리 숫자여야 합니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder="생년월일 (예: 000101)"
                  type="text"
                  isValid={!fieldState.invalid}
                />
                {fieldState.error && (
                  <ErrorText>{fieldState.error.message}</ErrorText>
                )}
              </>
            )}
          />
        </InputBox>

        <InputBox>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "이름은 필수 입력입니다.",
              maxLength: {
                value: 50,
                message: "이름은 최대 50자까지 가능합니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  placeholder="이름 입력 (예: 홍길동)"
                  type="text"
                  isValid={!fieldState.invalid}
                />
                {fieldState.error && (
                  <ErrorText>{fieldState.error.message}</ErrorText>
                )}
              </>
            )}
          />
        </InputBox>

        <SubmitButton type="submit">제출</SubmitButton>
      </Form>
    </Container>
  );
};

export default SigninPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputBox = styled.div`
  margin-bottom: 16px;
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: red;
  margin-top: 5px;
  display: block;
`;

const SubmitButton = styled.button`
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
