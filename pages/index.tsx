import Head from "next/head";
import { Box } from "@chakra-ui/react";
import MainLayout from "@/layouts/MainLayout";
import { Hero, Products } from "@/components/templates/main";

const Home = () => {
	return (
		<>
			<Head>
				<title>Mateo Shoes</title>
				<meta name="description" content="Best clothing store" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
			</Head>
			<Box>
				<MainLayout>
					<Hero />
					<Products />
				</MainLayout>
			</Box>
		</>
	);
};
export default Home;
