"use client";

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

import { OnlyHomeIcon } from '@/components/common/Header/Header.stories';
import Header from '@/components/common/Header/Header';
import { initialFacilities } from "@/data/facilities";
import ScrollableContainer from '@/components/mypage/bookmark/ScrollableContainer/ScrollableContainer';
import ButtonsContainer from '@/components/mypage/bookmark/ButtonsContainer/ButtonsContainer';

const BookmarkPage = () => {

  const [facilities, setFacilities] = useState(initialFacilities);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [buttonBottom, setButtonBottom] = useState(30);
  const bottomRef = useRef(null);

  // 즐겨찾기 상태 변경 함수
  const toggleLike = (id) => {
    setFacilities((prev) => 
      prev.map((fac) => 
        fac.id === id ? {...fac, isLiked: !fac.isLiked} : fac
      )
    );
  };

  useEffect(() => {
    // Scroll 및 Intersection Observer 설정
    const container = document.getElementById("scrollable-container");
    const handleScroll = () => setShowScrollToTop(container.scrollTop > 10);

    container.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(([entry]) => {
      setButtonBottom(entry.isIntersecting ? 20 : 30);
    }, { root: container, threshold: 0.1 });

    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
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
      <ScrollableContainer facilities={facilities} toggleLike={toggleLike} bottomRef={bottomRef} />
      <ButtonsContainer showScrollToTop={showScrollToTop} buttonBottom={buttonBottom} />
    </Container>
  );
};

export default BookmarkPage;

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.defaultBackground};
`;

const Space = styled.div`
  margin-top: 50px;
`;