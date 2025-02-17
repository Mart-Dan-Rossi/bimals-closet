import { getAllProducts, getParticularProduct } from "@/queries/product";
import { Product } from "@/types/product";
import { useQuery } from "react-query";

export const useGetAllProducts = () => {
	return useQuery<Product[]>({
		queryKey: ["getAllProducts"],
		queryFn: () => getAllProducts(),
		retry: 2,
	});
};

export const useParticularProduct = (slug: string) => {
	return useQuery<Product>({
		queryKey: ["getParticularProduct", slug],
		queryFn: () => getParticularProduct(slug),
		retry: 2,
		enabled: !!slug,
	});
};
