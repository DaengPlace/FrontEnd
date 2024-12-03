import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Checkbox from '@/components/common/Checkbox/Checkbox';


const FeatureGroup = ({label, options, selectedValue, onSelect}) => {
  return (
    <Section>
      <Label>{label}</Label>
        <CheckboxContainer>
          {options.map((option) => (
            <Checkbox
              key={option}
              isChecked={selectedValue === option}
              onClick={() => onSelect(option)}
              label={option}
            />
          ))}
        </CheckboxContainer>
    </Section>
  );
};

export default FeatureGroup;

const Section = styled.div`
  display : flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.div`
  font-size: 14px;
  color: ${theme.colors.divider};
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;