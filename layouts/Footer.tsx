import { useShowToast } from "@/hooks/toast/useShowToast";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
	FaFacebookF,
	FaInstagram,
	FaTelegram,
	FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
	const router = useRouter();

	const toast = useShowToast();

	const phoneNumber = "+54 11 64551800";

	function handleCopyPhoneNumber() {
		navigator.clipboard
			.writeText(phoneNumber)
			.then(() => {
				toast({ status: "success", title: `Copiado: ${phoneNumber}` });
			})
			.catch((err) => {
				toast({ status: "error", title: "Error al copiar:", description: err });
			});
	}

	return (
		<Box bg={"brand.footerBG"}>
			<Box maxW="1280px" mx="auto" p="1.5rem 3rem">
				<Flex
					mt="1rem"
					w="100%"
					color={"brand.white400"}
					fontSize="2.5rem"
					justifyContent="center"
					gap="2rem"
				>
					<Box
						cursor="pointer"
						onClick={() => router.push("https://www.google.com")}
					>
						<Icon cursor="pointer" as={FaFacebookF} />
					</Box>
					<Box
						cursor="pointer"
						onClick={() => router.push("http://www.instagram.com")}
					>
						<Icon cursor="pointer" as={FaInstagram} />
					</Box>
					<Box>
						<Icon
							cursor="pointer"
							as={FaWhatsapp}
							onClick={handleCopyPhoneNumber}
						/>
					</Box>
					<Box>
						<Icon
							cursor="pointer"
							as={FaTelegram}
							onClick={handleCopyPhoneNumber}
						/>
					</Box>
				</Flex>
			</Box>
		</Box>
	);
};
