"use client";

import React from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import axios from "axios";

const DropdownMenu = ({ isOpen, toggleDropdown, reviewId, placeId, accessToken, review }) => {
  const router = useRouter();
  const handleEditClick = (reviewId, placeId, event) => {
    event.stopPropagation();
    router.push(`/reviews/reviewsInput?reviewId=${reviewId}&placeId=${placeId}`);
  };

  const handleDeleteClick = (reviewId) => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      axios
        .delete(`https://api.daengplace.com/reviews/${reviewId}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then(() => {
          alert("리뷰가 삭제되었습니다.");
          router.back();
        })
        .catch((error) => {
          console.error("리뷰 삭제 실패:", error);
          alert("리뷰 삭제에 실패했습니다.");
        });
    }
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
    </DropdownWrapper>
  );
};

export default DropdownMenu;

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
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
