import { DATE_FORMAT } from "../../constants/common.constant";
import { DatePicker, type DatePickerProps } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import { CInput, type CommonInputProps } from "./FormItemTemplate";
import clsx from "clsx";

export type DatePickerInputProps = {
  classNameInput?: string;
} & DatePickerProps &
  CommonInputProps;

export const DatePickerInput = ({
  formItemName,
  classNameForm,
  classNameInput,
  ...rest
}: DatePickerInputProps) => {
  return (
    <CInput formItemName={formItemName} classNameForm={classNameForm} {...rest}>
      <DatePicker
        className={clsx(
          "h-[51px] rounded-2xl border-none bg-[#F3F4F6] hover:bg-[#f8f8fa] w-full c-ant-picker",
          classNameInput
        )}
        popupClassName="custom-date-picker-popup"
        format={rest.format ?? DATE_FORMAT}
        {...rest}
        locale={{
          ...locale,
          lang: {
            ...locale.lang,
            ok: "Xác nhận",
          },
        }}
      />
    </CInput>
  );
};
