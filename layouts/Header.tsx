import { BurguerIcon } from "@/components/Header/BurguerIcon";
import { DesktopUserInteraction } from "@/components/Header/DesktopUserInteraction";
import { ExtraInfo } from "@/components/Header/ExtraInfo";
import { useGlobalContext } from "@/context/GlobalContext";
import { useHydratedStoreState } from "@/hooks/state/hydrated";
import { Product, SizeOptions } from "@/types/product";
import { Box, Stack, Text, useBoolean } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainSectionsNavigation from "./MainSectionNavigation";

export const Header = ({
	subHeaderName,
}: {
	subHeaderName: string | undefined;
}) => {
	const router = useRouter();

	const { finalProductsData } = useGlobalContext();

	const token = useHydratedStoreState("token");

	const [openModal, setOpenModal] = useBoolean();
	const [name, setName] = useState<string>("");

	const [loggedIsAdmin, setLoggedIsAdmin] = useState(false);

	const [userReservedProducts, setUserReserverdProducts] = useState<Product[]>(
		[]
	);

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : undefined;
		const fullName = user ? user.name : undefined;

		const base64Url = token && token.split(".")[1];
		const base64 = base64Url && base64Url.replace(/-/g, "+").replace(/_/g, "/");
		const tokenData = base64 && JSON.parse(atob(base64));

		if (JSON.stringify(name) !== JSON.stringify(fullName)) {
			setName(fullName);
		}

		setLoggedIsAdmin(tokenData.role === "admin");
	}, [name, token]);

	useEffect(() => {
		const storedUser = localStorage.getItem("MateoShoesUser");
		const user = storedUser && token ? JSON.parse(storedUser) : null;

		if (user) {
			const URP: Product[] = finalProductsData
				?.map((product) => {
					const userReservations =
						product.reservedData?.filter((reserve) => {
							const sameUserId = reserve.userId === user.id;
							const isHidden = reserve.hide;

							return sameUserId && !isHidden;
						}) || [];

					if (userReservations.length === 0) return null;

					const filteredSizeOptions = product.sizeOptions
						.map((sizeOption) => {
							const matchingReservation = userReservations.find(
								(reserve) =>
									reserve.usSize === sizeOption.usSize &&
									reserve.color === sizeOption.color
							);

							return matchingReservation
								? { ...sizeOption, quantity: matchingReservation.quantity }
								: null;
						})
						.filter(Boolean) as SizeOptions;

					return {
						...product,
						sizeOptions: filteredSizeOptions,
						reservedData: product.reservedData,
					};
				})
				.filter(Boolean) as Product[];

			setUserReserverdProducts(URP || []);
		}
	}, [finalProductsData, token]);

	return (
		<Box bg={"brand.headerBG"} pos="fixed" w="100%" zIndex="99">
			<Box maxW="1280px" mx="auto" p="2rem 0 0 0">
				<Stack
					spacing="0"
					direction={["row"]}
					justifyContent="space-between"
					alignItems="center"
					p="1.5rem 3rem"
					color={"brand.white100"}
				>
					<Box>
						<Box cursor="pointer" onClick={() => router.push("/")}>
							<Text fontWeight="700" fontSize={["1.8rem", "2.5rem"]}>
								SHOES2JUMP
							</Text>
						</Box>
					</Box>

					<MainSectionsNavigation
						subHeaderName={subHeaderName}
						isMobile={false}
					/>

					<BurguerIcon setOpenModal={setOpenModal} />

					<DesktopUserInteraction
						name={name}
						loggedIsAdmin={loggedIsAdmin}
						userReservedProducts={userReservedProducts}
					/>
				</Stack>
			</Box>

			<ExtraInfo
				subHeaderName={subHeaderName}
				openModal={openModal}
				loggedIsAdmin={loggedIsAdmin}
			/>
		</Box>
	);
};
