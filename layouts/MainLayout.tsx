import { Box } from "@chakra-ui/react";
import React from "react";

import { FiltersDrawer } from "@/components/FiltersDrawer";
import { GlobalContextProvider } from "@/context/GlobalContext";
import { Footer } from "./Footer";
import { Header } from "./Header";

type childrenProps = {
	children: React.ReactNode;
	subHeaderName?: string;
};

const MainLayout = ({ children, subHeaderName }: childrenProps) => {
	return (
		<GlobalContextProvider>
			<Box>
				<Header {...{ subHeaderName }} />
				<Box minH={"92vh"} h={"fit-content"}>
					{children}
				</Box>
				<Footer />
			</Box>
			<FiltersDrawer />
		</GlobalContextProvider>
	);
};

export default MainLayout;
