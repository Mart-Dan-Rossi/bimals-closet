import HomeSection from "@/components/templates/main/HomeSection";
import MainLayout from "@/layouts/MainLayout";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

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
					<HomeSection />
				</MainLayout>
			</Box>
		</>
	);
};
export default Home;
