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
  showHomeIcon: true,
}

export const OnlyHomeIcon = Template.bind({});
OnlyHomeIcon.args = {
  title: "홈 아이콘만 있는 헤더",
  showHomeIcon: true,
  showFavoriteIcon: false,
  showMapIcon: false,
};

export const WithMapIcon = Template.bind({});
WithMapIcon.args = {
  title: "댕플 아이콘 + 홈 아이콘",
  showHomeIcon: true,
  showFavoriteIcon: false,
  showMapIcon: true,
};

export const WithBookmarkIcon = Template.bind({});
WithBookmarkIcon.args = {
  title: "즐찾 아이콘 + 홈 아이콘",
  showHomeIcon: true,
  showFavoriteIcon: true,
  showMapIcon: false
}

export const NoTitleHeader = Template.bind({});
NoTitleHeader.args = {
  title: "뒤로가기 + x 버튼",
  showX: true,
}
