"use client";

import Header from '@/components/common/Header/Header';
import { NoTitleHeader } from '@/components/common/Header/Header.stories';
import React from 'react';
import styled from 'styled-components';

const RecommendTest = () => {
  return (
    <Container>
      <Header showX={NoTitleHeader.args.showX} />
    </Container>
  );
};

export default RecommendTest;

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
`;