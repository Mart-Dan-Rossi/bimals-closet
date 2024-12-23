import { useDisclosure } from "@chakra-ui/react";
import React, { ReactNode, useContext, useRef, useState } from "react";

export type ValidSizeOptions = {
	us?: number[];
	eu?: number[];
};

interface GlobalContextProps {
	currentSizeType: "any" | "us" | "eu";
	setCurrentSizeType: React.Dispatch<React.SetStateAction<"any" | "us" | "eu">>;
	sizeTypes: ("any" | "us" | "eu")[];
	isSizeTypesDrawerOpen: boolean;
	onOpenSizeTypesDrawer: () => void;
	onCloseSizeTypesDrawer: () => void;
}

const GlobalContext = React.createContext({} as GlobalContextProps);

export const GlobalContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [currentSizeType, setCurrentSizeType] = useState<"any" | "us" | "eu">(
		"any"
	);

	const {
		isOpen: isSizeTypesDrawerOpen,
		onOpen: onOpenSizeTypesDrawer,
		onClose: onCloseSizeTypesDrawer,
	} = useDisclosure();

	const sizeTypes = useRef(["any", "us", "eu"]).current as (
		| "any"
		| "us"
		| "eu"
	)[];

	return (
		<GlobalContext.Provider
			value={{
				currentSizeType,
				setCurrentSizeType,
				sizeTypes,
				isSizeTypesDrawerOpen,
				onOpenSizeTypesDrawer,
				onCloseSizeTypesDrawer,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export function useGlobalContext() {
	return useContext(GlobalContext);
}
