import { useState } from "react";

import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";

export default function TestPage() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={handleOpenModal}> 모달 오픈</Button>
      <Modal open={showModal} onOpenChange={setShowModal}>
        asdffsad
      </Modal>
    </div>
  );
}
