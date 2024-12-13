import React from 'react';
import styled from 'styled-components';

const LoadingPage = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <Text>Loading...</Text>
    </LoadingContainer>
  );
};

export default LoadingPage;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #ddd;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.p`
  margin-top: 16px;
  font-size: 18px;
  color: #666;
`;