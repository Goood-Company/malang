import Progress from "@/components/ui/progress";
import { toast } from "sonner";
import Skeleton from "@/components/ui/skeleton";
import Button from "@/components/ui/button";
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

export default function TestPage() {
  return (
    <div style={{ padding: 20 }}>
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
