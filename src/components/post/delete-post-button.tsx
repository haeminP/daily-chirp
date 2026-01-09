import { useOpenAlertModal } from "@/store/alert-modal";
import { Button } from "../ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onError: (error) => {
      toast.error("Cannot delete the post", { position: "top-center" });
    },
  });

  const handleDeleteClick = () => {
    openAlertModal({
      title: "Delete Posting",
      description:
        "Deleted posts cannot be recovered. Are you sure you want to delete this post?",
      onPositive: () => {
        // when user confirms, send post delete request to supabase
        deletePost(id);
      },
    });
  };
  return (
    <Button
      disabled={isDeletePostPending}
      onClick={handleDeleteClick}
      className="cursor-pointer"
      variant={"ghost"}
    >
      Delete
    </Button>
  );
}
