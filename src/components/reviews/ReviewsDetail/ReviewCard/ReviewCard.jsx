"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import {
  fetchUserProfile,
  toggleReviewLike,
} from "@/apis/review/reviewApi";

const ReviewCard = ({ review, setReview, isOpen, toggleDropdown }) => {
  const NativeDate = global.Date;
  const [currentUserNickname, setCurrentUserNickname] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profiledata = await fetchUserProfile();
        setCurrentUserNickname(profiledata.nickname);
        setProfile(profiledata);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error.message);
      }
    };

    loadUserProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new NativeDate(dateString); 
    if (isNaN(date)) {
      return "Invalid date";
    }
    const kstOffset = 9 * 60 * 60 * 1000; 
    const localDate = new NativeDate(date.getTime() + kstOffset);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const day = String(localDate.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const toggleLike = async (placeId, reviewId) => {
    try {
      const isCurrentlyLiked = review.liked;
      await toggleReviewLike(placeId, reviewId, isCurrentlyLiked);

      setReview((prevReview) => ({
        ...prevReview,
        liked: !isCurrentlyLiked, 
        likeCount: isCurrentlyLiked
          ? prevReview.likeCount - 1 
          : prevReview.likeCount + 1, 
      }));
    } catch (error) {
      console.error("Failed to toggle like:", error.response?.data || error.message);
      alert(error.response?.data?.message || "An error occurred while toggling like.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <AvatarWrapper>
        {profile.profileImageUrl ? (
          <Image
            src={profile.profileImageUrl}
            alt="사용자 프로필"
            width={60}
            height={60}
            style={{borderRadius: "50%"}}
          />
        ) : null}
        </AvatarWrapper>
        <UserInfo>
          <Author>{review.memberNickname}</Author>
          <span style={{ marginBottom: "20px" }}>|</span>
          <Date>{formatDate(review.createdAt)}</Date>
        </UserInfo>
        <LikeButton
                onClick={(event) => toggleLike(review.placeId, review.reviewId, event)}
            >
                {review.liked ? (
                    <FavoriteIcon style={{ color: "red" }} />
                ) : (
                    <FavoriteBorderIcon style={{ color: "#ccc" }} />
                )}
          </LikeButton>
        {currentUserNickname === review.memberNickname && (
          <DropdownMenu
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            reviewId={review.reviewId}
            placeId={review.placeId}
          />
        )}
      </CardHeader>
      <RatingContainer>
        <Rating>
          {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
            <span style={{ marginRight: "-5px" }} key={i}>
              ⭐
            </span>
          ))}
        </Rating>
      </RatingContainer>
      <CardContent>
      <ImageContainer>
        {review.imageUrls &&
          review.imageUrls.map((url, index) => (
            <ImageWrapper key={index}>
              <Image
                src={url}
                alt={`리뷰 이미지 ${review.reviewId} - ${index}`}
                layout="fill"
                objectFit="contain"
                style={{ borderRadius: "10px" }}
                priority
              />
            </ImageWrapper>
          ))}
      </ImageContainer>
        <Text>{review.content}</Text>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;

const Card = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  margin-left: 10px;
  margin-top: -20px;
`;
const LikeButton = styled.div`
  cursor: pointer;
  margin-left: auto;
  width:40px;
  height:30px;
  align-items: center;
  justify-content: center;
  &:hover svg {
    transform: scale(1.2);
  }
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  width: 100%;
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
  flex-shrink: 0;
`;

const UserInfo = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: 5px;
`;

const Author = styled.span`
  font-weight: bold;
  margin-left: 8px;
  margin-right: 4px;
  font-size: 14px;
`;

const Date = styled.span`
  font-size: 15px;
  margin-left: 4px;
  margin-top: 2px;
`;

const RatingContainer = styled.div`
  margin-left: 50px;
  display: flex;
`;

const Rating = styled.div`
  font-size: 14px;
  margin-top: -25px;
  margin-left: 20px;
`;

const CardContent = styled.div``;

const Text = styled.p`
  margin-top: 20px;
  font-size: 16px;
`;

const ImageWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;
const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 8px;
  margin-top: 15px;
`;