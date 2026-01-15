import { useOpenAlertModal } from "@/store/alert-modal";
import { Button } from "../ui/button";
import { useDeletePost } from "@/hooks/mutations/post/use-delete-post";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function DeletePostButton({ id }: { id: number }) {
  const openAlertModal = useOpenAlertModal();
  const navigate = useNavigate();
  const { mutate: deletePost, isPending: isDeletePostPending } = useDeletePost({
    onSuccess: () => {
      const pathName = window.location.pathname;
      if (pathName.startsWith(`/post/${id}`)) {
        navigate("/", { replace: true });
      }
    },
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
