import React from "react";
import Image from "next/image";

const Banner = () => {
  const bannerTextStyle = {
    position: "absolute",
    top: "5px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  return (
    <section style={{ marginTop: "-20px" }}>
      <Image
        src="/assets/banner3.png"
        alt="야외 공간 있는 카페"
        width={600}
        height={400}
        style={{ objectFit: "cover", right: "20px" }}
      />
      <div style={bannerTextStyle}>댕플</div>
    </section>
  );
};

export default Banner;
