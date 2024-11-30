import React, { useState } from "react";
import styled from "styled-components";
import InfoIcon from "@mui/icons-material/Info";
import BottomSheet from "@components/common/BottomSheet/BottomSheet";

const CategorySection = () => {
  const [isPolicyVisible, setIsPolicyVisible] = useState(false);

  const togglePolicySheet = () => {
    setIsPolicyVisible((prev) => !prev);
  };

  return (
    <>
      <Section>
        <HeaderRow>
          <div>
            <CategoryBadge>반려동물용품점</CategoryBadge>
            <SectionTitle>감자꽃감자 리뷰</SectionTitle>
            <VisitDate>2024.11.01 방문</VisitDate>
          </div>
          <PolicyButton onClick={togglePolicySheet}>
            <Span>리뷰 정책</Span>
            <InfoIcon style={{ fontSize: 16, color: "#B3B3B3" }} />
          </PolicyButton>
        </HeaderRow>
      </Section>

      {isPolicyVisible && (
        <BottomSheet
          title="댕댕플레이스 리뷰 정책"
          content={
            <PolicyContent>
              <ContentHeader>
                댕댕플레이스의 리뷰 정책에 맞지 않은 사진 및 글은 별도의 안내 없이<br />
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
            </PolicyContent>
          }
          onClose={togglePolicySheet}
          onConfirm={togglePolicySheet} 
          cancelText={null} 
          confirmText="확인"
        />
      )}
    </>
  );
};

export default CategorySection;

const Section = styled.div`
  margin-bottom: 16px;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
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

const SectionTitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-left: 10px;
  margin-bottom: 10px;
`;

const VisitDate = styled.span`
  font-size: 17px;
  color: #ababab;
  margin-left: 12px;
  margin-top: 10px;
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

const Span = styled.span`
  color: #ababab;
  font-size: 13px;
  margin-right: 3px;
`;

const PolicyContent = styled.div`
  font-size: 14px;
  color: #333;

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

const ContentHeader = styled.div`
  font-size: 15px;
`;

const PolicyFooter = styled.p`
  font-size: 15px;
  margin-top: 16px;
`;
