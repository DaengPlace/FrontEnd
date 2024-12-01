"use client";

import Header from "@/components/common/Header/Header";
import { OnlyHomeIcon } from "@/components/common/Header/Header.stories";
import { ChevronRight } from "styled-icons/bootstrap";

const MyProfilePage = () => {
  return (
    <>
      <Header
        title="프로필 수정"
        showHomeIcon={OnlyHomeIcon.args.showHomeIcon}
        showFavoriteIcon={OnlyHomeIcon.args.showFavoriteIcon}
        showMapIcon={OnlyHomeIcon.args.showMapIcon}
      />

      <h1>MyPageProfilePage</h1>
    </>
  );
};

export default MyProfilePage;
