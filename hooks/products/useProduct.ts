// import { getAllProducts, getParticularProduct } from "@/queries/product";
// import { useQuery } from "react-query";
// import { MapProduct } from "../favorite/useToggleFavorite";

export const useGetAllProducts = () => {
	return [
		{
			_id: "1",
			name: "Zapa 1",
			slug: "1",
			image: "/assets/images/Barny.jpg",
			price: 100,
			isFavorite: false,
		},
		{
			_id: "2",
			name: "Zapa 2",
			slug: "2",
			image: "/assets/images/Barny.jpg",
			price: 200,
			isFavorite: false,
		},
		{
			_id: "3",
			name: "Zapa 3",
			slug: "3",
			image: "/assets/images/Barny.jpg",
			price: 300,
			isFavorite: false,
		},
		{
			_id: "4",
			name: "Zapa 4",
			slug: "4",
			image: "/assets/images/Barny.jpg",
			price: 400,
			isFavorite: false,
		},
		{
			_id: "5",
			name: "Zapa 5",
			slug: "5",
			image: "/assets/images/Barny.jpg",
			price: 500,
			isFavorite: false,
		},
		{
			_id: "6",
			name: "Zapa 6",
			slug: "6",
			image: "/assets/images/Barny.jpg",
			price: 600,
			isFavorite: false,
		},
		{
			_id: "7",
			name: "Zapa 7",
			slug: "7",
			image: "/assets/images/Barny.jpg",
			price: 700,
			isFavorite: true,
		},
	];
	// return useQuery({
	// 	queryKey: ["getAllProducts"],
	// 	queryFn: () => getAllProducts(),
	// 	retry: 2,
	// });
};

export const useParticularProduct = (slug: string) => {
	const allProducts = useGetAllProducts();

	return allProducts.find((product) => product.slug === slug);
	// return useQuery({
	// 	queryKey: ["getParticularProduct", slug],
	// 	queryFn: () => getParticularProduct(slug),
	// 	retry: 2,
	// 	enabled: !!slug,
	// });
};
