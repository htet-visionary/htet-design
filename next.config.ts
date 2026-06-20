import type { NextConfig } from "next";

const segments = ["foundations", "components", "themes", "accessibility", "tokens"];
const newBase = "/visionary-design-system";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/foundations",
        destination: `${newBase}/foundations/colors`,
        permanent: false,
      },
      {
        source: "/design-system/foundations",
        destination: `${newBase}/foundations/colors`,
        permanent: false,
      },
      {
        source: `${newBase}/foundations`,
        destination: `${newBase}/foundations/colors`,
        permanent: false,
      },
      {
        source: "/design-system",
        destination: newBase,
        permanent: false,
      },
      {
        source: "/design-system/:path*",
        destination: `${newBase}/:path*`,
        permanent: false,
      },
      ...segments.flatMap((segment) => [
        {
          source: `/${segment}`,
          destination: `${newBase}/${segment}`,
          permanent: false,
        },
        {
          source: `/${segment}/:path*`,
          destination: `${newBase}/${segment}/:path*`,
          permanent: false,
        },
      ]),
    ];
  },
};

export default nextConfig;
