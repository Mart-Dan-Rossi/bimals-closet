import { Box } from "@chakra-ui/react";
import React from "react";

import { Footer } from "./Footer";
import { Header } from "./Header";

type childrenProps = {
	children: React.ReactNode;
	subHeaderName?: string;
};

const MainLayout = ({ children, subHeaderName }: childrenProps) => {
	return (
		<>
			<Box>
				<Header {...{ subHeaderName }} />
				<Box minH={"92vh"} h={"fit-content"}>
					{children}
				</Box>
				<Footer />
			</Box>
		</>
	);
};

export default MainLayout;
