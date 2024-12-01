"use client";

import { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";

import Banner from "@/components/main/Banner/Banner.jsx";
import Menu from "@/components/main/Menu/Menu.jsx";
import FacilitiesSection from "@/components/main/FacilitiesSection/FacilitiesSection.jsx";
import Footer from "@/components/common/Footer/Footer.jsx";
import Divider from "@/components/common/Divider/Divider.jsx";
import Header from "@/components/common/Header/Header.jsx";
import { DefaultHeader } from "@/components/common/Header/Header.stories.js";
import { initialFacilities } from "@/data/facilities.js";

const images = [
    "/assets/mainpage/banner1.png",
    "/assets/mainpage/banner2.png,"
];

const MainPage = () => {
    const [age, setAge] = useState(20);
    const [gender, setGender] = useState(1); // 0 : male, 1: female

    return (
        <Container>
            <Header showLogo={DefaultHeader.args.showLogo} showHomeIcon={DefaultHeader.args.showHomeIcon} showFavoriteIcon={DefaultHeader.args.showFavoriteIcon} />
            <Banner />
            <Menu />
            <FacilitiesSection sectionTitle={<>최근 <span>인기 시설 🔥</span></>} facilities={initialFacilities} />
            <FacilitiesSection sectionTitle={<><span>{age}대 {gender===1 ? "여성" : "남성"}</span>들이 많이 찾는 👩🏻</>} facilities={initialFacilities} />
            <Divider />
            <Footer />

        </Container>
    );
};

export default MainPage;

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;

