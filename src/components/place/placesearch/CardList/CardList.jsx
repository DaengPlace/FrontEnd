import React, {memo} from "react";
import styled from "styled-components";
import Card from "../Card/Card";

const CardList = memo(({ cards, onCardClick, toggleLike }) => (
  <CardListContainer>
    {cards.map((card) => (
      <Card
        key={card.id || card.placeId}
        card={card}
        onCardClick={() => onCardClick(card.placeId)}
        toggleLike={() => toggleLike(card.placeId, card.is_favorite)}
      />
    ))}
  </CardListContainer>
));

const CardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export default CardList;
