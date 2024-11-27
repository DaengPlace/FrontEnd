import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";

const CardList = ({ cards, onCardClick, toggleLike }) => (
  <CardListContainer>
    {cards.map((card) => (
      <Card
        key={card.id}
        card={card}
        onCardClick={() => onCardClick(card.id)}
        toggleLike={toggleLike}
      />
    ))}
  </CardListContainer>
);

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default CardList;
