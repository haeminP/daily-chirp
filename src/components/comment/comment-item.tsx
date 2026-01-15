import { Link } from "react-router";
import defaultAvatar from "@/assets/default-avatar.jpg";

export default function CommentItem() {
  return (
    <div className={"flex flex-col gap-8  border-b pb-5"}>
      <div className="flex items-start gap-4">
        <Link to={"#"}>
          <div className="flex h-full flex-col">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={defaultAvatar}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col gap-2">
          <div className="font-bold">Author</div>
          <div>Comment Content</div>
          <div className="text-muted-foreground flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">Comment</div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div>10 Mins ago</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="cursor-pointer hover:underline">Edit</div>
              <div className="bg-border h-[13px] w-[2px]"></div>
              <div className="cursor-pointer hover:underline">Delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
