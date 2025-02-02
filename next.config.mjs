import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
}

export default withPayload(nextConfig)
