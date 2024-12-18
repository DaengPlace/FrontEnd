import styled from "styled-components";
import { ChevronLeft } from "@styled-icons/bootstrap/ChevronLeft";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";

const Header = ({ titleLines, onBack, onClose }) => {
  return (
    <HeaderContainer>
      <ButtonContainer>
        <CloseButton onClick={onClose}><CloseOutline size={28} /></CloseButton>
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
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const CloseButton = styled.button`
  align-items: end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.black};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.black};
  font-size: 1.4rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;
