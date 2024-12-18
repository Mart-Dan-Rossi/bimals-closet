import React from "react";
import { Box } from "@chakra-ui/react";

import { Header } from "./Header";
import { Footer } from "./Footer";

type childrenProps = {
	children: React.ReactNode;
	subHeaderName?: string;
};

const MainLayout = ({ children, subHeaderName }: childrenProps) => {
	return (
		<Box>
			<Header {...{ subHeaderName }} />
			<Box minH={"92vh"}>{children}</Box>
			<Footer />
		</Box>
	);
};

export default MainLayout;
