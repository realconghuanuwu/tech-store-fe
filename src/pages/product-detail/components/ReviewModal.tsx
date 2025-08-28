import { Modal } from "antd";
import ProductReviews from "./ProductReviews";

interface ReviewModalProps {
  isOpenReviewModal: {
    isOpen: boolean;
    productId: number | null;
  };
  onCloseReviewModal: () => void;
}

export default function ReviewModal({
  isOpenReviewModal,
  onCloseReviewModal,
}: ReviewModalProps) {
  return (
    <Modal
      open={isOpenReviewModal.isOpen}
      onCancel={onCloseReviewModal}
      footer={null}
      centered
      width={1200}
    >
      <ProductReviews productId={"a"} />
    </Modal>
  );
}
