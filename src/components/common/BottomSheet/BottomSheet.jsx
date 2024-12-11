import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../Button/Button";
import theme from "@/styles/theme";

const BottomSheet = ({
  title,
  content,
  onClose,
  onConfirm,
  onCancel,
  cancelText,
  confirmText,
  setIsBottomSheetVisible,
  warningText,
}) => {
  return (
    <Overlay>
      <Sheet>
        <CloseButton onClick={onClose}>
          &times;
        </CloseButton>
        {title && <Title>{title}</Title>}
        {content && <Content>{content}</Content>}
        <ButtonContainer>
          {cancelText && (
            <Button className="cancel" onClick={onCancel || onClose}>
              {cancelText}
            </Button>
          )}
          {confirmText && (
            <Button className="confirm" isActive onClick={onConfirm}>
              {confirmText}
            </Button>
          )}
        </ButtonContainer>
        {warningText && (
          <WarningText>{warningText}</WarningText>
        )}
      </Sheet>
    </Overlay>
  );
};

BottomSheet.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  setIsBottomSheetVisible: PropTypes.func,
  warningText: PropTypes.string,
};

BottomSheet.defaultProps = {
  title: "",
  content: null,
  cancelText: "Cancel",
  confirmText: "Confirm",
  onCancel: null,
};

export default BottomSheet;

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1100;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 600px;
  background: white;
  border-radius: 16px 16px 0 0;
  padding: 25px;
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 30px;
  color: #333;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 14px;
  color: #333;
  margin: 15px 0 20px 0;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const WarningText = styled.div`
  color: ${theme.colors.caution};
  font-size: 14px;
  margin-top: 15px;
`;