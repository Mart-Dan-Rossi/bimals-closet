import { CustomButton } from "@/components/ui/buttons/CustomButton";
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SitePresentation = () => {
	const router = useRouter()

	return (
		<Flex justifyContent={"center"} margin="4rem 0">
			<Flex width={"60%"} minW={"420px"} maxW={"1200px"} gap={"2rem"}>
				<VStack
					maxW={"50%"}
					justifyContent={"center"}
					alignItems={"flex-start"}
				>
					<Text fontWeight={"bold"} fontSize={"xx-large"}>
						Bur bur shoes
					</Text>
					<Text marginTop={"5%"}>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde odio
						exercitationem cumque, iste perspiciatis labore, fuga deleniti fugit
						mollitia dolorem in, iusto natus possimus ad odit veniam eligendi
						nam molestiae!
					</Text>
					<Box alignSelf="center">
						<CustomButton {...{ text: "Todos los productos" }} onClickFunction={()=> router.push("/product/todo")}/>
					</Box>
				</VStack>
				<Image width={"35%"} src="./assets/images/Shoes-Intro2.png" />
			</Flex>
		</Flex>
	);
};

export default SitePresentation;
