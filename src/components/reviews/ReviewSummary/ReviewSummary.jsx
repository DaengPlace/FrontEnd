import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";

const ReviewSummary = ({ averageRating, reviewCount }) => {
    const router = useRouter();
    const [isReviewBottomSheetOpen, setIsReviewBottomSheetOpen] = useState(false);
    const fileInputRef = useRef(null);
    
    const handleWriteReviewClick = () => {
        setIsReviewBottomSheetOpen(true); 
      };

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
        setIsReviewBottomSheetOpen(false);
        router.push("/reviews/reviewScan");
      }
    };  
  return (
    <SummaryContainer>
      <Rating>
        ⭐ {averageRating.toFixed(1)}
      </Rating>
      <WriteReviewButton onClick={handleWriteReviewClick}>리뷰 작성하기</WriteReviewButton>
      {isReviewBottomSheetOpen && (
          <>
            <BottomSheet
              title="리뷰 작성을 위해"
              content={
                <StyledContent>
                  <p>해당 시설에서 발급받은 영수증을 스캔해주세요</p>
                </StyledContent>
              }
              onClose={() => setIsReviewBottomSheetOpen(false)}
              onCancel={handleButtonClick}
              onConfirm={() => {
                setIsReviewBottomSheetOpen(false);
                router.push("/reviews/receiptCapture");
              }}
              cancelText="사진 업로드"
              confirmText="영수증 촬영"
            />
            <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />
          </>
        )}
    </SummaryContainer>
  );
};

export default ReviewSummary;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const Rating = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const WriteReviewButton = styled.button`
  padding: 5px 5px;
  background-color: ${({ theme }) => theme.colors.defaultBackground};
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  width: 138px;
  height: 36px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }
  margin-bottom: 0;
  margin-top: 10px;
  margin-right: 10px;
`;
const StyledContent = styled.div`
  margin: -10px 0 30px 0;
  font-size: 18px;
  font-weight: bold;
  text-align: center;

  p {
    line-height: 1.5;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;