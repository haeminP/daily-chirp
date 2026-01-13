import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import { useSession } from "@/store/session";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { PopoverClose } from "@radix-ui/react-popover";
import { Link } from "react-router";

export default function ProfileButton() {
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  if (!session) return null;
  return (
    <Popover>
      <PopoverTrigger>
        <img
          src={profile?.avatar_url || defaultAvatar}
          className="h-6 2-6 cursor-pointer rounded-full object-cover"
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col w-40 p-0">
        <PopoverClose asChild>
          <Link to={`/profile/${session.user.id}`}>
            <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
              Profile
            </div>
          </Link>
        </PopoverClose>
        <PopoverClose asChild>
          <div className="hover:bg-muted cursor-pointer px-4 py-3 text-sm">
            Logout
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}
