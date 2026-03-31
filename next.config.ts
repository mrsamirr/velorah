import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Expose Supabase URL and anon key to the browser.
   * These are safe for client-side use — they are public values
   * that still require RLS policies for data access.
   */
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
