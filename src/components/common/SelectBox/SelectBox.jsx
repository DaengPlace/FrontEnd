import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SelectBox = ({ options, selectedValue, onChange, placeholder, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <SelectWrapper 
    onClick={() => setIsOpen((prev) => !prev)}
    disabled={disabled}
    >
      <SelectedItem disabled={disabled}>
        <SelectText>
          {selectedValue
            ? options.find((option) => option.value === selectedValue)?.label
            : placeholder}
        </SelectText>
        <IconWrapper>
          {!disabled && isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </IconWrapper>
      </SelectedItem>
      {isOpen && !disabled && (
        <OptionsContainer>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectChange(option.value);
              }}
            >
              {option.label}
            </OptionItem>
          ))}
        </OptionsContainer>
      )}
    </SelectWrapper>
  );
};

SelectBox.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SelectBox.defaultProps = {
  placeholder: "선택하세요",
};

export default SelectBox;

const SelectWrapper = styled.div`
  width: 100%;
  height: 64px;
  max-width: 300px;
  position: relative;
  cursor: pointer;
`;

const SelectedItem = styled.div`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #040404;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 15px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectText = styled.span`
  flex: 1;
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 16px;
  color: #333;
  position: absolute;
  right: 12px;
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  margin-top: 4px;
  z-index: 999;
  max-height: 300px;
  overflow-y: auto;
`;

const OptionItem = styled.div`
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #f0f0f0;
  }
`;
