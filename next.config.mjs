/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
  compiler: {
    styledComponents: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 경고 무시
  },
  images: {
    domains: [
      "daeng-place-profile-s3.s3.ap-northeast-2.amazonaws.com",
      "img1.kakaocdn.net",
      "t1.kakaocdn.net",
      'k.kakaocdn.net'
    ], // 이미지 호스트 추가
  },
};

export default nextConfig;
