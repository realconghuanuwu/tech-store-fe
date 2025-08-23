import { Empty, Select, type SelectProps } from "antd";
import { CInput, type CommonInputProps } from "./FormItemTemplate";
import { type DefaultOptionType } from "antd/es/select";
import clsx from "clsx";

export type SelectInputProps = {
  options: DefaultOptionType[];
  classNameInput?: string;
} & SelectProps &
  CommonInputProps;

export const removeAccents = (str: string): string => {
  return str
    .normalize("NFD") // Tách các dấu khỏi ký tự gốc
    .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu
    .replace(/d/g, "đ") // Thay thế 'đ' thành 'd'
    .replace(/d/g, "Đ"); // Thay thế 'Đ' thành 'D'
};

export const defaultFilterOption = (
  input: string,
  option: DefaultOptionType | undefined
) => {
  if (!option?.label) return false;
  const normalizedInput = removeAccents(input.toLowerCase());
  const normalizedLabel =
    typeof option.label === "string"
      ? removeAccents(option.label.toLowerCase())
      : "";
  return normalizedLabel.includes(normalizedInput);
};

export const SelectInput = ({
  formItemName,
  options,
  classNameInput,
  filterOption = defaultFilterOption,
  ...rest
}: SelectInputProps) => {
  return (
    <CInput formItemName={formItemName} {...rest}>
      <Select
        className={clsx("!h-[41px] w-full", classNameInput)}
        options={options}
        notFoundContent={
          <Empty
            description="Không có dữ liệu"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        }
        filterOption={filterOption}
        popupMatchSelectWidth={false}
        maxTagCount="responsive"
        {...rest}
      />
    </CInput>
  );
};
