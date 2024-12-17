import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default {
  title: "Common/ConfirmModal",
  component: ConfirmModal,
  decorators: [(Story) => <Story />],
};

const Template = (args) => {
    const [isOpen, setIsOpen] = useState(true); 
    const handleClose = () => setIsOpen(false);
    return isOpen ? <ConfirmModal {...args} onClose={handleClose} /> : null;
}
export const Default = Template.bind({});
Default.args = {
  title: "알림",
  message: (
    <>
      장소명이 확인되었습니다.
    </>
  ),
  confirmText: "확인",
};
