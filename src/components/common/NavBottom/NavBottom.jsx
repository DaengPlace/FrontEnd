import React from "react";
import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, Map, Star, User } from "styled-icons/boxicons-regular";

const tabs = [
  { label: "댕플", path: "/place", icon: Map },
  { label: "검색", path: "/search", icon: Search },
  { label: "홈", path: "/main", icon: Home },
  { label: "추천", path: "/recommend", icon: Star },
  { label: "마이페이지", path: "/user", icon: User },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTabClick = (path) => {
    router.push(path);
  };

  return (
    <Container>
      {tabs.map((tab, index) => {
        const isSelected = pathname === tab.path;
        const IconComponent = tab.icon;
        return (
          <Tab
            key={index}
            onClick={() => handleTabClick(tab.path)}
            selected={isSelected}
          >
            <Icon as={IconComponent} selected={isSelected} size="24" />
            <Label selected={isSelected}>{tab.label}</Label>
          </Tab>
        );
      })}
    </Container>
  );
};

export default BottomNav;

const Container = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 34px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.05);
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.divider};
  gap: 2px;
`;

const Icon = styled.svg`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.divider};
`;

const Label = styled.span`
  font-size: 12px;
  color: ${({ selected, theme }) =>
    selected ? theme.colors.black : theme.colors.divider};
`;
