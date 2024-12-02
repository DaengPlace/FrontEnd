"use client";
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Webcam from "react-webcam";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header/Header";
import { NoTitleHeader } from "@/components/common/Header/Header.stories";

const ReceiptCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); 
  const router = useRouter();

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
  };

  const handleConfirm = () => {
    alert("이미지가 저장되었습니다!");
    router.push("/reviews/reviewScan");
  };

  return (
    <>
    <Header title="영수증 스캔" showX={NoTitleHeader.args.showX} />
    <Container>
      {capturedImage ? (
        <PreviewContainer>
          <img src={capturedImage} alt="Captured Receipt" />
          <ButtonContainer>
            <Button onClick={() => setCapturedImage(null)}>다시 찍기</Button>
            <Button onClick={handleConfirm}>확인</Button>
          </ButtonContainer>
        </PreviewContainer>
      ) : (
        <>
          <WebcamContainer>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              videoConstraints={{
                facingMode: facingMode, 
              }}
            />
          </WebcamContainer>
          <Button onClick={captureImage}>촬영</Button>
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
  height: 100vh;
  background-color: #f7f7f7;
  padding: 20px;
`;

const WebcamContainer = styled.div`
  width: 60%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    max-width: 400px;
    border: 2px solid #ccc;
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
