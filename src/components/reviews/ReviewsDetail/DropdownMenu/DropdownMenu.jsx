"use client";

import React, {useState} from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import { deleteReview } from "@/apis/review/reviewApi";
import ConfirmModal from "@/components/common/ConfirmModal/ConfirmModal";

const DropdownMenu = ({ isOpen, toggleDropdown, reviewId, placeId }) => {
  const router = useRouter();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const handleEditClick = (reviewId, placeId, event) => {
    event.stopPropagation();
    router.push(`/reviews/reviewsInput?reviewId=${reviewId}&placeId=${placeId}`);
  };

  const handleDeleteClick = async (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsConfirmModalOpen(true);
  };
  return (
    <DropdownWrapper>
      <Button onClick={toggleDropdown}>
        <MoreVertIcon />
      </Button>
      {isOpen && (
        <Menu>
          <MenuItem
            onClick={(e) => handleEditClick(reviewId, placeId, e)}
          >
            수정
          </MenuItem>
          <MenuItem onClick={(e) => {
            e.stopPropagation();
            handleDeleteClick(reviewId);
          }}>
            삭제
          </MenuItem>
        </Menu>
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          title="리뷰 삭제"
          message="정말로 삭제하시겠습니까?"
          confirmText="확인"
          onClose={async () => {
            try {
              await deleteReview(selectedReviewId);
              setIsConfirmModalOpen(false);
              router.back(); 
            } catch (error) {
              console.error("리뷰 삭제 실패:", error.message);
            }
          }}
        />
      )}
    </DropdownWrapper>
  );
};

export default DropdownMenu;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: -15px;
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  svg {
    color: #ababab;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 120%; 
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 100px;
  z-index: 100; 
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background-color: #f4f4f4;
  }
`;
