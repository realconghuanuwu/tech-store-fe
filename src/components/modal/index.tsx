import type { FormProps } from "antd/es/form";
import type { ModalProps } from "antd/es/modal";

import { Button, type ButtonProps, Modal } from "antd";
import type { FormInstance } from "antd/lib";
import { useMemo } from "react";
import { CForm } from "../form/Form";

interface FilteredModalProps extends Omit<ModalProps, "onOk" | "onClose"> {}

interface CModalProps<FormValues> extends FilteredModalProps {
  form?: FormInstance;
  formProps?: FormProps<FormValues>;
  formClassName?: string;
  children?: React.ReactNode;
  onClose?: (formData?: FormValues) => any;
  onOk?: (data?: any) => any;
  okText?: string;
  cancelText?: string;
  isLoadingOkBtn?: boolean;
  hideFooter?: boolean;
  onCancel?: () => void;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

const BaseModal = <FormValues extends object>(
  props: CModalProps<FormValues>
) => {
  const {
    form,
    formProps,
    children,
    onClose,
    onCancel,
    okText = "Lưu",
    cancelText = "Hủy",
    onOk,
    isLoadingOkBtn = false,
    hideFooter,
    width = 640,
    okButtonProps,
    ...rest
  } = props;

  const handleOk = async () => {
    if (form) {
      const data = await form.validateFields();
      onOk && onOk(data);
    } else {
      onOk && onOk();
    }
  };

  const handleCancel = () => {
    form && form.resetFields();
    onClose && onClose();
    onCancel && onCancel();
  };

  const defaultFooter = useMemo(() => {
    return [
      (onClose || onCancel) && (
        <Button key="cancel" color="primary" onClick={handleCancel}>
          {cancelText}
        </Button>
      ),
      onOk && (
        <Button
          key="ok"
          type="primary"
          onClick={onOk}
          loading={isLoadingOkBtn}
          {...okButtonProps}
        >
          {okText}
        </Button>
      ),
    ];
  }, [
    cancelText,
    isLoadingOkBtn,
    okText,
    handleCancel,
    handleOk,
    onClose,
    onCancel,
    okButtonProps,
  ]);

  return (
    <Modal
      {...rest}
      onClose={handleCancel}
      onCancel={handleCancel}
      onOk={handleOk}
      width={width}
      styles={{
        content: {
          paddingRight: 0,
        },
        header: {
          paddingRight: 20,
        },
        footer: {
          paddingRight: 20,
        },
        body: {
          paddingTop: 10,
          paddingBottom: 10,
          maxHeight: "80vh",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: 20,
        },
      }}
      centered
      footer={hideFooter ? null : defaultFooter}
    >
      {form ? (
        <CForm {...formProps} form={form} className={props.formClassName}>
          {children}
        </CForm>
      ) : (
        children
      )}
    </Modal>
  );
};

const CModal = Object.assign(BaseModal, Modal);

export default CModal;
