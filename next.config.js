/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: process.env.NODE_ENV !== 'production',


  };
  
  module.exports = nextConfig;
  
