"use client";

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../Button/Button";

const BottomSheet = ({
  title,
  content,
  onClose,
  onConfirm,
  cancelText = "취소",
  confirmText = "확인",
  isDanger = false,
  styleVariant = "default",
}) => {
  return (
    <Overlay>
      <Sheet styleVariant={styleVariant}>
        {title && <Title>{title}</Title>}
        {content && <Content styleVariant={styleVariant}>{content}</Content>}
        <ButtonContainer styleVariant={styleVariant}>
          <Button className="cancel" onClick={onClose}>
            {cancelText}
          </Button>
          <Button className="confirm" isActive onClick={onConfirm}>
            {confirmText}
          </Button>
        </ButtonContainer>
      </Sheet>
    </Overlay>
  );
};

BottomSheet.propTypes = {
  title: PropTypes.string,
  content: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  isDanger: PropTypes.bool,
  styleVariant: PropTypes.oneOf(["default", "compact"]),
};

BottomSheet.defaultProps = {
  title: "",
  content: null,
  cancelText: "Cancel",
  confirmText: "Confirm",
  isDanger: false,
  styleVariant: "default",
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
  z-index: 1000;
`;

const Sheet = styled.div`
  width: 100%;
  max-width: 500px;
  background: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: ${(props) => (props.styleVariant === "compact" ? "10px" : "20px")};
  box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
  text-align: center;
`;

const Content = styled.div`
  font-size: ${(props) => (props.styleVariant === "compact" ? "12px" : "14px")};
  color: #333;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
