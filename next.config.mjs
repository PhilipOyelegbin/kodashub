/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ADMIN_ID: process.env.ADMIN_ID,
    ADMIN_PASS: process.env.ADMIN_PASS,
    SSP: process.env.SSP,
  },
};

export default nextConfig;
