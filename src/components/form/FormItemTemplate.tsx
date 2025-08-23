import { Form } from "antd";
import clsx from "clsx";
import useResize from "@/hooks/useResize";
import type { Rule } from "antd/es/form";

export type CommonInputProps<T extends object> = {
  label?: React.ReactNode;
  formItemName: keyof T;
  classNameForm?: string;
  hidden?: boolean;
  isVerticalLabel?: boolean;
  rules?: Rule[];
  isHideRequired?: boolean;
};

export const CInput = <T extends object>({
  label,
  formItemName,
  classNameForm,
  hidden,
  isVerticalLabel = false,
  children,
  rules,
  isHideRequired,
}: React.PropsWithChildren<CommonInputProps<T>>) => {
  const { isMobile } = useResize();
  return (
    <Form.Item<T>
      name={formItemName as keyof T & (string | number)}
      rules={rules}
      className={clsx("mb-0", classNameForm, {
        "c-label-vertical": isVerticalLabel || isMobile,
        "c-label-hide-required": isHideRequired,
      })}
      hidden={hidden}
      label={label}
      labelCol={{ span: isVerticalLabel || isMobile ? 24 : "" }}
    >
      {children}
    </Form.Item>
  );
};
