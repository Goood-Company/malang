import { useState } from "react";

import Modal from "@/components/ui/modal";
import Button from "@/components/ui/button";
import BottomSheet from "@/components/ui/bottom-sheet";

export default function TestPage() {
  const [showModal, setShowModal] = useState(false);
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="flex flex-col p-4 gap-4 bg-background-1 text-text-primary min-h-screen">
      <div className="flex flex-col gap-1 w-fit">
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="primary-outline">Primary-Outline</Button>
        <Button variant="success">Success</Button>
        <Button variant="success-outline">Success-Outline</Button>
        <Button variant="error">Error</Button>
        <Button variant="error-outline">Error-Outline</Button>
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
      </div>

      <Button onClick={handleOpenModal}> 모달 오픈</Button>
      <Modal open={showModal} onOpenChange={setShowModal}>
        asdffsad
      </Modal>

      <Button onClick={() => setShowBottomSheet(true)}> 바텀 시트 오픈</Button>
      <BottomSheet open={showBottomSheet} onOpenChange={setShowBottomSheet}>
        <div className="h-[400px]">바텀시트 !!</div>
      </BottomSheet>
    </div>
  );
}
