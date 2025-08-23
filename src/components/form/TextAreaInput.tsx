import { Input, type InputProps } from "antd";
import { CInput, type CommonInputProps } from "./FormItemTemplate";
import clsx from "clsx";

const { TextArea } = Input;

export type TextAreaInputProps = {
  classNameInput?: string;
} & InputProps &
  CommonInputProps;

export const TextAreaInput = ({
  formItemName,
  classNameInput,
  ...rest
}: TextAreaInputProps) => {
  return (
    <CInput formItemName={formItemName} {...rest}>
      <TextArea
        className={clsx("w-full", classNameInput)}
        style={{ height: 120, resize: "none" }}
        placeholder={rest.placeholder}
      />
    </CInput>
  );
};
