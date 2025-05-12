import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface Props {
	subHeaderName?: string;
	isMobile: boolean;
}

const MainSectionsNavigation = ({ subHeaderName, isMobile }: Props) => {
	const router = useRouter();

	return (
		<Flex
			gap="2rem"
			display={
				isMobile
					? ["block", "block", "block", "none"]
					: ["none", "none", "none", "flex"]
			}
			bg={isMobile ? "brand.white100" : ""}
			p={isMobile ? ".9rem 1.5rem" : ""}
			borderRadius={isMobile ? "2rem" : ""}
			userSelect={"none"}
		>
			<Text
				fontWeight="bold"
				fontSize="large"
				cursor="pointer"
				color={
					subHeaderName?.toLowerCase() === "calzado"
						? "gold"
						: isMobile
						? "black"
						: "white"
				}
				_hover={{ color: "gold" }}
				onClick={() => {
					if (subHeaderName?.toLowerCase() !== "calzado") {
						router.push("/product/shoesSection");
					}
				}}
			>
				Calzado
			</Text>
			<Text
				fontWeight="bold"
				fontSize="large"
				cursor="pointer"
				color={
					subHeaderName?.toLowerCase() === "indumentaria"
						? "gold"
						: isMobile
						? "black"
						: "white"
				}
				_hover={{ color: "gold" }}
				onClick={() => {
					if (subHeaderName?.toLowerCase() !== "indumentaria") {
						router.push("/product/indumentaria");
					}
				}}
			>
				Indumentaria
			</Text>
			<Text
				fontWeight="bold"
				fontSize="large"
				cursor="pointer"
				color={
					subHeaderName?.toLowerCase() === "sale"
						? "gold"
						: isMobile
						? "black"
						: "white"
				}
				_hover={{ color: "gold" }}
				onClick={() => {
					if (subHeaderName?.toLowerCase() !== "sale") {
						router.push("/product/sale");
					}
				}}
			>
				Sale
			</Text>
			<Text
				fontWeight="bold"
				fontSize="large"
				cursor="pointer"
				color={
					subHeaderName?.toLowerCase() === "todo"
						? "gold"
						: isMobile
						? "black"
						: "white"
				}
				_hover={{ color: "gold" }}
				onClick={() => {
					if (subHeaderName?.toLowerCase() !== "todo") {
						router.push("/product/todo");
					}
				}}
			>
				Todo
			</Text>
		</Flex>
	);
};

export default MainSectionsNavigation;
