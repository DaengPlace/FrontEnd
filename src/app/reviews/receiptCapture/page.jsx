"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/common/Header/Header";
import { NoTitleHeader } from "@/components/common/Header/Header.stories";
import useReviewStore from "@/stores/reviewStore";

const ReceiptCapture = () => {
  return (
    <Suspense>
      <ActualReceiptCapture />
    </Suspense>
  )
}

const ActualReceiptCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const searchParams = useSearchParams();
  const placeId = searchParams.get("placeId");
  const [facingMode, setFacingMode] = useState("user");
  const router = useRouter();
  const { placeName, setVisitDate } = useReviewStore();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.userAgentData;
    if (/Mobi|Android|iPhone/i.test(userAgent)) {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  }, []);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    sendImageToServer(imageSrc);
  };

  const sendImageToServer = async (imageData) => {
    try {
      const blob = base64ToBlob(imageData);
      const formData = new FormData();
      formData.append("file", blob, "receipt.jpg");

      const uploadResponse = await axios.post("https://api.daengplace.com/ocr/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.status === 200) {
        const filePath = uploadResponse.data;
        console.log("File uploaded successfully. Path:", filePath);

        const analyzeResponse = await axios.post(
          "https://api.daengplace.com/ocr/analyze",
          null,
          {
            params: { filePath: filePath },
          }
        );

        if (analyzeResponse.status === 200) {
          const extractedTexts = analyzeResponse.data;
          const combinedText = extractedTexts.join("");
          console.log("Extracted texts:", combinedText);
          console.log("Stored place name:", placeName);
        if (combinedText.includes(placeName)) {
          const visitDateMatch = combinedText.match(/\d{4}[./-]\d{2}[./-]\d{2}/);
          const visitDate = visitDateMatch ? visitDateMatch[0].replace(/[\/-]/g, ".") : "날짜 없음";

          console.log("Extracted visit date:", visitDate);

          setVisitDate(visitDate);

          alert("영수증에 장소명이 확인되었습니다!");
          setTimeout(() => {
            router.push("/reviews/reviewScan");
          }, 0);
        } else {
          alert("영수증에 해당 장소명이 포함되어 있지 않습니다.");
          setCapturedImage(null);
        }
      } else {
        console.error("Failed to analyze text:", analyzeResponse.statusText);
      }
    } else {
      console.error("Failed to upload image:", uploadResponse.statusText);
    }
  } catch (error) {
    console.error("Error sending image to server:", error);
  }
};

  const base64ToBlob = (base64) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeString });
  };

  const handleCloseClick = () => {
    router.push(`/place/placedetail?placeId=${placeId}`);
  };

  return (
    <>
      <Header title="영수증 스캔" showX={NoTitleHeader.args.showX} onClose={handleCloseClick} />
      <Container>
        {capturedImage ? (
          <PreviewContainer>
            <img src={capturedImage} alt="Captured Receipt" />
            <ButtonContainer>
              <Button className="retry" onClick={() => setCapturedImage(null)}>
                다시 찍기
              </Button>
              <Button className="confirm" onClick={() => router.push("/reviews/reviewScan")}>
                확인
              </Button>
            </ButtonContainer>
          </PreviewContainer>
        ) : (
          <>
            <WebcamFullContainer>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={{
                  facingMode: facingMode,
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </WebcamFullContainer>
            <CaptureButton onClick={captureImage}>촬영</CaptureButton>
          </>
        )}
      </Container>
    </>
  );
};

export default ReceiptCapture;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0;
  margin: 0;
;`

const WebcamFullContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
;`

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 90%; 
    max-width: 600px; 
    height: auto; 
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }`
;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
;`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #0019f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
;`

const CaptureButton = styled.button`
  position: absolute;
  bottom: 5%;
  width: 20%;
  height: 5%;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #0019f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
;`