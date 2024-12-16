import React, { useRef, useState } from "react";
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';

const AddMediaSection = ({ mediaFiles, onMediaFilesChange, onDeletedMediaUrlsChange }) => {
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click();
    };
  
    const handleFileChange = (event) => {
      const files = Array.from(event.target.files);
      const filePreviews = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      onMediaFilesChange([...mediaFiles, ...filePreviews]); 
    };
  
    const handleRemoveFile = (index) => {
      const removedFile = mediaFiles[index];
      if (removedFile.url && !removedFile.file) {
        onDeletedMediaUrlsChange((prev) => [...prev, removedFile.url]);
      }
      const updatedFiles = mediaFiles.filter((_, i) => i !== index);
      onMediaFilesChange(updatedFiles); 
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
        <PreviewContainer>
        {mediaFiles.map((fileObj, index) => (
          <PreviewItem key={index}>
            {fileObj.url ? ( 
              fileObj.file ? ( 
                <PreviewImage src={fileObj.url} alt="새 이미지 미리보기" />
              ) : (
                <PreviewImage src={fileObj.url} alt="기존 이미지" />
              )
            ) : null}
            <RemoveButton onClick={() => handleRemoveFile(index)}>X</RemoveButton>
          </PreviewItem>
        ))}
      </PreviewContainer>
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

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const PreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const PreviewVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`;