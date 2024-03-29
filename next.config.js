/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: "/cardpack",
                destination: "/browse",
                permanent: true,
            },
        ];
    },
    images: {
        domains: [
            "quizlet.com",
            "loremflickr.com",
            "ucarecdn.com",
            "cdn.discordapp.com",
            "imagedelivery.net",
        ],
    },
};

module.exports = nextConfig;
