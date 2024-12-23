import React from "react";
import { Box } from "@chakra-ui/react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { GlobalContextProvider } from "@/context/GlobalContext";
import { SizeTypesDrawer } from "@/components/SizeTypesDrawer";

type childrenProps = {
	children: React.ReactNode;
	subHeaderName?: string;
};

const MainLayout = ({ children, subHeaderName }: childrenProps) => {
	return (
		<GlobalContextProvider>
			<Box>
				<Header {...{ subHeaderName }} />
				<Box minH={"92vh"}>{children}</Box>
				<Footer />
			</Box>
			<SizeTypesDrawer />
		</GlobalContextProvider>
	);
};

export default MainLayout;
