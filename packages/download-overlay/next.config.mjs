/** @type {import('next').NextConfig} */
const config = {
  eslint: {
    // ran by itself as script command
    ignoreDuringBuilds: true,
  },

  output: process.env.NEXT_OUTPUT,
};

export default config;
