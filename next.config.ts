import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The legacy site served these pages as .html files, and those URLs are what
  // the Play Console listing points at. Keep them working permanently.
  async redirects() {
    return [
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/account-deletion.html", destination: "/account-deletion", permanent: true },
    ];
  },
};

export default nextConfig;
