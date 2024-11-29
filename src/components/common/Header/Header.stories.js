import React from "react";
import Header from "./Header";

export default {
  title: "Common/Header",
  component: Header,
};

const Template = (args) => <Header {...args} />;

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
  showLogo: true,
  showFavoriteIcon: true,
};

export const OnlyHomeIcon = Template.bind({});
OnlyHomeIcon.args = {
  title: "홈 아이콘만 있는 헤더",
  showFavoriteIcon: false,
  showMapIcon: false,
};

export const WithMapIcon = Template.bind({});
WithMapIcon.args = {
  title: "댕플 아이콘 + 홈 아이콘",
  showFavoriteIcon: false,
  showMapIcon: true,
};

export const WithBookmarkIcon = Template.bind({});
WithBookmarkIcon.args = {
  title: "즐찾 아이콘 + 홈 아이콘",
  showFavoriteIcon: true,
  showMapIcon: false,
};

export const WithCloseButton = Template.bind({});
WithCloseButton.args = {
  title: "X 버튼 포함 헤더",
  showFavoriteIcon: false,
  showMapIcon: false,
  showCloseButton: true,
};
