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
        source: "/quiz",
        destination: "/hormonal-skin-check-in",
        permanent: true,
      },
      {
        source: "/quiz.html",
        destination: "/hormonal-skin-check-in",
        permanent: true,
      },
      {
        source: "/cart",
        destination: "/#founding",
        permanent: false,
      },
      {
        source: "/checkout",
        destination: "/#founding",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
