import React from 'react';
import styled from 'styled-components';

const FeatureTitle = ({title}) => {
  return (
    <Title>
      {title}
    </Title>
  );
};

export default FeatureTitle;

const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;