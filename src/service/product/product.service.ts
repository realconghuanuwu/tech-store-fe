import { useQuery } from "@tanstack/react-query";
import type { ProductRes } from "./product.res";

export const getProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return response.json();
};

export const useGetProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return { data: data as ProductRes[], isLoading, error };
};
