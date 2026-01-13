import { useProfileData } from "@/hooks/queries/use-profile-data";
import Fallback from "../fallback";
import Loader from "../loader";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { useSession } from "@/store/session";
import EditProfileButton from "./edit-profile-button";

export default function ProfileInfo({ userId }: { userId: string }) {
  const session = useSession();
  const {
    data: profile,
    error: fetchProfileError,
    isPending: isFetchingProfilePending,
  } = useProfileData(userId);
  // userProfileData라는 훅이 반환하는 쿼리로 인해,
  // 인수로 전달한 userId에 해당하는 프로필이 반환된다

  if (fetchProfileError) return <Fallback />;
  if (isFetchingProfilePending) return <Loader />;

  const isMine = session?.user.id === userId;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={profile.avatar_url || defaultAvatar}
        className="h-30 w-30 rounded-full object-cover"
      />

      <div className="flex flex-col items-center gap-2">
        <div className="text-xl font-bold">{profile.nickname}</div>
        <div className="text-muted-foreground">{profile.bio}</div>
      </div>
      {isMine && <EditProfileButton />}
    </div>
  );
}
