import { useShowToast } from "@/hooks/toast/useShowToast";
// import { IFormRegisterInput } from "@/types/auth";
import { Box, Flex, Icon, Link } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
import {
	FaFacebookF,
	FaInstagram,
	FaTelegram,
	FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
	// const {
	// 	// register,
	// 	// handleSubmit,
	// 	// control,
	// 	// formState: { errors },
	// } = useForm<IFormRegisterInput>();

	const toast = useShowToast();

	const phoneNumber = "+54 11 64551800";

	function handleCopyPhoneNumber() {
		navigator.clipboard
			.writeText(phoneNumber)
			.then(() => {
				toast({
					status: "success",
					title: `Copiado: ${phoneNumber}`,
				});
			})
			.catch((err) => {
				toast({
					status: "error",
					title: "Error al copiar:",
					description: err,
				});
			});
	}

	return (
		<Box bg="brand.dark200">
			<Box maxW="1280px" mx="auto" p="1.5rem 3rem">
				<Flex
					mt="1rem"
					w="100%"
					color="brand.white400"
					fontSize="2.5rem"
					justifyContent="center"
					gap="2rem"
				>
					<Link href="https://www.google.com" target="_blank">
						<Icon cursor="pointer" as={FaFacebookF} />
					</Link>
					<Link href="http://www.instagram.com" target="_blank">
						<Icon cursor="pointer" as={FaInstagram} />
					</Link>
					<Link>
						<Icon
							cursor="pointer"
							as={FaWhatsapp}
							onClick={handleCopyPhoneNumber}
						/>
					</Link>
					<Link>
						<Icon
							cursor="pointer"
							as={FaTelegram}
							onClick={handleCopyPhoneNumber}
						/>
					</Link>
				</Flex>
			</Box>
		</Box>
	);
};
