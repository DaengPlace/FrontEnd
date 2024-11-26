"use client";

import { useState } from "react";
import styled from "styled-components";
import theme from "../../styles/theme.js";

import Banner from "@/components/main/Banner/Banner.jsx";
import Menu from "@/components/main/Menu/Menu.jsx";
import FacilitiesSection from "@/components/main/FacilitiesSection/FacilitiesSection.jsx";
import Footer from "@/components/common/Footer/Footer.jsx";
import Divider from "@/components/common/Divider/Divider.jsx";

const images = [
    "/assets/mainpage/banner1.png",
    "/assets/mainpage/banner2.png,"
];

const facilities = [
    {id:1, image: "/assets/mainpage/facilityImage.png", name: "92버터샵", category: "카페", rating: 5.0},
    {id:2, image: "/assets/mainpage/facilityImage.png", name: "92버터샵", category: "카페", rating: 5.0},
    {id:3, image: "/assets/mainpage/facilityImage.png", name: "92버터샵", category: "카페", rating: 5.0},
    {id:4, image: "/assets/mainpage/facilityImage.png", name: "92버터샵", category: "카페", rating: 5.0}
];

const MainPage = () => {
    const [age, setAge] = useState(20);
    const [gender, setGender] = useState(1); // 0 : male, 1: female

    return (
        <Container>

            <Banner />
            <Menu />
            <FacilitiesSection sectionTitle={<>최근 <span>인기 시설 🔥</span></>} facilities={facilities} />
            <Divider />
            <FacilitiesSection sectionTitle={<><span>{age}대 {gender===1 ? "여성" : "남성"}</span>들이 많이 찾는 👩🏻</>} facilities={facilities} />
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
`;

