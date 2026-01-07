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

export default function PostItem(post: Post) {
  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      {/* 1. User information, edit/delete button */}
      <div className="flex justify-between">
        {/*1-1. User information */}
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar_url || defaultAvatar}
            alt={`${post.author.nickname}'s profile image`}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">
              {post.author.nickname}
            </div>
            <div className="text-muted-foreground text-sm">
              {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        </div>
        {/*1-2. Edit/Delete button */}
        <div className="text-muted-foreground flex text-sm">
          <Button className="cursor-pointer" variant={"ghost"}>
            Edit
          </Button>
          <Button className="cursor-pointer" variant={"ghost"}>
            Delete
          </Button>
        </div>
      </div>

      {/* 2. Contents and Image Carousel */}
      <div className="flex cursor-pointer flex-col gap-5">
        {/*2-1. Contents */}
        <div className="line-clamp-2 break-words whitespace-pre-wrap">
          {post.content}
        </div>
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
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
          <HeartIcon className="h-4 w-4" />
          <span>0</span>
        </div>

        {/* 3-2. Comments button */}
        <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border-1 p-2 px-4 text-sm">
          <MessageCircle className="h-4 w-4" />
          <span>Comments</span>
        </div>
      </div>
    </div>
  );
}
