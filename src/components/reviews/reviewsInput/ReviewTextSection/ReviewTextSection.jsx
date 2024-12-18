import React from "react";
import styled from "styled-components";

const ReviewTextSection = ({ reviewText, onChange, maxLength }) => (
  <Section>
    <SubTitle>리뷰 작성</SubTitle>
    <ReviewTextarea
      placeholder="여기에 리뷰를 작성해 주세요"
      value={reviewText}
      onChange={onChange}
    />
    <CharacterCount>
      {reviewText.length} / {maxLength}
    </CharacterCount>
  </Section>
);

export default ReviewTextSection;

const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.2);
  border-radius: 20px;
  padding: 15px 25px 20px;
  background-color: white;
`;

const SubTitle = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 5px;
`;

const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 20;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  resize: none;
  outline: none;
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #ababab;
  margin-top: 5px;
`;
