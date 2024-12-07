import Link from 'next/link';
import React from 'react';
import styled from "styled-components";

const FacilityCard = ({image, category, name, rating, link}) => {

    return (
        <Link href='/place/placedetail/?id=1'>
            <CardContainer>
                <CardImage src={image} alt={name} />
                <CardInfo>
                    <Category>{category}</Category>
                    <Name>{name}</Name>
                    <Rating>⭐️ {rating.toFixed(1)}</Rating>
                </CardInfo>
            </CardContainer>
        </Link>
    );
};

export default FacilityCard;

const CardContainer = styled.div`
    background: ${({ theme }) => theme.colors.defaultbackground};
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.2s;
    border: 1px solid ${({ theme }) => theme.colors.divider};
    width: 200px;

    &:hover {
    transform: scale(1.05);
    }
`;

const CardImage = styled.img`
    border-radius: 20px;
    width: 100%;
    object-fit: cover;
    padding:10px 10px 0 10px;
`;

const CardInfo = styled.div`
    padding: 5px 12px 12px 12px;
    display: flex-col;
`;

const Category = styled.span`
    display: inline-block;
    background: ${({ theme }) => theme.colors.tertiary};
    color: white;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 4px;
    margin-bottom: 8px;
`;

const Name = styled.h4`
    font-size: 16px;
`;

const Rating = styled.p`
    font-size: 14px;
    color: #777;
    font-weight: bold;
`;