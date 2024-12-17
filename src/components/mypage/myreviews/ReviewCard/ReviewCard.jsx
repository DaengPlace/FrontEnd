import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "@/styles/theme";
import Image from "next/image";
import { MoreVert } from "@mui/icons-material";

const ReviewCard = ({ review }) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  console.log(review);

  return (
    <Card>
      <CardHeader>
        <Category>{review.category}</Category>
        <FacilityTitle>{review.placeName}</FacilityTitle>
      </CardHeader>

      <ContentWrapper>
        <ReviewHeader>
          <AuthorInfo>
            <AuthorImage
              src={review.profileImageUrl || "/assets/mypage/defaultProfileImage.png"}
              alt={review.nickname}
              width={50}
              height={50}
            />
            <TextContent>
              <Author>
                {review.nickname} | <Date>{review.createdAt.split("T")[0]}</Date>
              </Author>
              <Rating>
                <span>★</span> {review.rating.toFixed(1)}
              </Rating>
            </TextContent>
          </AuthorInfo>
          <Actions>
            <MoreVert ref={dropdownRef} onClick={handleDropdownToggle} />
            {isDropdownActive && (
              <Dropdown>
                <DropdownItem>수정</DropdownItem>
                <DropdownItem>삭제</DropdownItem>
              </Dropdown>
            )}
          </Actions>
        </ReviewHeader>

        <ReviewContent>{review.content}</ReviewContent>
        <Tags>
          {review.traitTags.map((tag) => (
            <Tag key={tag.traitTagId}>{tag.content}</Tag>
          ))}
        </Tags>
      </ContentWrapper>
    </Card>
  );
};

export default ReviewCard;

const Card = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
`;

const CardHeader = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid ${theme.colors.divider};
`;

const Category = styled.div`
  background-color: ${theme.colors.tertiary};
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  width: 120px;
  text-align: center;
`;

const FacilityTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const ContentWrapper = styled.div`
  padding: 10px 0;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorImage = styled(Image)`
  border-radius: 50%;
`;

const TextContent = styled.div`
  margin-left: 10px;
`;

const Author = styled.div`
  font-size: 14px;
`;

const Date = styled.span`
  font-size: 12px;
`;

const Rating = styled.div`
  font-size: 13px;
  color: ${theme.colors.divider};
  margin-top: 5px;

  span {
    color: #ffbf00;
  }
`;

const Actions = styled.div`
  position: relative;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 35px;
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
  min-width: 120px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #f4f4f4;
    color: black;
  }
`;

const ReviewContent = styled.div`
  font-size: 14px;
  padding-top: 10px;
`;

const Tags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.div`
  background-color: ${theme.colors.divider};
  color: white;
  font-size: 12px;
  border-radius: 12px;
  padding: 5px 10px;
`;