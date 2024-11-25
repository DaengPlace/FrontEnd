"use client";

import React from 'react';
import styled from 'styled-components';

const SectionHeader = ({header}) => {
  return (
    <Container>
      {header}
    </Container>
  );
};

export default SectionHeader;

const Container = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  width: 540px;
`;