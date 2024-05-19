/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:
            process.env.NODE_ENV === 'production'
                ? [{ protocol: 'https', hostname: '*.googleusercontent.com' }]
                : [
                      { protocol: 'http', hostname: '**' },
                      { protocol: 'https', hostname: '**' },
                  ],
    },
}

export default nextConfig
