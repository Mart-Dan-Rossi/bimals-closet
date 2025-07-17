import { Box, Flex, Icon, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
	FaFacebookF,
	FaInstagram,
	FaTelegram,
	FaWhatsapp,
} from "react-icons/fa";

interface Props {
	iconsColor?: string;
	successSection?: boolean;
}

const SocialMedia = ({ iconsColor, successSection }: Props) => {
	const router = useRouter();
	const toast = useToast();

	const phoneNumber = "541164551800";
	const message = successSection
		? "Buenas! Realicé una compra por Mateo's Shooes, me gustaría coordinar la entrega"
		: "Buenas! Te quería hacer una consulta sobre Mateo's Shooes";

	const wspURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
		message
	)}`;

	const telegramUrl = "https://t.me/Tanonapolitano";

	const handlePhoneApp = (app: "w" | "t") => {
		return async () => {
			navigator.clipboard
				.writeText(`+${phoneNumber}`)
				.then(() => {
					toast({ status: "success", title: `Copiado: +${phoneNumber}` });
					window.open(app === "w" ? wspURL : telegramUrl, "_blank");
				})
				.catch((err) => {
					toast({
						status: "error",
						title: "Error al copiar:",
						description: err,
					});
				});
		};
	};

	return (
		<Flex
			mt="1rem"
			w="100%"
			color={iconsColor ?? "brand.white400"}
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
				<Box onClick={handlePhoneApp("w")}>
					<Icon cursor="pointer" as={FaWhatsapp} />
				</Box>
			</Box>
			<Box>
				<Box onClick={handlePhoneApp("t")}>
					<Icon cursor="pointer" as={FaTelegram} />
				</Box>
			</Box>
		</Flex>
	);
};

export default SocialMedia;
