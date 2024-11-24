import React from 'react';
import styled from "styled-components";
import theme from '../../../styles/theme.js';

const Footer = () => {
  return (
    <FooterContainer>

      <LogoSection>
        <Logo>댕댕플레이스</Logo>
        <ServiceInfo>고객센터 평일 09:00 ~ 18:00  |  점심시간 12:00 ~ 13:00</ServiceInfo>
      </LogoSection>

      <InquirySection>
        <Title>제휴 입점 및 기타 문의</Title>
        <List>
          <li>입점: daengplace@daengplace.co.kr</li>
          <li>광고: daengplaceadv@daengplace.co.kr</li>
          <li>마케팅: daengplacemkt@daengplace.co.kr</li>
          <li>언론 문의: daengplacepr@daengplace.co.kr</li>
        </List>

        <PhoneNumber>
          <Title>전화번호</Title>
          <List>
            <li>댕플 문의: 1588-1588</li>
            <li>기타 문의: 1111-2222</li>
          </List>
        </PhoneNumber>

      </InquirySection>
      <Copyright>Copyright Daengplace, Inc. All rights Reserved.</Copyright>

    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: ${theme.colors.defaultBackground};
  padding: 20px;
  font-size: 14px;
  color: ${theme.colors.divider};
`;

const LogoSection = styled.div`
  margin-bottom: 20px;
`;

const Logo = styled.div`

`;

const ServiceInfo = styled.div`
  font-size: 14px;
`;

const InquirySection = styled.div`
`;