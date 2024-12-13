import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleAction = (e) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 전파 방지
    if (!accessToken) {
      setIsBottomSheetOpen(true); // 로그인 필요 알림
    } else {
      children.props.onClick(e); // 로그인된 경우 원래 onClick 실행
    }
  };

  return (
    <>
      {React.cloneElement(children, { onClick: handleAction })}
      {isBottomSheetOpen && (
        <>
          <BottomSheet
            title="로그인이 필요한 서비스입니다"
            confirmText="로그인"
            cancelText="닫기"
            onConfirm={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsBottomSheetOpen(false);
              router.push('/'); // 로그인 페이지로 이동
            }}
            onClose={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsBottomSheetOpen(false)
            }} // 닫기 버튼
          />
        </>
      )}
    </>
  );
};

export default AuthGuard;