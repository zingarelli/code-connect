/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // jeito antigo, deprecated
        // domains: [
        //     'raw.githubusercontent.com'
        // ],
        // jeito atual com remotePatterns
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'raw.githubusercontent.com',
                port: '',
                pathname: '**', // tudo o que estiver dentro de hostname
            },
        ],
    }
};

export default nextConfig;
