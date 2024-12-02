"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/common/Header/Header";
import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import SelectBox from "@/components/common/SelectBox/SelectBox";
import Checkbox from "@/components/common/Checkbox/Checkbox";
import Image from "next/image";

const MyProfilePage = () => {
  const router = useRouter();
  const {
    control,
    watch,
    trigger,
    formState: { errors },
  } = useForm();

  const [isChecked, setIsChecked] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState({
    city: null,
    district: null,
  });
  const [profileImage, setProfileImage] = useState(
    "/assets/profile/default_profile.svg"
  );

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

  const handleCheckDuplicate = () => {
    const currentNickname = watch("nickname");
    const isNameDuplicate = currentNickname === "사용중인닉네임";
    setIsDuplicate(isNameDuplicate);
    setIsChecked(true);
    setNickname(currentNickname);
  };

  const handleSaveProfile = async () => {
    const isValid = await trigger(["nickname", "birthdate", "email"]);
    if (isValid) {
      alert("프로필이 수정되었습니다!");
      router.push("/main");
    } else {
      alert("모든 필수 입력 항목을 올바르게 작성해 주세요.");
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleRegionChange = (key, value) => {
    setSelectedRegion((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Header
        title="프로필 수정"
        showHomeIcon={true}
        showFavoriteIcon={false}
        showMapIcon={false}
      />
      <Space />
      <Container>
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
                  message:
                    "닉네임은 특수문자를 포함할 수 없으며, 한글/영문/숫자 2~10자리여야 합니다.",
                },
                validate: (value) => {
                  const hasVowelsOrConsonantsOnly = /^[ㄱ-ㅎㅏ-ㅣ]+$/.test(
                    value
                  );
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
          {isChecked && (
            <>
              {isDuplicate ? (
                <ErrorMessage>이미 사용 중인 닉네임입니다.</ErrorMessage>
              ) : (
                <SuccessMessage>사용 가능한 닉네임입니다.</SuccessMessage>
              )}
            </>
          )}
        </InputBox>

        <InputBox>
          <p>생년월일</p>
          <Controller
            name="birthdate"
            control={control}
            rules={{
              required: "생년월일은 필수 입력입니다.",
              pattern: {
                value: /^\d{2}\d{2}\d{2}$/,
                message: "생년월일은 000101 형식으로 입력해야 합니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                placeholder="000101"
                {...field}
                value={field.value || ""}
                isValid={!fieldState.invalid}
                onChange={async (e) => {
                  field.onChange(e.target.value);
                  await trigger("birthdate");
                }}
              />
            )}
          />
          {errors.birthdate && (
            <ErrorMessage>{errors.birthdate.message}</ErrorMessage>
          )}
        </InputBox>

        <InputBox>
          <p>이메일</p>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "이메일은 필수 입력입니다.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            }}
            render={({ field, fieldState }) => (
              <Input
                placeholder="이메일 입력"
                {...field}
                value={field.value || ""}
                isValid={!fieldState.invalid}
                onChange={async (e) => {
                  field.onChange(e.target.value);
                  await trigger("email");
                }}
              />
            )}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </InputBox>

        <InputBox>
          <p>성별</p>
          <BoxContainer>
            <Checkbox
              label="여성"
              isChecked={selectedGender === "여성"}
              onClick={() => handleGenderSelect("여성")}
            />
            <Checkbox
              label="남성"
              isChecked={selectedGender === "남성"}
              onClick={() => handleGenderSelect("남성")}
            />
          </BoxContainer>
        </InputBox>

        <InputBox>
          <p>활동 지역</p>
          <BoxContainer>
            <SelectBox
              placeholder="시/도"
              options={[
                { value: "seoul", label: "서울" },
                { value: "busan", label: "부산" },
                { value: "incheon", label: "인천" },
              ]}
              selectedValue={selectedRegion.city}
              onChange={(value) => handleRegionChange("city", value)}
            />
            <SelectBox
              placeholder="시/군/구"
              options={[
                { value: "gangnam", label: "강남구" },
                { value: "bukgu", label: "북구" },
                { value: "bupyeong", label: "부평구" },
              ]}
              selectedValue={selectedRegion.district}
              onChange={(value) => handleRegionChange("district", value)}
            />
          </BoxContainer>
        </InputBox>

        <ButtonContainer>
          <Button
            isActive={
              !errors.nickname &&
              !errors.birthdate &&
              !errors.email &&
              isChecked &&
              !isDuplicate &&
              selectedGender !== null &&
              selectedRegion.city !== null &&
              selectedRegion.district !== null
            }
            onClick={handleSaveProfile}
          >
            저장하기
          </Button>
        </ButtonContainer>
      </Container>
    </>
  );
};

export default MyProfilePage;

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 25px;
`;

const Space = styled.div`
  height: 20px;
  margin-top: 20px;
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
    color: ${({ theme }) => theme.colors.divider};
  }
`;

const SuccessMessage = styled.div`
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
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;
