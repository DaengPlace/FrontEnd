import React, {useState} from "react";
import styled from "styled-components";
import Image from "next/image";
import Hr2 from "@/components/place/Hr2/Hr2";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

const ReviewList = ({ reviews }) => {
    const router = useRouter();
    const [likedReviews, setLikedReviews] = useState({});

    const handleCardClick = () => {
        router.push("/reviews/ReviewDetail")
    }
    const toggleLike = (id) => {
        setLikedReviews((prev) => ({
        ...prev,
        [id]: !prev[id],
        }));
    };
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    
  return (
    <ReviewListContainer>
      <Title>리뷰 ({reviews.length})</Title>
      <Hr2/> 
      {reviews.map((review) => (
        <ReviewCard key={review.id} onClick={handleCardClick} >
          <CardHeader>
          <AvatarWrapper>
              <Image
                src="/assets/image (1).png"
                alt="사용자 프로필"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            </AvatarWrapper>
            <Author>{review.author}</Author>
            <span style={{marginBottom:"20px"}}>|</span>
            <Date>{review.date}</Date>
            <LikeButton onClick={() => toggleLike(review.id)}>
              {likedReviews[review.id] ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon style={{ color: "#ccc" }} />
              )}
            </LikeButton>
            <IconButton onClick={toggleDropdown}>
                <MoreVertIcon />
            </IconButton>
            {isOpen && (
                <Menu>
                <MenuItem>수정</MenuItem>
                <MenuItem>삭제</MenuItem>
                </Menu>
            )}
            </CardHeader>
            <RatingContainer>
            <Rating>
              {Array.from({ length: Math.round(review.rating) }).map((_, i) => (
                <span style={{marginRight:"-5px"}}key={i}>⭐</span>
              ))}
            </Rating>
            </RatingContainer>
          <CardContent>
            <Text>{review.review}</Text>
            <ImageWrapper>
              <Image
                src={review.image}
                alt={`리뷰 이미지 ${review.id}`}
                width={100} 
                height={100} 
                objectFit="cover" 
                style={{ borderRadius: "10px" }}
                priority
              />
            </ImageWrapper>
          </CardContent>
          <Hr2/>
        </ReviewCard>
      ))}
    </ReviewListContainer>
  );
};

export default ReviewList;

const ReviewListContainer = styled.div`
  margin-bottom: 20px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  margin-left: 10px;
  padding: 20px 20px;
  margin-right: 10px;
`;
const Title = styled.h3`
  margin-bottom: -10px;
`
const ReviewCard = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  margin-top: 15px;
  margin-left: 10px;
  cursor: pointer;
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
  background-color: #f4f4f4;
  margin-right: 8px;
  flex-shrink: 0;
`;
const RatingContainer = styled.div`
  margin-left: 50px;
  display: flex;
`
const Author = styled.span`
  font-weight: bold;
  margin-left: 8px;
  margin-right: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  white-space: nowrap;
`;

const Date = styled.span`
  font-size: 15px;
  margin-bottom: 17px;
  margin-left: 4px;
`;

const CardContent = styled.div``;

const Rating = styled.div`
  font-size: 14px;
  margin-top: -25px;
  margin-left: 5px;
`;

const Text = styled.p`
  margin: 8px 0;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative; 
  border-radius: 10px;
  overflow: hidden;
`;
const LikeButton = styled.div`
  cursor: pointer;
  margin-left: 260px;
  width:40px;
  height:30px;

  &:hover svg {
    transform: scale(1.2);
  }
`;
const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-10px) translateY(-2.5px);
  svg {
    color: #ABABAB; 
    transition: transform 0.2s ease, color 0.2s ease;
  }
  &:hover svg {
    transform: scale(1.2);
  }
`;
const Menu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 1000;
  overflow: hidden;
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;