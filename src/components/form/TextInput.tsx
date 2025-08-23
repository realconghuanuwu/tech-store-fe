import { Input, type InputProps } from "antd";
import { CInput, type CommonInputProps } from "./FormItemTemplate";
import clsx from "clsx";

export type TextInputProps<T extends object> = {
  isHideRequired?: boolean;
  classNameInput?: string;
} & InputProps &
  CommonInputProps<T>;

export const TextInput = <T extends object>({
  formItemName,
  classNameInput,
  onChange,
  ...rest
}: TextInputProps<T>) => {
  return (
    <CInput formItemName={formItemName} {...rest}>
      <Input
        className={clsx(
          "h-[41px] rounded-2xl border-none bg-[#F3F4F6] hover:bg-[#f8f8fa] w-full px-3",
          classNameInput
        )}
        onChange={onChange}
        {...rest}
      />
    </CInput>
  );
};
