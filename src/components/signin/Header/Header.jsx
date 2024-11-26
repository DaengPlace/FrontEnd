import styled from "styled-components";

const Header = ({ titleLines, onBack, onClose }) => {
  return (
    <HeaderContainer>
      <ButtonContainer>
        <BackButton onClick={onBack}>&lt;</BackButton>
        <CloseButton onClick={onClose}>x</CloseButton>
      </ButtonContainer>
      <Title>
        {titleLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </Title>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 3rem;
`;
