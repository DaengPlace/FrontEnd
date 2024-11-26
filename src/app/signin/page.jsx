"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input/Input";
import Button from "@/components/common/Button/Button";
import Header from "@/components/signin/Header/Header";

const SigninPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(180);
  const [timeExpired, setTimeExpired] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

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
  const verificationRef = useRef(null);

  const onSubmit = (data) => {
    if (isVerified) {
      router.push("/signin/info");
    } else if (step === 4 && isVerificationSent) {
      verifyCode();
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

  const isCurrentStepValid = () => {
    const currentField = getFieldName(step);
    const fieldValue = watch(currentField);
    return fieldValue && !errors[currentField];
  };

  const isButtonActive = () => {
    if (isVerificationSent) {
      return verificationCode.length === 6;
    }
    if (step === 4 && !isVerificationSent) {
      return isCurrentStepValid();
    }
    return isCurrentStepValid();
  };

  const nextStep = async () => {
    const isStepValid = await trigger(getFieldName(step));
    if (isStepValid) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleSendVerificationCode = () => {
    if (isCurrentStepValid()) {
      setIsVerificationSent(true);
      setTimer(180);
      setTimeExpired(false);
      setVerificationCode("");
      setVerificationError(false);
      verificationRef.current?.focus();
    }
  };

  const handleVerificationCodeChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setVerificationCode(value);
    setVerificationError(false);
  };

  const verifyCode = () => {
    if (verificationCode === "000000") {
      setIsVerified(true);
    } else {
      setVerificationError(true);
    }
  };

  useEffect(() => {
    const handleKeyPress = async (event) => {
      if (event.key === "Enter" && isCurrentStepValid()) {
        event.preventDefault();
        if (step === 4 && !isVerificationSent) {
          handleSendVerificationCode();
        } else if (isVerificationSent && verificationCode.length === 6) {
          verifyCode();
        } else {
          await nextStep();
        }
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [step, isVerificationSent, verificationCode]);

  useEffect(() => {
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

  useEffect(() => {
    let countdown;
    if (isVerificationSent && timer > 0) {
      countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimeExpired(true);
      clearInterval(countdown);
    }
    return () => clearInterval(countdown);
  }, [isVerificationSent, timer]);

  const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <Container>
      <Header
        titleLines={["보호자님의", "정보를 입력해주세요"]}
        onBack={() => router.push("/")}
        onClose={() => router.push("/")}
      />
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
                  value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={field.value || ""}
                    ref={(e) => {
                      field.ref(e);
                      emailRef.current = e;
                    }}
                    placeholder="이메일 (예: daengplace@gmail.com)"
                    type="email"
                    isValid={!fieldState.invalid}
                    disabled={isVerificationSent}
                  />
                  {fieldState.error && (
                    <ErrorText>{fieldState.error.message}</ErrorText>
                  )}
                </>
              )}
            />
          </InputBox>
        )}

        {isVerificationSent && (
          <InputBox>
            <p>인증번호</p>
            <BoxContainer>
              <Input
                ref={verificationRef}
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="인증번호 입력 (예: 000000)"
                type="text"
                isValid={!verificationError}
              />

              <Button
                isActive
                onClick={() => {
                  handleSendVerificationCode();
                }}
              >
                재발송
              </Button>
            </BoxContainer>
            <PlusContent>
              {verificationError && verificationCode.length === 6 && (
                <ErrorText>인증번호가 올바르지 않습니다.</ErrorText>
              )}
              {timeExpired && (
                <ErrorText>
                  입력 시간이 초과되었습니다. 재발송 버튼을 눌러 다시
                  입력해주세요.
                </ErrorText>
              )}
              <TimerDivider>{formatTime(timer)}</TimerDivider>
            </PlusContent>
          </InputBox>
        )}

        <Button
          isActive={isButtonActive()}
          onClick={
            isVerificationSent
              ? handleSubmit(onSubmit)
              : step === 4
              ? handleSendVerificationCode
              : nextStep
          }
          hasImage={true}
          type={isVerificationSent ? "submit" : "button"}
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
          }}
        >
          {isVerificationSent
            ? isVerified
              ? "완료"
              : "확인"
            : step === 4
            ? "인증번호 발송"
            : "다음"}
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

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;

  & > input {
    flex: 7 7 70%;
  }
  & > div {
    flex: 3 3 30%;
  }
`;

const TimerDivider = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.divider};
  font-weight: semibold;
`;

const PlusContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
