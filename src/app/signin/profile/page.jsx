"use client";

import styled from "styled-components";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";
import Input from "@/components/common/Input/Input";
import Header from "@/components/signin/Header/Header";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";

const SigninProfilePage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "/assets/profile/default_profile.svg"
  );
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const handleCheckDuplicate = () => {
    const currentNickname = watch("nickname");
    const isNameDuplicate = currentNickname === "사용중인닉네임";
    setIsDuplicate(isNameDuplicate);
    setIsChecked(true);
    setNickname(currentNickname);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Header
        titleLines={["댕댕플레이스에서 활동할", "프로필을 등록해 주세요"]}
        onBack={() => router.push("/signin")}
        onClose={() => router.push("/")}
      />

      <ProfileBox>
        <Image src={profileImage} alt="profile" width={150} height={150} />
        <ImageUpload htmlFor="upload-image">
          <Image
            src="/assets/common/camera.svg"
            alt="edit"
            width={50}
            height={50}
          />
        </ImageUpload>
        <HiddenFileInput
          id="upload-image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </ProfileBox>

      <InputBox>
        <p>닉네임</p>
        <BoxContainer>
          <Controller
            name="nickname"
            control={control}
            rules={{
              required: "닉네임은 필수 입력입니다.",
              pattern: {
                value: /^(?!.*[!@#$%^&*(),.?":{}|<>])[가-힣a-zA-Z0-9]{2,10}$/,
                message: `닉네임은 특수문자를 포함할 수 없으며, 한글/영문/숫자 2~10자리여야 합니다.`,
              },
              validate: (value) => {
                const hasVowelsOrConsonantsOnly = /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(value);
                if (hasVowelsOrConsonantsOnly) {
                  return "닉네임은 자음이나 모음만으로 구성될 수 없습니다.";
                }
                return true;
              },
            }}
            render={({ field, fieldState }) => (
              <>
                <Input
                  placeholder="닉네임 입력"
                  {...field}
                  value={field.value || ""}
                  onChange={async (e) => {
                    field.onChange(e.target.value);
                    setIsChecked(false);
                    await trigger("nickname");
                  }}
                  isValid={!fieldState.invalid}
                />
              </>
            )}
          />
          <Button
            isActive={!errors.nickname && watch("nickname")?.length > 0}
            onClick={handleCheckDuplicate}
          >
            중복확인
          </Button>
        </BoxContainer>
        {errors.nickname && (
          <ErrorMessage>{errors.nickname.message}</ErrorMessage>
        )}
      </InputBox>

      {isChecked && (
        <>
          {isDuplicate ? (
            <ErrorMessage>이미 사용 중인 닉네임입니다.</ErrorMessage>
          ) : (
            <SuccessMessage>사용 가능한 닉네임입니다.</SuccessMessage>
          )}
        </>
      )}

      <ButtonContainer>
        <Button
          isActive={isChecked && !isDuplicate && nickname.length > 0}
          onClick={() => setIsBottomSheetVisible(true)}
          hasImage={false}
          type="button"
        >
          확인
        </Button>
      </ButtonContainer>

      {isBottomSheetVisible && (
        <BottomSheet
          title="보호자님의 정보가 성공적으로 등록되었습니다."
          content={
            <p>
              반려견 정보도
              <br /> 이어서 등록하시겠습니까?
            </p>
          }
          cancelText="나중에 등록하기"
          confirmText="이어 등록"
          onClose={() => router.push("/main")}
          onConfirm={() => router.push("/dog/info")}
          setIsBottomSheetVisible={setIsBottomSheetVisible}
        />
      )}
    </Container>
  );
};

export default SigninProfilePage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const BoxContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > input {
    flex: 7 7 70%;
  }
  & > div {
    flex: 3 3 30%;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;

  img:first-child {
    position: relative;
    z-index: 1;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ImageUpload = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
`;
