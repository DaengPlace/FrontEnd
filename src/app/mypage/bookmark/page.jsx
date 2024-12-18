"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

import { OnlyHomeIcon } from '@/components/common/Header/Header.stories';
import Header from '@/components/common/Header/Header';
import ScrollableContainer from '@/components/mypage/bookmark/ScrollableContainer/ScrollableContainer';
import ButtonsContainer from '@/components/mypage/bookmark/ButtonsContainer/ButtonsContainer';
import { getBookmarks } from '@/apis/favorite/getBookmarks';
import { getPlacesByPlaceId } from '@/apis/places/getPlacesByPlaceId';

const BookmarkPage = () => {

  const [facilities, setFacilities] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(30);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const bookmarkResponse = await getBookmarks();

        const placeIds = bookmarkResponse.data.places.map(
          (favorite) => favorite.placeId
        );

        const placeRequests = placeIds.map((placeId) => getPlacesByPlaceId(placeId));

        const placeResponses = await Promise.all(placeRequests);
        const places = placeResponses.map((res) => res.data);
        setFacilities(
          places.map((place) => ({
            id: place.placeId,
            name: place.name,
            address: place.location,
            image: "/assets/image 19.svg",
            category: place.category,
            rating: place.rating,
            reviewCnt: place.review_count,
            isLiked: place.is_favorite,
            tags: [
              place.is_parking && "주차 가능",
              place.inside && "실내공간",
              place.outside && "야외공간",
              place.weight_limit === 0 && "무게 제한 없음",
              place.pet_fee === 0 && "애견 동반 요금 없음",
            ].filter(Boolean),
          }))
        );
      } catch (error) {
        console.error("즐겨찾기 데이터를 가져오는 데 실패했습니다 : ", error)
      }
    };

    fetchBookmarks();
  }, []);

  return (
    <Container>
      <Header
        title="즐겨찾기"
        showHomeIcon={OnlyHomeIcon.args.showHomeIcon}
        showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon}
        showMapIcon={OnlyHomeIcon.args.showMapIcon}
      />
      <Space />
      {facilities.length > 0 ? (
        <>
          <ScrollableContainer
            facilities={facilities}
            toggleLike={(id) =>
              setFacilities((prev) =>
                prev.map((fac) =>
                  fac.id === id ? { ...fac, isLiked: !fac.isLiked } : fac
                )
              )
            }
            bottomRef={bottomRef}
          />
          <ButtonsContainer
            showScrollToTop={showScrollToTop}
            buttonBottom={buttonBottom}
          />
        </>
      ) : (
        <EmptyMessage>즐겨찾기에 등록된 시설이 없습니다.</EmptyMessage>
      )}
    </Container>
  );
};

export default BookmarkPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.defaultBackground};
`;

const Space = styled.div`
  margin-top: 50px;
`;

const EmptyMessage = styled.div`
  margin-top: 50px;
  font-size: 16px;
  color: ${theme.colors.divider};
  text-align: center;
`;