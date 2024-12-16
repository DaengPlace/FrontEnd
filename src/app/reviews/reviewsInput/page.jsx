"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import styled from "styled-components";
import { createReview, updateReview, fetchReviewDetail } from "@/apis/review/reviewApi";
import { useRouter, useSearchParams } from "next/navigation";
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
  return (
      <Suspense>
        <ActualReviewInputPage />
      </Suspense>
    )
  }

  const ActualReviewInputPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId"); 
  const reviewId = searchParams.get("reviewId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [tags, setTags] = useState([]);
  const [rating, setRating] = useState(0);
  const [mediaFiles, setMediaFiles] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const maxLength = 500;

  const containerRef = useRef(null);

  const handleTagClick = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setReviewText(e.target.value);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleMediaFilesChange = (files) => {
    setMediaFiles(files);
  };

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (reviewId) {
      const loadReviewData = async () => {
        try {
          const data = await fetchReviewDetail(placeId, reviewId);
          setReviewText(data.content);
          setRating(data.rating);
          setTags(data.traitTags.map((tag) => tag.content));
        } catch (error) {
          console.error("Failed to fetch review data:", error.message);
        }
      };

      loadReviewData();
    }
  }, [reviewId, placeId]);

  const handleSubmit = async () => {
    if (!placeId || !rating || !reviewText) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    if (tags.length < 3) {
      alert("태그를 최소 3개 이상 선택해주세요.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "reviewData",
      JSON.stringify({
        content: reviewText,
        rating,
        traitTags: tags,
      })
    );
    mediaFiles.forEach((fileObj) => {
      formData.append("file", fileObj.file);
    });
  
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    try {
      setLoading(true);
      if (reviewId) {
        await updateReview(reviewId, formData);
        alert("리뷰가 수정되었습니다.");
      } else {
        await createReview(placeId, formData);
        alert("리뷰가 등록되었습니다.");
      }
      router.push(`/reviews?placeId=${placeId}`);
    } catch (error) {
      console.error("Failed to save review:", error.message);
      alert("리뷰 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
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
        <Header title={reviewId ? "리뷰 수정" : "리뷰 작성"} showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)} />
      <MainContent ref={containerRef}>
        <CategorySection />
        <Divider />
        <ProfileSection />
        <RatingSection rating={rating} onRatingChange={handleRatingChange}/>
        <AddMediaSection  mediaFiles={mediaFiles} onMediaFilesChange={handleMediaFilesChange}/>
        <ReviewTextSection
          reviewText={reviewText}
          onChange={handleReviewChange}
          maxLength={maxLength}
        />
        <TagSection tags={tags} onTagClick={handleTagClick} />
        <SubmitButton onClick={handleSubmit}>{reviewId ? "수정" : "등록"}</SubmitButton>
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
          onCancel={() => router.push(`/reviews?placeId=${placeId}`)}
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
`
