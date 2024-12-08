import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import BottomSheet from "@/components/common/BottomSheet/BottomSheet";
import axios from "axios";
import useReviewStore from "@/stores/reviewStore";

const ReviewSummary = ({ averageRating, reviewCount }) => {
    const router = useRouter();
    const [isReviewBottomSheetOpen, setIsReviewBottomSheetOpen] = useState(false);
    const fileInputRef = useRef(null);
    const { placeName, setVisitDate } = useReviewStore();
    
    const handleWriteReviewClick = () => {
        setIsReviewBottomSheetOpen(true); 
      };

    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = async (event) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const selectedFile = files[0];
  
        try {
          const formData = new FormData();
          formData.append("file", selectedFile, "receipt.jpg");
  
          const uploadResponse = await axios.post("https://api.daengplace.com/ocr/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          if (uploadResponse.status === 200) {
            const filePath = uploadResponse.data;
  
            const analyzeResponse = await axios.post(
              "https://api.daengplace.com/ocr/analyze",
              null,
              { params: { filePath: filePath } }
            );
  
            if (analyzeResponse.status === 200) {
              const extractedTexts = analyzeResponse.data;
              const combinedText = extractedTexts.join("");
              console.log("Extracted texts:", combinedText);
  
              if (combinedText.includes(placeName)) {
                const visitDateMatch = combinedText.match(/\d{4}[./-]\d{2}[./-]\d{2}/);
                const visitDate = visitDateMatch ? visitDateMatch[0].replace(/[\/-]/g, ".") : "날짜 없음";
                console.log("Extracted visit date:", visitDate);
                setVisitDate(visitDate);
  
                alert("영수증에 장소명이 확인되었습니다!");
                router.push("/reviews/reviewScan");
              } else {
                alert("영수증에 해당 장소명이 포함되어 있지 않습니다. 다시 촬영해주세요.");
                setIsReviewBottomSheetOpen(false);
              }
            } else {
              console.error("Failed to analyze text:", analyzeResponse.statusText);
            }
          } else {
            console.error("Failed to upload image:", uploadResponse.statusText);
          }
        } catch (error) {
          console.error("Error during file upload:", error);
        }
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