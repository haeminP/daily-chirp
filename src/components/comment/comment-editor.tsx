import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateComment } from "@/hooks/mutations/comment/use-create-comment";
import { toast } from "sonner";

export default function CommentEditor({ postId }: { postId: number }) {
  const [content, setContent] = useState("");
  const { mutate: createComment, isPending: isCreateCommentPending } =
    useCreateComment({
      onSuccess: () => {
        setContent("");
      },
      onError: (error) => {
        toast.error("Cannot add the comment", { position: "top-center" });
      },
    });
  const handleSubmitClick = () => {
    if (content.trim() === "") return;
    createComment({ postId, content });
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex justify-end">
        <Button onClick={handleSubmitClick}>Add comment</Button>
      </div>
    </div>
  );
}
