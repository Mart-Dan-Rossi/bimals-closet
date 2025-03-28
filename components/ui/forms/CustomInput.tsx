import { useGlobalContext } from "@/context/GlobalContext";
import { CustomInputProps } from "@/types/form";
import { Box, Input, Text } from "@chakra-ui/react";

export const CustomInput = ({
	id,
	defaultValue,
	placeholder,
	type,
	onChange: handleChange,
	formHook,
	passwordIcon,
	errorMessage,
	isDisabled,
	maxWidth,
	display,
}: CustomInputProps) => {
	const { isDarkMode } = useGlobalContext();

	return (
		<Box maxWidth={maxWidth || "unset"} display={display || "block"}>
			<Box pos="relative">
				<Input
					id={id}
					defaultValue={defaultValue}
					border="1px solid #EAEAEA"
					borderRadius="1rem"
					placeholder={placeholder}
					type={type}
					py="2rem"
					fontSize="1.6rem"
					isDisabled={isDisabled}
					_placeholder={{
						fontWeight: 500,
						fontSize: "1.3rem",
						color: isDarkMode
							? "darkBrand.secondaryColor1"
							: "brand.secondaryColor1",
					}}
					_focus={{
						borderColor: isDarkMode ? "darkBrand.color1" : "brand.color1",
						boxShadow: "none",
					}}
					_hover={{
						borderColor: "none",
					}}
					{...{ ...formHook, ...(handleChange && { onChange: handleChange }) }}
				/>

				<Box
					as="span"
					cursor="pointer"
					fontSize="1.5rem"
					pos="absolute"
					zIndex="2"
					top="1.5rem"
					right="1rem"
				>
					{passwordIcon}
				</Box>
			</Box>
			<Text
				color={isDarkMode ? "darkBrand.red100" : "brand.red100"}
				fontSize="1.1rem"
				fontWeight="300"
				mt=".5rem"
			>
				{errorMessage}
			</Text>
		</Box>
	);
};
