import { useSession } from "@/store/session";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import Fallback from "../fallback";
import Loader from "../loader";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useProfileEditorModal } from "@/store/profile-editor-modal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Image = { file: File; previewUrl: string };
export default function ProfileEditorModal() {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchProfilePending,
  } = useProfileData(session?.user.id);

  const store = useProfileEditorModal();
  const {
    isOpen,
    actions: { close },
  } = store;

  const [avatarImage, setAvatarImage] = useState<Image | null>(null);
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      if (avatarImage) URL.revokeObjectURL(avatarImage.previewUrl);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && profile) {
      setNickname(profile.nickname);
      setBio(profile.bio);
      setAvatarImage(null); // 어차피 새롭게 선택할 예정이므로 null 값으로 초기화
    }
  }, [profile, isOpen]);

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (avatarImage) {
      // remove saved images from memory to prevent memory leak
      URL.revokeObjectURL(avatarImage.previewUrl);
    }

    setAvatarImage({
      file,
      previewUrl: URL.createObjectURL(file),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="flex flex-col gap-5">
        <DialogTitle>Edit Profile</DialogTitle>
        {fetchProfileError && <Fallback />}
        {isFetchProfilePending && <Loader />}
        {!fetchProfileError && !isFetchProfilePending && (
          <>
            {/* edit profile image UI */}
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">Profile Image</div>
              <input
                onChange={handleSelectImage}
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <img
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                src={
                  avatarImage?.previewUrl || profile.avatar_url || defaultAvatar
                }
                className="h-20 w-20 cursor-pointer rounded-full object-cover"
              />
            </div>
            {/* edit nickname UI */}
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">Nickname</div>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            {/* edit bio UI */}
            <div className="flex flex-col gap-2">
              <div className="text-muted-foreground">Bio</div>
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <Button className="cursor-pointer">Save</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
