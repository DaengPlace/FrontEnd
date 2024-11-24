import React from 'react';
import styled from "styled-components";
import theme from '../../../styles/theme.js';

const Divider = () => {
  return (
    <DivideLine>
      
    </DivideLine>
  );
};

export default Divider;

const DivideLine = styled.div`
    width: 560px;
    height: 1px;
    background-color: ${theme.colors.divider};
    margin: 10px 0;
`;