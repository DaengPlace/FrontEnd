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
            <WebcamFullContainer>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: facingMode,
                }}
                style={{ width: "100%", height: "100%",objectFit: "cover", }}
              />
              <Overlay>
                <TopOverlay />
                <BottomOverlay />
                <LeftOverlay />
                <RightOverlay />
                <GreenBox />
              </Overlay>
            </WebcamFullContainer>
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
  height: calc(100%);
  padding: 0;
  margin: 0;
`;

const WebcamFullContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc((100% - 70%) / 2);
  background-color: rgba(128, 128, 128, 0.5);
`;

const BottomOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc((100% - 70%) / 2); 
  background-color: rgba(128, 128, 128, 0.5);
`;

const LeftOverlay = styled.div`
  position: absolute;
  top: calc((100% - 70%) / 2); 
  left: 0;
  width: calc((100% - 70%) / 2);
  height: 70%; 
  background-color: rgba(128, 128, 128, 0.5);
`;

const RightOverlay = styled.div`
  position: absolute;
  top: calc((100% - 70%) / 2); 
  right: 0;
  width: calc((100% - 70%) / 2);
  height: 70%;
  background-color: rgba(128, 128, 128, 0.5);
`;

const GreenBox = styled.div`
  position: absolute;
  width: 70%;
  height: 70%;
  top: calc((100% - 70%) / 2);
  right:calc((100% - 70%) / 2);
  border: 3px solid green;
  background-color: transparent;
  z-index: 2;
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
  position: absolute;
  bottom: 5%;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100px;
  height: 50px;

  &:hover {
    background-color: #0056b3;
  }
`;
