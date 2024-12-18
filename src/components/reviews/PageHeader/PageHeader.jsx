"use client";
import React, { useState } from "react";
import styled from "styled-components";
import InfoIcon from '@mui/icons-material/Info';
import { Active } from "@/components/common/Button/Button.stories";

const PageHeader = ({ placeName, category, reviewCount }) => {
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);

  const togglePolicySheet = () => {
    setIsPolicyVisible((prev) => !prev);
  };

  return (
    <>
      <CategoryBadge>{category}</CategoryBadge>
      <HeaderContainer>
        <HeaderTitle>{placeName} 리뷰 ({reviewCount})</HeaderTitle>
        <PolicyButton onClick={togglePolicySheet}>
            <Span>리뷰 정책</Span>
            <InfoIcon style={{ fontSize: 16, color: "#B3B3B3" }} />
        </PolicyButton>
      </HeaderContainer>
      {isPolicyVisible && <ReviewPolicyBottomSheet onClose={togglePolicySheet} />}
    </>
  );
};

export default PageHeader;

const ReviewPolicyBottomSheet = ({ onClose }) => (
  <Overlay>
    <PolicySheet>
      <PolicyHeader>
        <PolicyTitle>댕댕플레이스 리뷰 정책</PolicyTitle>
        <CloseButton onClick={onClose}>X</CloseButton>
      </PolicyHeader>
      <PolicyContent>
        <ContentHeader>
        댕댕플레이스의 리뷰 정책에 맞지 않은 사진 및 글은 별도의 안내 없이<br></br>
        블라인드 처리 및 리뷰 작성권한을 중지 또는 계약 해지될 수 있습니다.
        </ContentHeader>
        <ul>
          <li>1. 장소 사진 및 이용한 이용 상품과 관련된 사진(장소 내 소품 등)이 아닌 경우</li>
          <li>2. 저작권법에 위반된 경우</li>
          <li>3. 장소와 관련 없는 이미지(선정성, 광고, 장소 사진이 아닌 경우 등)의 경우</li>
          <li>4. 욕설, 폭언, 비방 등 타인에 불쾌하거나 위협이 되는 내용의 경우</li>
          <li>5. 동일 문구나 반복 등 리뷰로 볼 수 없는 경우</li>
          <li>6. 고객 본인 또는 타인의 신상 또는 연락처 등의 개인 정보가 노출된 경우</li>
          <li>7. 장소와 관련 없는 이용한 후기 내용의 리뷰를 작성한 경우</li>
          <li>8. 발생하지 않았던 일에 대해 허위로 작성한 경우</li>
          <li>9. 타업체가 언급되었거나 상업적인 홍보의 목적으로 작성된 경우</li>
          <li>
            10. 음란물 또는 청소년 유해 매체물, 범죄행위와 불법적인 행동을 전시 또는 조장하는
            내용을 작성한 경우
          </li>
          <li>11. 기타 관련 법령 및 이용 약관과 운영정책에 위반하는 내용을 작성한 경우</li>
        </ul>
        <PolicyFooter>
          고객에 의 사항을 위반하여 발생하는 고객 또는 제3자에 모든 피해에 대해 댕댕플레이스는 책임지지 않으며, 게시된 내용에 대한 모든 책임은 고객에게 있습니다.
        </PolicyFooter>
        <Active isActive={true} onClick={onClose}>확인</Active>
      </PolicyContent>
    </PolicySheet>
  </Overlay>
);

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
`;


const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const PolicyButton = styled.button`
  background: none;
  border: none;
  display: flex;
  color: #007aff;
  cursor: pointer;
  margin-right: 10px;
  align-items: center;
`;


const CategoryBadge = styled.div`
  display: inline-block;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background: #01003f;
  border-radius: 20px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PolicySheet = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  max-width: 600px;
  right: 0;
  background: #fff;
  border-radius: 16px 16px 0 0;
  padding: 16px;
  overflow-y: auto;
  
`;

const PolicyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentHeader = styled.div`
  font-size: 15px;
`
const PolicyTitle = styled.h3`
  font-size: 24;
  font-weight: bold;
  padding: 10px;
  margin-bottom: -20px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const PolicyContent = styled.div`
  margin-top: 16px;
  padding: 20px;

  ul {
    list-style: none;
    padding: 0;
    margin-top: 20px;

    li {
      font-size: 15px;
      margin-bottom: 8px;
    }
  }
`;

const PolicyFooter = styled.p`
  font-size: 15px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const Span = styled.span`
  color: #ABABAB;
  font-size: 13px;
  margin-right: 3px;
`
