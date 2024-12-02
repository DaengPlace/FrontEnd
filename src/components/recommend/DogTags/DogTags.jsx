import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

const DogTags = ({tags}) => {
  return (
    <Tags>
      {tags.map((tag, idx) => (
        <Tag key={idx}>{tag}</Tag>
      ))}
    </Tags>
  );
};

export default DogTags;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  font-size: 12px;
  padding: 5px 10px;
  background-color: ${theme.colors.defaultBackground};
  border-radius: 20px;
  color: ${theme.colors.divider};
`;
