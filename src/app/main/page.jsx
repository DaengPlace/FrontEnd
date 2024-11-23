"use client";

import FacilityCard from "@/components/main/FacilityCard/FacilityCard";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import theme from '../../styles/theme.js';

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

            <Banner>
                <BannerImage
                    src="/assets/mainpage/banner1.png" alt="banner image"
                />
            </Banner>

            <Menu>
                <MenuItem>
                    <Link href='/recommend'>
                        <MenuImage src='/assets/mainpage/recommendIcon.png' /><MenuDescription>성향별 추천</MenuDescription>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href='/search'>
                        <MenuImage src='/assets/mainpage/daengplaceIcon.png' /><MenuDescription>댕플</MenuDescription>
                    </Link>
                </MenuItem>

                <MenuItem>
                    <Link href='/user'>
                        <MenuImage src='/assets/mainpage/bookmarkIcon.png' /><MenuDescription>즐겨찾기</MenuDescription>
                    </Link>
                </MenuItem>
            </Menu>

            <PopularFacilities>
                <SectionTitle>최근 <span style={{color: theme.colors.primary}}>인기 시설 🔥</span></SectionTitle>
                <CardContainer>
                    {facilities.slice(0, 5).map((fac) => (
                        <FacilityCard
                            key={fac.id}
                            image={fac.image}
                            category={fac.category}
                            name={fac.name}
                            rating={fac.rating}
                        />
                    ))}
                </CardContainer>
            </PopularFacilities>

            <AgeGenderFacilities>
                <SectionTitle><span style={{color: theme.colors.primary}}>{age}대 {gender===1? '여성' :'남성'}</span>들이 많이 찾는 👩🏻</SectionTitle>
                <CardContainer>
                    {facilities.slice(0, 5).map((fac) => (
                        <FacilityCard
                            key={fac.id}
                            image={fac.image}
                            category={fac.category}
                            name={fac.name}
                            rating={fac.rating}
                        />
                    ))}
                </CardContainer>

            </AgeGenderFacilities>

            <Divider />

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

const Banner = styled.div`
    text-align: center;
`;

const BannerImage = styled.img`
    width: 100%;
`;

const Menu = styled.div`
    display: flex;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    border-radius: 20px;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    padding: 20px 30px;
    background-color: white;
    width: 550px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.div`
    display: flex-col;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
`;

const MenuImage = styled.img`
    width: 80px;
    height: 80px;
`;

const MenuDescription = styled.div`
    padding-top: 10px;
`;

const Facility = styled.div`
    width: 100%;
    text-align: left;
    margin: 2px 12px;
    padding-left: 20px;
`;

const PopularFacilities = styled(Facility)``;
const AgeGenderFacilities = styled(Facility)``;

const SectionTitle = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const CardContainer = styled.div`
    display: flex;
    gap: 16px;
    margin: 10px 0;
    overflow-x: auto;
    white-space: nowrap;
    padding: 5px 25px 10px 5px;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.colors.divider};
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.defaultBackground}; /* 스크롤바 배경 */
    }
`;

const Divider = styled.div`
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;


