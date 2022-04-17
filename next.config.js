/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/card-pack",
                destination: "/browse",
                permanent: true,
            },
        ];
    },
    images: {
        domains: ["quizlet.com", "loremflickr.com", "ucarecdn.com"],
    },
};

module.exports = nextConfig;
