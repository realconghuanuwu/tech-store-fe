import type { ColDef } from "ag-grid-community";
import { TableV3, type TableProps } from "../../components/TableV3";
import { useRef, useState, useEffect } from "react";
import { Form, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import CModal from "../modal";

export interface CommonCRUDPageProps<T, CreateRequest, UpdateRequest>
  extends Omit<
    TableProps<T>,
    | "rowData"
    | "columnDefs"
    | "loading"
    | "onAdd"
    | "onEdit"
    | "onDelete"
    | "onView"
  > {
  /**
   * Title of the page
   */
  title?: string;
  /**
   * Data to display in the table
   */
  data: T[] | undefined;
  /**
   * Loading state of the table
   */
  isLoading: boolean;
  /**
   * Column definitions for the table
   */
  columnDefs: ColDef<T>[];
  /**
   * Function to reload data
   */
  refetch: () => void;
  /**
   * Function to create entity
   */
  createEntity: (data: CreateRequest) => Promise<unknown>;
  /**
   * Function to update entity
   */
  updateEntity: (data: UpdateRequest) => Promise<unknown>;
  /**
   * Function to delete entity
   */
  deleteEntity?: (id: number | string) => Promise<unknown>;
  /**
   * Function to handle view action
   */
  onViewItem?: (item: T) => void;
  /**
   * Function to handle delete action
   */
  onDeleteItem?: (item: T) => void;
  /**
   * Render form fields for the modal
   */
  renderFormFields: (item: T | null) => React.ReactNode;
  /**
   * Transform entity to form values
   */
  transformToFormValues: (item: T) => Record<string, unknown>;
  /**
   * Field to use as ID in the entity
   */
  idField?: keyof T;
  /**
   * Messages to show on success/error
   */
  messages?: {
    createSuccess?: string;
    createError?: string;
    updateSuccess?: string;
    updateError?: string;
    deleteSuccess?: string;
    deleteError?: string;
  };
  /**
   * Add button text
   */
  addButtonText?: string;
  /**
   * Modal title for create/update
   */
  modalTitle?: {
    create?: string;
    update?: string;
  };
  /**
   * Determine if we should use internal edit button
   */
}

export default function CommonCRUDPage<
  T extends { id?: number | string },
  CreateRequest = Omit<T, "id">,
  UpdateRequest = T
>({
  data,
  isLoading,
  columnDefs,
  refetch,
  createEntity,
  updateEntity,
  deleteEntity,
  onViewItem,
  onDeleteItem,
  renderFormFields,
  transformToFormValues,
  idField = "id" as keyof T,
  messages = {
    createSuccess: "Item created successfully",
    createError: "Failed to create item",
    updateSuccess: "Item updated successfully",
    updateError: "Failed to update item",
    deleteSuccess: "Item deleted successfully",
    deleteError: "Failed to delete item",
  },
  addButtonText = "Add",
  modalTitle = {
    create: "Create new item",
    update: "Update item",
  },
  ...props
}: CommonCRUDPageProps<T, CreateRequest, UpdateRequest>) {
  const selectedItem = useRef<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { mutate: mutateCreate, isPending: isCreating } = useMutation({
    mutationFn: (data: CreateRequest) => {
      return createEntity(data);
    },
    onSuccess: () => {
      message.success(messages.createSuccess);
      handleCloseModal();
      refetch();
    },
    onError: () => {
      message.error(messages.createError);
    },
  });

  const { mutate: mutateUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateRequest) => {
      return updateEntity(data);
    },
    onSuccess: () => {
      message.success(messages.updateSuccess);
      handleCloseModal();
      refetch();
    },
    onError: () => {
      message.error(messages.updateError);
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id: number | string) => {
      return deleteEntity ? deleteEntity(id) : Promise.resolve(null);
    },
    onSuccess: () => {
      message.success(messages.deleteSuccess);
      refetch();
    },
    onError: () => {
      message.error(messages.deleteError);
    },
  });

  const handleSubmit = (values: Record<string, unknown>) => {
    if (selectedItem.current) {
      // Update operation
      const updateData = {
        ...values,
        [idField]: selectedItem.current[idField],
      } as UpdateRequest;
      mutateUpdate(updateData);
    } else {
      // Create operation
      mutateCreate(values as unknown as CreateRequest);
    }
  };

  const handleEditItem = (params: { data: T }) => {
    selectedItem.current = params.data;
    setIsModalOpen(true);
  };

  const handleDeleteItem = (params: { data: T }) => {
    if (deleteEntity && params.data[idField]) {
      mutateDelete(params.data[idField] as number | string);
    } else if (onDeleteItem) {
      onDeleteItem(params.data);
    }
  };

  const handleViewItem = (params: { data: T }) => {
    if (onViewItem) {
      onViewItem(params.data);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    selectedItem.current = null;
  };

  useEffect(() => {
    if (selectedItem.current && isModalOpen) {
      const formValues = transformToFormValues
        ? transformToFormValues(selectedItem.current)
        : (selectedItem.current as unknown as Record<string, unknown>);
      form.setFieldsValue(formValues);
    } else {
      form.resetFields();
    }
  }, [selectedItem.current, isModalOpen, form, transformToFormValues]);

  const isUpdate = !!selectedItem.current;

  return (
    <>
      <CModal
        destroyOnClose
        form={form}
        centered
        isLoadingOkBtn={isCreating || isUpdating}
        title={isUpdate ? modalTitle.update : modalTitle.create}
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCloseModal}
        width={800}
        formProps={{ onFinish: handleSubmit, layout: "vertical" }}
      >
        {renderFormFields(selectedItem.current)}
      </CModal>
      <TableV3
        rowData={data}
        columnDefs={columnDefs}
        loading={isLoading}
        onAdd={handleOpenModal}
        onEdit={typeof updateEntity === "function" ? handleEditItem : undefined}
        onDelete={
          typeof deleteEntity === "function" ||
          typeof onDeleteItem === "function"
            ? handleDeleteItem
            : undefined
        }
        onView={typeof onViewItem === "function" ? handleViewItem : undefined}
        addButtonText={addButtonText}
        {...props}
      />
    </>
  );
}
