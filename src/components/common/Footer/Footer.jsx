import React from "react";
import Image from "next/image";
import logoPlace from "../../../../public/assets/mainpage/logoPlace.png"
import styled from "styled-components";

const Footer = () => {
  const footerStyle = {
    position: "relative",
    bottom: "0",
    width: "100%",
    fontSize: "12px",
    color: "${({ theme }) => theme.colors.divider}",
    padding: "0 30px",
    zIndex: "1",
  };

  return (
    <footer style={footerStyle}>
      <p style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
        <Image src={logoPlace} alt="이미지" width={30} height={30} />
        <span
          style={{
            fontSize: "20px",
            marginLeft: "5px",
            opacity: "30%",
            fontFamily: "'Gugi', sans-serif"
          }}
        >
          댕댕플레이스
        </span>
      </p>
      <div style={{ fontSize: "13px", color: "#ABABAB" }}>
        <KakaoTalk>
          <a style={{textDecoration: "underline"}} href="http://pf.kakao.com/_uGNdn"><img style={{width: "20px", }} src="/assets/kakaotalk.png" /><span>카카오톡 채널 문의 09:00 ~ 18:00</span></a>
        </KakaoTalk>
        <br></br>
        <p style={{ fontWeight: "bold" }}>제휴 입점 및 기타 문의</p>
        <p>입점 | daengplace@daengplace.co.kr</p>
        <p>광고 | daengplaceadv@daengplace.co.kr</p>
        <p>마케팅 | daengplacemkt@daengplace.co.kr</p>
        <p>언론 문의 | daengplacepr@daengplace.co.kr</p>
        <br></br>
        <p style={{ fontWeight: "bold" }}>전화번호</p>
        <p>댕플 문의 1588-1588</p>
        <p>기타 문의 1111-2222</p>
        <br></br>
        <p style={{marginBottom: "10px"}}>Copyright Daengplace, Inc. All rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

const KakaoTalk = styled.div`

  a {
    display: flex;
    align-items: center;

  }

  span {
    margin-left: 5px;
  }
`;

const LogoImage = styled(Image)`
  width: 150px;
  height: 30px;
`;