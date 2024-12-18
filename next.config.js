module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["res.cloudinary.com"],
	},
	eslint: {
		dirs: ["pages", "utils"], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
	},
};
