import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { usePostEditorModal } from "@/store/post-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post";
import { toast } from "sonner";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useSession } from "@/store/session";
import { useOpenAlertModal } from "@/store/alert-modal";
import { useUpdatePost } from "@/hooks/mutations/post/use-update-post";

type Image = {
  file: File;
  previewUrl: string;
};

export default function PostEditorModal() {
  const session = useSession();
  const postEditorModal = usePostEditorModal();
  const openAlertModal = useOpenAlertModal(); //AlertModal을 오픈하는 액션 함수

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // callback function is called whenever content state is changed
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // initialize the height
      textareaRef.current.style.height = // set the height as the current scroll height
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!postEditorModal.isOpen) {
      images.forEach((image) => {
        // delete images from memory when the modal is closed
        URL.revokeObjectURL(image.previewUrl);
      });
      return;
    }

    if (postEditorModal.type === "CREATE") {
      setContent("");
      setImages([]);
    } else {
      // "EDIT"
      setContent(postEditorModal.content);
      setImages([]); // 이전에 선택한 이미지 초기화
    }

    textareaRef.current?.focus();
  }, [postEditorModal.isOpen]);

  const handleCloseModal = () => {
    if (content !== "" || images.length !== 0) {
      openAlertModal({
        title: "You haven't finished writing your post",
        description:
          "Leaving this page will discard everything you've written.",
        onPositive: () => {
          postEditorModal.actions.close();
        },
      });

      return; // 조건문 바깥의 close() 함수는 사용자가 뭔가 작성했을 때는 실행되지 않도록
    }
    postEditorModal.actions.close();
  };

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("Cannot create a post", {
        position: "top-center",
      });
    },
  });

  const { mutate: updatePost, isPending: isUpdatePostPending } = useUpdatePost({
    onSuccess: () => {
      postEditorModal.actions.close();
    },
    onError: (error) => {
      toast.error("Cannot modify the posting", { position: "top-center" });
    },
  });

  const handleSavePostClick = () => {
    if (content.trim() === "") return;
    if (!postEditorModal.isOpen) return;
    if (postEditorModal.type === "CREATE") {
      createPost({
        content,
        images: images.map((image) => image.file),
        userId: session!.user.id,
      });
    } else {
      if (content === postEditorModal.content) return;
      updatePost({
        id: postEditorModal.postId,
        content: content,
      });
    }
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files); // convert the selected files to js Array
      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = ""; // reinitialize the input value for future image selection
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl)
    );

    URL.revokeObjectURL(image.previewUrl); // delete image from memory
  };

  return (
    <Dialog open={postEditorModal.isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>Share your story</DialogTitle>
        <textarea
          disabled={isCreatePostPending}
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="How's your day going?"
        />
        <input
          onChange={handleSelectImages}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />

        {postEditorModal.isOpen && postEditorModal.type === "EDIT" && (
          <Carousel>
            <CarouselContent>
              {postEditorModal.imageUrls?.map((url) => (
                <CarouselItem key={url} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={url}
                      className="h-full w-full rounded-sm object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.previewUrl} className="basis-2/5">
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}

        {postEditorModal.isOpen && postEditorModal.type === "CREATE" && (
          <Button
            onClick={() => {
              fileInputRef.current?.click();
            }}
            disabled={isCreatePostPending}
            variant={"outline"}
            className="cursor-pointer"
          >
            <ImageIcon /> Add Images
          </Button>
        )}

        <Button
          disabled={isCreatePostPending}
          onClick={handleSavePostClick}
          className="cursor-pointer"
        >
          Save
        </Button>
      </DialogContent>
    </Dialog>
  );
}
