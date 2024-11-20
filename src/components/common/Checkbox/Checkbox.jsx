import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Image from "next/image";

const Checkbox = ({ isChecked, onChange, label }) => {
  return (
    <CheckboxWrapper isChecked={isChecked} onClick={onChange}>
      <ImageWrapper>
        <Image
          src={
            isChecked
              ? "/assets/common/check_small.svg"
              : "/assets/common/no_check_small.svg"
          }
          alt={isChecked ? "Checked" : "Unchecked"}
          width={16}
          height={16}
        />
      </ImageWrapper>
      <Label>{label}</Label>
    </CheckboxWrapper>
  );
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

Checkbox.defaultProps = {
  label: "",
};

export default Checkbox;

const CheckboxWrapper = styled.div`
  width: 100%;
  max-width: 300px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;
  padding: 10px 20px;

  border: 1px solid
    ${({ isChecked, theme }) =>
      isChecked ? theme.colors.primary : theme.colors.divider};
  border-radius: 15px;
  background-color: ${({ isChecked, theme }) =>
    isChecked ? "#ECEFFF" : "#f9f9f9"};
  color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ isChecked, theme }) =>
      isChecked ? theme.colors.primaryHover : "#ececec"};
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors.primary : theme.colors.textSecondary};
`;
