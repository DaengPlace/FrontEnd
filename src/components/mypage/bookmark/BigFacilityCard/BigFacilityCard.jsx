import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import theme from "@/styles/theme.js";

const BigFacilityCard = ({fac, toggleLike}) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/place/placedetail?id=${fac.id}`);
  };

  return (
    
    <Container onClick={handleClick}>
      <ImageWrapper>
        <FacilityImage src={fac.image} alt={fac.name} width={510} height={300} />
        <FavoriteButton onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 차단
          toggleLike(fac.id)
          }}
          isLiked={fac.isLiked}
        >
          {fac.isLiked ? (<Favorite />) : (<FavoriteBorder />)}
        </FavoriteButton>
      </ImageWrapper>

      <FacilityInfo>
        <RowLayout>
          <Category>{fac.category}</Category>
          <Rating>
            ★ {fac.rating.toFixed(1)} <span>({fac.reviewCnt})</span>
          </Rating>
        </RowLayout>
        <Information>
          <Name>{fac.name}</Name>
          <Address>{fac.address}</Address>
        </Information>
        <Tags>
          {fac.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Tags>

      </FacilityInfo>

    </Container>
  );
};

export default BigFacilityCard;

const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  background-color: white;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const FacilityImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const FavoriteButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'isLiked', // isLiked prop을 DOM에 전달하지 않음
})`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;

  svg {
    font-size: 30px;
    color: ${({isLiked}) => (isLiked ? 'red' : 'white')};
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const FacilityInfo = styled.div`
  padding: 10px 15px;
`;

const RowLayout = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;

const Category = styled.div`
  font-size: 12px;
  background: ${theme.colors.tertiary};
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-block;
  margin-bottom: 5px;
`;

const Rating = styled.div`
  font-size: 14px;
  color: ${theme.colors.tertiary};
  margin-bottom: 10px;
  font-weight: bold;

  span {
    color: ${theme.colors.divider};
    font-weight: 400;
  }
`;

const Information = styled.div`
  margin-left: 5px;
  border-bottom: 1px solid ${theme.colors.divider};
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Address = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 10px;
`;

const Details = styled.div`
  font-size: 12px;
  color: #555;
  margin-bottom: 10px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 8px;
`;

const Tag = styled.div`
  font-size: 12px;
  background: #f0f0f0;
  color: #555;
  padding: 5px 10px;
  border-radius: 20px;
`;