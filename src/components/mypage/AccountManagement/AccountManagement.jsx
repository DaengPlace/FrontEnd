import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme.js';
import { ChevronRight } from 'styled-icons/bootstrap';
import dynamic from 'next/dynamic';
import { NoTitle, Danger } from "@/components/common/Modal/Modal.stories";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
const Modal = dynamic(() => import("@/components/common/Modal/Modal"), {ssr: false});

const AccountManagement = () => {

  const [LogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [quitModalOpen, setQuitModalOpen] = useState(false);

  const router = useRouter();
  const {logout} = useAuth();

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const closeQuitModal = () => {
    setQuitModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  } 

  return (
    <Container>
      <ActivityBox>
        <ActivityItem>
          <p>로그아웃</p>
          <ActivityArrow>
            <StyledChevronRight onClick={() => setLogoutModalOpen(true)} />
          </ActivityArrow>
        </ActivityItem>
        <ActivityItem>
          <p>회원 탈퇴</p>
          <ActivityArrow>
            <StyledChevronRight onClick={() => setQuitModalOpen(true)} />
          </ActivityArrow>
        </ActivityItem>
      </ActivityBox>

      {LogoutModalOpen && (
        <Modal
          title={NoTitle.args.title}
          cancelText={NoTitle.args.cancelText}
          confirmText={NoTitle.args.confirmText}
          onCancel={closeLogoutModal}
          onConfirm={() => {
            closeLogoutModal();
            handleLogout();
          }}
        />
      )}

      {quitModalOpen && (
        <Modal
          title={Danger.args.title}
          message={Danger.args.message}
          cancelText={Danger.args.cancelText}
          confirmText={Danger.args.confirmText}
          isDanger={Danger.args.isDanger}
          onCancel={closeQuitModal}
          onConfirm={() => {
            closeQuitModal();
          }}
        />
      )}

    </Container>
  );
};

export default AccountManagement;

const Container = styled.div`
  width: 90%; 
`;

const ActivityBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  padding: 10px 0;

  span {
    padding-left: 10px;
    font-size: 20px;
  }

  p {
    margin-right: auto;
    padding-left: 20px;
  }
`;

const ActivityArrow = styled.div`
  padding-right: 20px;
`;

const StyledChevronRight = styled(ChevronRight)`
  width: 20px;
  height: 20px;
  color: ${theme.colors.divider};

  &:hover {
    color: ${theme.colors.primary};
  }
`;
