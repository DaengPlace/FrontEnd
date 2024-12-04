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
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.userAgentData;
    if (/Mobi|Android|iPhone/i.test(userAgent)) {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  }, []);

  useEffect(() => {
    if (webcamRef.current) {
      console.log("facingMode:", facingMode);
      console.log("webcamRef:", webcamRef.current);

      const hasUserMedia = webcamRef.current?.state?.hasUserMedia;
      console.log("Webcam initialized:", hasUserMedia);
      setIsInitialized(hasUserMedia); 
    }
  }, [facingMode, webcamRef]);

  const captureImage = () => {

    const imageSrc = webcamRef.current.getScreenshot();
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const greenBoxWidth = img.width * 0.435;
      const greenBoxHeight = img.height * 0.7;
      const greenBoxX = img.width * 0.29;
      const greenBoxY = img.height * 0.3 / 2;

      canvas.width = greenBoxWidth;
      canvas.height = greenBoxHeight;

      ctx.drawImage(
        img,
        greenBoxX,
        greenBoxY,
        greenBoxWidth,
        greenBoxHeight,
        0,
        0,
        greenBoxWidth,
        greenBoxHeight
      );

      setCapturedImage(canvas.toDataURL("image/jpeg"));
    };
  };

  const handleConfirm = () => {
    if (capturedImage) {
      router.push("/reviews/reviewScan");
    }
  };

  return (
    <>
      <Header title="영수증 스캔" showX={NoTitleHeader.args.showX} />
      <Container>
        {capturedImage ? (
          <PreviewContainer>
            <img src={capturedImage} alt="Captured Receipt" />
            <ButtonContainer>
              <Button className="retry" onClick={() => setCapturedImage(null)}>다시 찍기</Button>
              <Button className="confirm" onClick={handleConfirm}>확인</Button>
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
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${({ className }) =>
    className === "confirm" ? "#0019F4" : "#0019F4"};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${({ className }) =>
      className === "confirm" ? "#0056b3" : "#0056b3"};
  }
`;


const CaptureButton = styled.button`
  position: absolute;
  bottom: 5%;
  width: 20%;
  height: 5%;
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