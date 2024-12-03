import React from 'react';
import DogInfo from '../DogInfo/DogInfo';
import styled from 'styled-components';

const DogCard = ({dog}) => {
  return (
    <Card>
      <DogInfo dog={dog} />
    </Card>
  );
};

export default DogCard;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 560px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 30px;
  background-color: white;
`;