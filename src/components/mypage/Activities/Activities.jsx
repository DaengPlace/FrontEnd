import React from 'react';
import styled from 'styled-components';
import { ChevronRight } from 'styled-icons/bootstrap';
import theme from "@/styles/theme.js";
import { useRouter } from 'next/navigation';

const Activities = () => {

  const router = useRouter();

  return (
    <Container>
      <ActivityBox>
          <ActivityItem onClick={() => router.push("/mypage/bookmark")}>
            <span>🏢</span> <p>즐겨찾는 시설 목록</p>
            <ActivityArrow>
              <StyledChevronRight />
            </ActivityArrow>
          </ActivityItem>
          <ActivityItem onClick={() => router.push("/mypage/myreviews")}>
            <span>📝</span> <p>내가 쓴 리뷰 목록</p>
            <ActivityArrow>
              <StyledChevronRight />
            </ActivityArrow>
          </ActivityItem>
        </ActivityBox>
    </Container>
  );
};

export default Activities;

const Container = styled.div`
  width: 540px; 
`;

const ActivityBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;

  span {
    padding-left: 10px;
    font-size: 20px;
    
  }

  p {
    margin-right: auto;
    padding-left: 20px;
  }

`;

const ActivityArrow = styled.div`
  padding-right: 20px;

  
`;

const StyledChevronRight = styled(ChevronRight)`
  width: 20px;
  height: 20px;
  color: ${theme.colors.divider};
  &:hover {
    color: ${theme.colors.primary};
  }
`;