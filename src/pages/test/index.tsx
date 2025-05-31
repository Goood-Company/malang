
import Progress from "@/components/ui/progress";
import { toast } from "sonner";
import Skeleton from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Separator from "@/components/ui/separator";
import Card, {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "@/components/ui/input";


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

      <div className="flex gap-4">
        <Button onClick={() => toast("event")}>토스트 트리거</Button>
        {/* <button onClick={() => toast.custom(<>"event"</>)}>토스트 트리거</button> */}
        <Button onClick={() => toast.success("event")}>success</Button>
        <Button onClick={() => toast.error("event")}>error</Button>
        <Button onClick={() => toast.warning("event")}>warning</Button>
        <Button onClick={() => toast.info("info")}>info</Button>
      </div>

      <Progress value={30} className="h-10" />
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />

      <Skeleton className="h-[125px] w-[250px] rounded-xl" />

      <Skeleton className="h-[125px] w-[250px] rounded-xl" />

      <ScrollArea className="w-full h-[400px] border-divider-2 ">
        <div className="flex flex-col gap-4 px-8 py-2">
          {[1, 2, 3].map(() => (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                  <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter>
                  <p>Card Footer</p>
                </CardFooter>
              </Card>
              <Separator />
            </>
          ))}
        </div>
      </ScrollArea>

      <Input className="mt-4" />
    </div>
  );
}
