import React from "react";
import styled from "styled-components";

const ProfileSection = () => (
  <Profile>
    <Avatar />
    <ProfileName>뽀삐엄마</ProfileName>
  </Profile>
);

export default ProfileSection;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f4f4f4;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
