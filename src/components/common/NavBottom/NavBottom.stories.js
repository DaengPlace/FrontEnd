import React from "react";
import NavBottom from "./NavBottom";

export default {
  title: "Components/NavBottom",
  component: NavBottom,
  decorators: [(Story) => <Story />],
};

const Template = (args) => <NavBottom {...args} />;

export const HomeSelected = Template.bind({});
HomeSelected.args = {
  pathname: "/",
};

export const SearchSelected = Template.bind({});
SearchSelected.args = {
  pathname: "/search",
};

export const PlaceSelected = Template.bind({});
PlaceSelected.args = {
  pathname: "/place",
};

export const RecommendSelected = Template.bind({});
RecommendSelected.args = {
  pathname: "/recommend",
};

export const UserSelected = Template.bind({});
UserSelected.args = {
  pathname: "/user",
};
