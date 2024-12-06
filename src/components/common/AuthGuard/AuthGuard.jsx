import { useAuth } from '@/contexts/AuthContext';
import React, { useState } from 'react';
import BottomSheet from '../BottomSheet/BottomSheet';
import { useRouter } from 'next/navigation';

const AuthGuard = ({children}) => {

  const router = useRouter();
  const { accessToken } = useAuth();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleAction = () => {
    if (!accessToken) {
      setIsBottomSheetOpen(true);
    } else {
      children.props.onClick();
    }
  };

  return (
    <>
      {React.cloneElement(children, {onClick: handleAction})}
      {isBottomSheetOpen && (
        <BottomSheet
          title="로그인이 필요한 서비스입니다"
          confirmText="로그인"
          cancelText="닫기"
          onConfirm={() => {
            setIsBottomSheetOpen(false);
            router.push('/');
          }}
          onClose={() => setIsBottomSheetOpen(false)}
        />
      )}
    </>
  );
};

export default AuthGuard;