import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        GITHUB_ORGANIZATION: process.env.GITHUB_ORGANIZATION,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        ORGANIZATION_PASSWORD: process.env.ORGANIZATION_PASSWORD,
    }
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
