import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const DogPersonality = ({personality}) => {
  return (
    <Container>
      <PersonalityColumn>
        <Label>활동성</Label>
        <Label>타견 사교성</Label>
        <Label>대인관계</Label>
      </PersonalityColumn>

      <PersonalityColumn>
        <Description>{personality.activity}</Description>
        <Description>{personality.sociality}</Description>
        <Description>{personality.relation}</Description>
      </PersonalityColumn>

    </Container>
  );
};

export default DogPersonality;

const Container = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.colors.divider};
  padding-bottom: 10px;
`;

const PersonalityColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 14px;
`;

const Label = styled.div`
  font-weight: bold;
  color: ${theme.colors.divider};
`;

const Description = styled.div`
  padding-left: 20px;
  color: black;
`;