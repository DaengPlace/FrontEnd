import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Image from "next/image";

const ProfileSection = () => {
  const [profile, setProfile] = useState("");
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log("Access Token:", token);
        const response = await axios.get("https://api.daengplace.com/members/profile", {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        console.log("Profile Response:", response.data); 
        setProfile(response.data.data)
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message); 
      }
    };

    fetchProfile();
  }, []);
  return (
  <Profile>
    <Avatar profileImageUrl={profile.profileImageUrl}/>
    <ProfileName>{profile.nickname}</ProfileName>
  </Profile>
  );
};

export default ProfileSection;

const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Avatar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "profileImageUrl",
})`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f4f4f4;
   background-image: ${({ profileImageUrl }) =>
    profileImageUrl ? `url(${profileImageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  margin-right: 10px;
`;

const ProfileName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
