import React, { useRef } from "react";
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';

const AddMediaSection = () => {
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const files = event.target.files;
    };
  
    return (
      <Section>
        <Media>
          <SubTitle>사진/영상을 추가해 주세요</SubTitle>
          <AddMediaButton onClick={handleButtonClick}>
            <AddIcon style={{ fontSize: "50px", color: "#0019F4" }} />
          </AddMediaButton>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />
        </Media>
      </Section>
    );
  };

export default AddMediaSection;

const Section = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 10px 20px;
`;

const SubTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const Media = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`
const AddMediaButton = styled.button`
  width: 80px;
  height: 80px;
  border: none;
  background-color: #ECEFFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const HiddenFileInput = styled.input`
  display: none; 
`;