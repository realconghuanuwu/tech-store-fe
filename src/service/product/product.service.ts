import { useQuery } from "@tanstack/react-query";
import type { ProductRes } from "./product.res";
import { api } from "@/api/api";

export const getProducts = async () => {
  const res = await api.get("products");
  return res;
};

export const useGetProducts = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
  return { data: data as unknown as ProductRes[], isLoading, error };
};

export const getProductById = async (id: string) => {
  const res = await api.get(`products/${id}`);
  return res;
};

export const useGetProductById = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });
  return { data: data as unknown as ProductRes, isLoading, error };
};
