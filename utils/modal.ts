import { IconType } from "react-icons";
import { GiLoincloth, GiTrousers } from "react-icons/gi";
import { GoHeart } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import { SiGooglemybusiness } from "react-icons/si";
import { TiShoppingCart } from "react-icons/ti";

export type AuthModalDataProps = {
	icon: IconType;
	text: string;
	link?: string;
};

export const AuthModalData: AuthModalDataProps[] = [
	{
		icon: TiShoppingCart,
		text: "Carrito",
		link: "/cart",
	},
	// {
	// 	icon: AiOutlineShop,
	// 	text: "Order",
	// },
	{
		icon: GoHeart,
		text: "Deseados",
		link: "/wishlist",
	},
	{
		icon: IoMdLogOut,
		text: "Desconectar",
	},
];

export const CategoriesModalData: AuthModalDataProps[] = [
	{
		icon: SiGooglemybusiness,
		text: "Todos los productos",
	},
	{
		icon: GiLoincloth,
		text: "Femeninos",
	},
	{
		icon: GiTrousers,
		text: "Masculinos",
	},
	// {
	// 	icon: GiRunningShoe,
	// 	text: "Shoes",
	// },
];
