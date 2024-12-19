import Link from 'next/link';
import React from 'react';
import styled from "styled-components";

const FacilityCard = ({image, category, name, rating, placeId}) => {

    return (
        <Link href={`/place/placedetail/?placeId=${placeId}`}>
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
    background: white;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.2s;
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
`;

const Rating = styled.p`
    font-size: 14px;
    color: #777;
    font-weight: bold;
`;