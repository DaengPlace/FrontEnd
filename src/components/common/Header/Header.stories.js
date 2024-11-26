import React from "react";
import Header from "./Header";

export default {
  title: "Common/Header",
  component: Header,
}

const Template  = (args) => <Header {...args} />;

export const MyPageHeader = Template.bind({});
MyPageHeader.args = {
  title: "마이페이지",
  showFavoriteIcon: false,
  showMapIcon: false
}