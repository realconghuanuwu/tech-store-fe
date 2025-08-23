import { Switch, type SwitchProps } from "antd";
import { CInput, type CommonInputProps } from "./FormItemTemplate";

export type SwitchInputProps = {
  isHideRequired?: boolean;
  classNameInput?: string;
} & SwitchProps &
  CommonInputProps;

export const SwitchInput = ({
  formItemName,
  classNameInput,
  ...rest
}: SwitchInputProps) => {
  return (
    <CInput valuePropName="checked" formItemName={formItemName} {...rest}>
      <Switch className={`w-full ${classNameInput}`} {...rest} />
    </CInput>
  );
};
