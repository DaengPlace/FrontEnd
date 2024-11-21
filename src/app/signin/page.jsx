"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";

const SigninPage = () => {
  const [step, setStep] = useState(1);
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const nameRef = useRef(null);
  const birthdateRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);

  const name = watch("name");
  const birthdate = watch("birthdate");
  const phone = watch("phone");
  const email = watch("email");

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  const nextStep = async () => {
    const isStepValid = await trigger(getFieldName(step));
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const getFieldName = (currentStep) => {
    switch (currentStep) {
      case 1:
        return "name";
      case 2:
        return "birthdate";
      case 3:
        return "phone";
      case 4:
        return "email";
      default:
        return "";
    }
  };

  const isStepValid = () => {
    const currentField = getFieldName(step);
    return !errors[currentField] && watch(currentField);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter" && isStepValid()) {
        event.preventDefault();
        nextStep();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [step, isStepValid]);

  useEffect(() => {
    // Focus on the current input when step changes
    switch (step) {
      case 1:
        nameRef.current?.focus();
        break;
      case 2:
        birthdateRef.current?.focus();
        break;
      case 3:
        phoneRef.current?.focus();
        break;
      case 4:
        emailRef.current?.focus();
        break;
    }
  }, [step]);

  return (
    <Container>
      <Title>
        <p>보호자님의</p>
        <p>정보를 입력해주세요</p>
      </Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputBox>
          <p>이름</p>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "이름은 필수 입력입니다.",
              maxLength: {
                value: 10,
                message: "이름은 최대 10자까지 가능합니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  {...field}
                  ref={(e) => {
                    field.ref(e);
                    nameRef.current = e;
                  }}
                  placeholder="이름 입력"
                  type="text"
                  isValid={!fieldState.invalid}
                  disabled={step > 1}
                />
                {fieldState.error && (
                  <ErrorText>{fieldState.error.message}</ErrorText>
                )}
              </>
            )}
          />
        </InputBox>

        {step >= 2 && (
          <InputBox>
            <p>생년월일</p>
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
                    ref={(e) => {
                      field.ref(e);
                      birthdateRef.current = e;
                    }}
                    placeholder="생년월일 (예: 000101)"
                    type="text"
                    isValid={!fieldState.invalid}
                    disabled={step > 2}
                  />
                  {fieldState.error && (
                    <ErrorText>{fieldState.error.message}</ErrorText>
                  )}
                </>
              )}
            />
          </InputBox>
        )}

        {step >= 3 && (
          <InputBox>
            <p>휴대폰</p>
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
                    ref={(e) => {
                      field.ref(e);
                      phoneRef.current = e;
                    }}
                    placeholder="휴대폰 번호 (예: 010-0000-0000)"
                    type="text"
                    isValid={!fieldState.invalid}
                    disabled={step > 3}
                  />
                  {fieldState.error && (
                    <ErrorText>{fieldState.error.message}</ErrorText>
                  )}
                </>
              )}
            />
          </InputBox>
        )}

        {step >= 4 && (
          <InputBox>
            <p>이메일</p>
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
                    ref={(e) => {
                      field.ref(e);
                      emailRef.current = e;
                    }}
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
        )}

        <Button
          isActive={isStepValid()}
          onClick={step < 4 ? nextStep : handleSubmit(onSubmit)}
          hasImage="true"
          type={step === 4 ? "submit" : "button"}
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
          }}
        >
          {step < 4 ? "다음" : "제출"}
        </Button>
      </Form>
    </Container>
  );
};

export default SigninPage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  height: calc(100vh - 100px - 4rem);
  flex: 1;
`;

const InputBox = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 1.1rem;
`;

const ErrorText = styled.span`
  font-size: 1rem;
  color: red;
  margin-top: 5px;
  display: block;
`;
