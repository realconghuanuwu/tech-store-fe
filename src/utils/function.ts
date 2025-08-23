export const getFoodImageUrl = (imageUrl: string) => {
  return `${import.meta.env.VITE_API_URL}/food/${imageUrl}`;
};

export const mapperToOptions = <T extends Record<string, any>>(
  data: T[],
  labelKey: keyof T,
  valueKey: keyof T
) => {
  return data?.map((item) => ({
    label: item[labelKey],
    value: item[valueKey],
  }));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
