import React from "react";
import Modal from "./Modal";

export default {
  title: "Common/Modal",
  component: Modal,
  decorators: [(Story) => <Story />],
};

const Template = (args) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "회원가입을 중단하시겠습니까?",
  message: (
    <>
      지금까지 작성된 정보는 <br />
      저장되지 않습니다.
    </>
  ),
  cancelText: "나가기",
  confirmText: "계속 작성",
  onCancel: () => alert("취소되었습니다."),
  onConfirm: () => alert("확인되었습니다."),
};

export const Danger = Template.bind({});
Danger.args = {
  title: "회원 탈퇴를 진행하시겠습니까?",
  message: (
    <>
      회원 탈퇴 시 <br />더 이상 댕댕플레이스의 서비스를 이용하실 수 없습니다.
    </>
  ),
  cancelText: "취소",
  confirmText: "탈퇴",
  isDanger: true,
  onCancel: () => alert("취소되었습니다."),
  onConfirm: () => alert("탈퇴되었습니다."),
};

export const NoTitle = Template.bind({});
NoTitle.args = {
  title: "로그아웃하시겠습니까?",
  cancelText: "취소",
  confirmText: "확인",
  onCancel: () => alert("취소되었습니다."),
  onConfirm: () => alert("확인되었습니다."),
};
