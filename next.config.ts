import type { NextConfig } from "next";

const segments = ["foundations", "components", "themes", "accessibility", "tokens"];

const nextConfig: NextConfig = {
  async redirects() {
    return segments.flatMap((segment) => [
      {
        source: `/${segment}`,
        destination: `/design-system/${segment}`,
        permanent: false,
      },
      {
        source: `/${segment}/:path*`,
        destination: `/design-system/${segment}/:path*`,
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
