import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ConfirmModal = ({ title, message, onClose, confirmText }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {title && <ModalTitle>{title}</ModalTitle>}
        {message && <ModalMessage dangerouslySetInnerHTML={{ __html: message }} />}
        <ModalActions>
          <Button onClick={onClose}>{confirmText}</Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
};

ConfirmModal.defaultProps = {
  confirmText: "확인",
};

export default ConfirmModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #404040;
  margin-bottom: 10px;
`;

const ModalMessage = styled.p`
  font-size: 15px;
  color: #404040;
  margin-bottom: 20px;
  line-height: 1.4;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.primary || "#007BFF"};
  color: ${({ theme }) => theme.colors.white || "#ffffff"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover || "#0056b3"};
  }
`;
