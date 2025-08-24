import {
  DATE_FULL_TIME_FORMAT,
  DATE_FULL_TIME_ISO,
} from "@/constants/common.constant";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (
  date?: string | null | dayjs.Dayjs,
  format = DATE_FULL_TIME_FORMAT
) => {
  if (!date) {
    return "-";
  }

  if (typeof date === "string") {
    if (!dayjs(date, DATE_FULL_TIME_ISO).isValid()) {
      return "-";
    }

    return dayjs(date, DATE_FULL_TIME_ISO).format(format);
  }

  return date?.format(format);
};

export const isEmpty = (value: any) => {
  return value === undefined || value === null || value === "";
};

export const formatListToOptions = <T extends Record<string, any>>(
  list: T[] | undefined,
  labelFormat: ((item: T) => string) | string,
  valueKey = "id",
  option?: {
    disabledKey?: string;
    disabledValue?: string | number | string[] | number[];
    labelDisabled?: string;
    renderLabelDisabled?: (item: T) => string;
  }
) => {
  if (
    option &&
    !isEmpty(option.disabledKey) &&
    !isEmpty(option.disabledValue)
  ) {
    const mappedList = list?.map((item) => {
      // Check if the disabledValue is an array and if it is, check if the item[option.disabledKey] is in the array
      const isDisabled = Array.isArray(option.disabledValue)
        ? (option.disabledValue as (string | number)[]).includes(
            item?.[option.disabledKey as keyof T] as string | number
          )
        : item?.[option.disabledKey as keyof T] === option.disabledValue;

      const label =
        typeof labelFormat === "string" ? item[labelFormat] : labelFormat(item);
      const labelStatusDisabled = option.renderLabelDisabled
        ? option.renderLabelDisabled(item)
        : option.labelDisabled ?? "Không hoạt động";

      const labelDisabled = isDisabled
        ? `${label} (${labelStatusDisabled})`
        : label;
      return {
        label: labelDisabled,
        value: item[valueKey],
        disabled: isDisabled,
      };
    });

    return (
      mappedList?.sort((a, b) => {
        if (a.disabled === b.disabled) return 0;
        return a.disabled ? 1 : -1;
      }) ?? []
    );
  }

  return (
    list?.map((item) => ({
      label:
        typeof labelFormat === "string" ? item[labelFormat] : labelFormat(item),
      value: item[valueKey],
    })) ?? []
  );
};
