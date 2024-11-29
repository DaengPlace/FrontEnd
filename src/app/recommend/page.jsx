"use client";

import Header from "@/components/common/Header/Header";
import { WithBookmarkIcon } from "@/components/common/Header/Header.stories";
import styled from "styled-components";

const RecommendPage = () => {
  return (
    <Container>
      <Header title="성향별 시설 추천" showFavoriteIcon={WithBookmarkIcon.args.showFavoriteIcon} showMapIcon={WithBookmarkIcon.args.showMapIcon} />
    </Container>
  );
};

export default RecommendPage;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;