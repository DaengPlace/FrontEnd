import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import Input from "../Input/Input";

export default {
  title: "Common/BottomSheet",
  component: BottomSheet,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <BottomSheet
          {...args}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {
            alert("확인 버튼 클릭");
            setIsOpen(false);
          }}
        />
      )}
      <button onClick={() => setIsOpen(true)}>Open BottomSheet</button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "이메일로 발송된 인증번호 7자리를 입력해주세요",
  content: <Input type="text" placeholder="인증번호 입력" />,
  cancelText: "취소",
  confirmText: "확인",
  styleVariant: "compact",
};

export const Success = Template.bind({});
Success.args = {
  title: "보호자님의 정보가 성공적으로 등록되었습니다.",
  content: <p>반려견 정보도 이어서 등록하시겠습니까?</p>,
  cancelText: "나중에 등록하기",
  confirmText: "이어 등록",
};

export const Permission = Template.bind({});
Permission.args = {
  title: "댕댕플레이스에서 보호자님의 현재 위치 정보를 사용하고자 합니다.",
  content: <p>“차단” 시 서비스 이용이 불가합니다.</p>,
  cancelText: "차단",
  confirmText: "동의",
};
