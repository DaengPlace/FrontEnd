import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Modal = ({
  title,
  message,
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  isDanger,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        {title && <ModalTitle hasMessage={!!message}>{title}</ModalTitle>}
        {message && <ModalMessage>{message}</ModalMessage>}
        <ModalActions>
          <Button className="cancel" onClick={onCancel} isPrimary={!isDanger}>
            {cancelText}
          </Button>
          <Button className="confirm" isDanger={isDanger} onClick={onConfirm}>
            {confirmText}
          </Button>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  isDanger: PropTypes.bool,
};

Modal.defaultProps = {
  cancelText: "취소",
  confirmText: "확인",
  isDanger: false,
};

export default Modal;

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
  width: 90%;
  max-width: 400px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #404040;
  margin-bottom: ${(props) => (props.hasMessage ? "10px" : "40px")};
`;

const ModalMessage = styled.p`
  font-size: 14px;
  color: #404040;
  margin-bottom: 20px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &.cancel {
    background-color: ${(props) =>
      props.isPrimary
        ? props.theme.colors.secondary
        : props.theme.colors.deactivate};
    color: ${(props) => (props.isPrimary ? "#9FA9FF" : "white")};
  }

  &.cancel:hover {
    background-color: ${(props) =>
      props.isPrimary ? props.theme.colors.secondaryHover : "#e0e0e0"};
  }

  background-color: ${(props) =>
    props.isDanger ? props.theme.colors.caution : props.theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &.confirm:hover {
    background-color: ${(props) =>
      props.isDanger
        ? props.theme.colors.cautionHover
        : props.theme.colors.primaryHover};
  }
`;
