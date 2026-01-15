import { HeartIcon, MessageCircle } from "lucide-react";
import type { Post } from "@/types";
import defaultAvatar from "@/assets/default-avatar.jpg";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { types } from "util";
import { formatTimePassed } from "@/lib/time";
import EditPostButton from "./edit-post-button";
import DeletePostButton from "./delete-post-button";
import { useSession } from "@/store/session";
import { usePostByIdData } from "@/hooks/queries/use-post-by-id-data";
import Loader from "../loader";
import Fallback from "../fallback";
import LikePostButton from "./like-post-button";
import { Link } from "react-router";

export default function PostItem({
  postId,
  type,
}: {
  postId: number;
  type: "FEED" | "DETAIL";
}) {
  const session = useSession();
  const userId = session?.user.id;

  const { data: post, isPending, error } = usePostByIdData({ postId, type });

  if (isPending) return <Loader />;
  if (error) return <Fallback />;

  const isMine = post.author_id === userId;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      {/* 1. User information, edit/delete button */}
      <div className="flex justify-between">
        {/*1-1. User information */}
        <div className="flex items-start gap-4">
          <Link to={`profile/${post.author_id}`}>
            <img
              src={post.author.avatar_url || defaultAvatar}
              alt={`${post.author.nickname}'s profile image`}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div>
            <Link to={`profile/${post.author_id}`}>
              <div className="font-bold hover:underline">
                {post.author.nickname}
              </div>
            </Link>
            <div className="text-muted-foreground text-sm">
              {formatTimePassed(post.created_at)}
            </div>
          </div>
        </div>
        {/*1-2. Edit/Delete button */}
        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton {...post} />
              <DeletePostButton id={post.id} />
            </>
          )}
        </div>
      </div>

      {/* 2. Contents and Image Carousel */}
      <div className="flex cursor-pointer flex-col gap-5">
        {/*2-1. Contents */}
        <Link to={`/post/${post.id}`}>
          <div className="line-clamp-2 break-words whitespace-pre-wrap">
            {post.content}
          </div>
        </Link>
        {/* 2-1. Image Carousel */}
        <Carousel>
          <CarouselContent>
            {post.image_urls?.map((url, index) => (
              <CarouselItem className={`basis-2/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={url}
                    className="h-full max-h-[350px] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 3. Like, Comments buttons */}
      <div className="flex gap-2">
        {/* 3-1. Like button */}
        <LikePostButton
          id={post.id}
          likeCount={post.like_count}
          isLiked={post.isLiked}
        />

        {/* 3-2. Comments button */}
        <Link to={`/post/${post.id}`}>
          <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
            <MessageCircle className="h-4 w-4" />
            <span>Comments</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
