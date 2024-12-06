"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from 'next/navigation';
import Header from "@/components/common/Header/Header";
import Modal from '@/components/common/Modal/Modal';
import CategorySection from "@/components/reviews/reviewsInput/CategorySection/CategorySection";
import ProfileSection from "@/components/reviews/reviewsInput/ProfileSection/ProfileSection";
import RatingSection from "@/components/reviews/reviewsInput/RatingSection/RatingSection";
import AddMediaSection from "@/components/reviews/reviewsInput/AddMediaSection/AddMediaSection";
import ReviewTextSection from "@/components/reviews/reviewsInput/ReviewTextSection/ReviewTextSection";
import TagSection from "@/components/reviews/reviewsInput/TagSection/TagSection";
import SubmitButton from "@/components/reviews/reviewsInput/SubmitButton/SubmitButton";
import ScrollToTopButton from "@/components/reviews/reviewsInput/ScrollToTopButton/ScrollToTopButton";
import Divider from "@/components/common/Divider/Divider";
import { NoTitleHeader } from "@/components/common/Header/Header.stories";

const ReviewsInputPage = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [tags, setTags] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const maxLength = 500;

  const containerRef = useRef(null); 

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else{
      setTags([...tags, tag]);
    }
  };

  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setReviewText(e.target.value);
    }
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        setShowScrollToTop(scrollTop > 10);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
        <Header title="리뷰 작성" showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)} />
      <MainContent ref={containerRef}>
        <CategorySection />
        <Divider />
        <ProfileSection />
        <RatingSection />
        <AddMediaSection />
        <ReviewTextSection
          reviewText={reviewText}
          onChange={handleReviewChange}
          maxLength={maxLength}
        />
        <TagSection tags={tags} onTagClick={handleTagClick} />
        <SubmitButton>등록</SubmitButton>
        {isModalOpen && (
        <Modal
          title='리뷰작성을 중단하시겠습니까?'
          message={
            <>
              지금까지 작성된 정보는<br />
              저장되지 않습니다.
            </>
          }
          cancelText='나가기'
          confirmText='계속 작성'
          onCancel={() => router.push("/reviews")}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}
      </MainContent>
      {showScrollToTop && <ScrollToTopButton onClick={scrollToTop} />}
    </>
  );
};

export default ReviewsInputPage;

const MainContent = styled.div`
  padding: 16px;
  padding-top: 70px;
  height: 100vh; 
  overflow-y: auto;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  &::-webkit-scrollbar {
    display: none;
  }
`;
