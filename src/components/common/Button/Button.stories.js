import React from "react";
import Button from "./Button";

export default {
  title: "Common/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  isActive: false,
  children: "확인",
  onClick: () => alert("버튼 클릭!"),
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
  children: "확인",
  onClick: () => alert("버튼 클릭!"),
};

export const WithDogImage = Template.bind({});
WithDogImage.args = {
  isActive: true,
  children: "확인",
  onClick: () => alert("버튼 클릭!"),
  hasImage: true,
  imageSrc: "/path/to/dog-image.png",
};
