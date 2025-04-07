import { standardBoxShadow } from "@/styles/themes/foundation/globalStyles";
import { CustomButtonProps } from "@/types/button";
import { Box, Button, Icon } from "@chakra-ui/react";

export const CustomButton = ({
	w,
	mt,
	py,
	px,
	color,
	bg,
	bgHover,
	colorHover,
	boxShadow,
	border,
	borderColor,
	fontSize,
	text,
	btnIcon,
	isLoading,
	isDisabled,
	isBtnIcon,
	isValidData,
	onClickFunction,
}: CustomButtonProps) => {
	return (
		<Box>
			<Button
				w={w || "100%"}
				mt={mt || "2rem"}
				py={py || ["2rem", "2.5rem"]}
				px={px}
				color={color || "#fff"}
				bg={bg || "brand.black"}
				border={border || ".2rem solid"}
				borderRadius="10px"
				boxShadow={boxShadow || standardBoxShadow}
				borderColor={borderColor || "brand.green500"}
				type={isValidData ? "submit" : "button"}
				onClick={
					isValidData
						? () => {
								console.log("Upload data");
						  }
						: onClickFunction
				}
				cursor="pointer"
				fontSize={fontSize || ["1.5rem", "1.8rem", "1.6rem", "1.8rem"]}
				isLoading={isLoading}
				isDisabled={isDisabled}
				_hover={{
					boxShadow: "none",
					color: colorHover || "brand.gold100",
					bg: bgHover || "brand.black",
				}}
				_focus={{
					boxShadow: "2px 2px 5px 0px rgba(0,0,0,0.75) inset",
					borderColor: "none",
				}}
			>
				{isBtnIcon && (
					<Icon
						cursor="pointer"
						color={"brand.white100"}
						fontSize="2.5rem"
						mr={["1rem", "3rem", "1rem", "3rem"]}
						as={btnIcon}
					/>
				)}{" "}
				{text}
			</Button>
		</Box>
	);
};
