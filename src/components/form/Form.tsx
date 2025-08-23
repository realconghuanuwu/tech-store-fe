import { Form, type FormProps } from "antd";
import type { ReactNode } from "react";

interface CFormProps extends FormProps {
  className?: string;
  children?: ReactNode;
}

export const CForm = ({ children, className, ...props }: CFormProps) => {
  return (
    <Form
      className={className}
      scrollToFirstError={{
        behavior: "smooth",
        block: "center",
        inline: "center",
      }}
      {...props}
    >
      {children}
    </Form>
  );
};
