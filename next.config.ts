import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/quiz.html",
        destination: "/quiz",
        permanent: true,
      },
      {
        source: "/hormonal-skin-check-in",
        destination: "/quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
