/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint 오류가 있어도 빌드를 계속 진행
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 오류가 있어도 빌드를 계속 진행 (선택사항)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
