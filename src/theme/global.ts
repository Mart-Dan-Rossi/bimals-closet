import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	styles: {
		global: {
			body: {
				fontFamily: "Poppins, sans-serif",
				bg: "#fafafa",
			},
		},
	},

	colors: {
		brand: {
			green100: "#00AF54",
			green200: "#30C376",
			grey300: "#3F3F3F",
			grey400: "#8F8F8F",
			grey500: "#202020",
			green500:
				"linear-gradient(183.58deg, #00AF54 74.64%, rgba(0, 175, 84, 0) 201.35%)",
			white100: "#ffffff",
			white200: "#fafafa",
			white300: "#F4FFF3",
			white400: "#979797",
			gold100: "#FBAF00",
			red100: "#FF0E0E",
		},
	},
});

export default theme;
