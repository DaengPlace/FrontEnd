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
import Divider from "@/components/common/Divider/Divider";
import { NoTitleHeader } from "@/components/common/Header/Header.stories";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";
import theme from "@/styles/theme";
import { Active } from "@/components/common/Button/Button.stories";

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
  const maxLength = 500;
  const [deletedMediaUrls, setDeletedMediaUrls] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState("");

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

  useEffect(() => {
    if (reviewId) {
      const loadReviewData = async () => {
        try {
          const data = await fetchReviewDetail(placeId, reviewId);
          setReviewText(data.content);
          setRating(data.rating);
          setTags(data.traitTags.map((tag) => tag.content));
          setMediaFiles(data.imageUrls.map((url) => ({ file: null, url })));
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
        deleteImageUrls: deletedMediaUrls,
      })
    );
    mediaFiles.forEach((fileObj) => {
      formData.append("file", fileObj.file);
    });
  
    try {
      setLoading(true);
      if (reviewId) {
        await updateReview(reviewId, formData);
        setConfirmModalMessage("리뷰가 수정되었습니다.");
      } else {
        await createReview(placeId, formData);
        setConfirmModalMessage("리뷰가 등록되었습니다.");
      }
      setIsConfirmModalOpen(true);
    } catch (error) {
      console.error("Failed to save review:", error.message);
      alert("리뷰 저장 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title={reviewId ? "리뷰 수정" : "리뷰 작성"} showX={NoTitleHeader.args.showX} onClose={() => setIsModalOpen(true)} />
      <MainContent ref={containerRef}>
        <HeaderWrapper>
          <CategorySection />
          <Divider />
          <ProfileSection />
        </HeaderWrapper>
        
        <BoxesWrapper>
          <RatingSection rating={rating} onRatingChange={handleRatingChange}/>
          <AddMediaSection  mediaFiles={mediaFiles} onMediaFilesChange={handleMediaFilesChange} onDeletedMediaUrlsChange={setDeletedMediaUrls}/>
          <ReviewTextSection
            reviewText={reviewText}
            onChange={handleReviewChange}
            maxLength={maxLength}
          />
          <TagSection tags={tags} onTagClick={handleTagClick} />
          <Active isActive={true} onClick={handleSubmit}>{reviewId ? "수정" : "등록"}</Active>
        </BoxesWrapper>

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
          onCancel={() => router.push(`/place/placedetail?placeId=${placeId}`)}
          onConfirm={() => setIsModalOpen(false)}
        />
      )}
      </MainContent>
      {isConfirmModalOpen && (
        <ConfirmModal
          title="알림"
          message={confirmModalMessage}
          confirmText="확인"
          onClose={() => {
            setIsConfirmModalOpen(false);
            router.push(`/reviews?placeId=${placeId}`);
          }}
        />
      )}
    </Container>
  );
};


export default ReviewsInputPage;
const Container = styled.div`
  background-color: ${theme.colors.defaultBackground};
`;

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  width: 95%;
`;

const BoxesWrapper = styled.div`
  width: 90%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;