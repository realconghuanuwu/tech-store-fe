import clsx from "clsx";
import { type CommonInputProps, CInput } from "./FormItemTemplate";
import { InputNumber, type InputNumberProps } from "antd";

export type NumberInputAntdProps = {
  isHideRequired?: boolean;
  classNameInput?: string;
  formItemName: React.Key | React.Key[];
  enableFormatter?: boolean;
  onChange?: (value: string | number | null) => void;
} & InputNumberProps &
  CommonInputProps;

export const NumberInput = ({
  formItemName,
  classNameInput,
  enableFormatter = true,
  onChange,
  ...rest
}: NumberInputAntdProps) => {
  return (
    <CInput formItemName={formItemName} {...rest}>
      <InputNumber
        className={clsx("h-10 w-full custom-input-number", classNameInput)}
        formatter={
          enableFormatter
            ? (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            : undefined
        }
        onChange={onChange}
        parser={
          enableFormatter
            ? (value) => value?.replace(/\$\s?|(\.*)/g, "") as unknown as number
            : undefined
        }
        onKeyDown={(e) => {
          const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
          ];

          if (
            (e.ctrlKey || e.metaKey) &&
            (e.key === "c" || e.key === "v" || e.key === "x" || e.key === "a")
          ) {
            return;
          }
          if (
            !allowedKeys.includes(e.key) &&
            !/[0-9]/.test(e.key) &&
            (e.key !== "." ||
              (e.key === "." &&
                (e.currentTarget.value.includes(".") ||
                  e.currentTarget.value === "")))
          ) {
            e.preventDefault();
          }
        }}
        min={rest.min ?? 0}
        max={999999999999999}
        {...rest}
      />
    </CInput>
  );
};
