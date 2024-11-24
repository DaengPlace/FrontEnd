import React from "react";
import Image from "next/image";

const ReviewList = ({ reviews }) => {
  const reviewCardStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    marginTop : "10px",
  };

  const categoryBadgeStyle = {
    display: "inline-block",
    padding: "3px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    background: "#01003F",
    borderRadius: "20px",
    marginRight: "10px",
    textAlign: "center",
    width: 114,
    height: 24,
  };

  const imageStyle = {
    borderRadius: "10px",
    objectFit: "cover",
  };

  const reviewNumberStyle = {
    position: "absolute",
    top: "50px",
    left: "10px",
    color: "#0019F4",
    fontSize: "20px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {reviews.map((review) => (
        <div key={review.id} style={reviewCardStyle}>
          <div style={reviewNumberStyle}>{review.id}</div>
          <div style={{marginLeft:"20px"}}>
            <span style={categoryBadgeStyle}>{review.category}</span>
            <span style={{ fontWeight: "bold" }}>{review.title}</span>
            <p style={{ fontSize: "16px", color: "#ABABAB", marginTop: "5px" }}>
              {review.author} | {review.date} 작성
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "#000000",
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              {review.review}
            </p>
            <hr style={{ marginTop: "20px", width: "150%", marginLeft:"-37px" }}></hr>
          </div>
          <Image
            src={review.image}
            alt={`리뷰 이미지 ${review.id}`}
            width={80}
            height={80}
            style={imageStyle}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
