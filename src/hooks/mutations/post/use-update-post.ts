import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.setQueryData<Post>(
        QUERY_KEYS.post.byId(updatedPost.id),
        (prevPost) => {
          if (!prevPost)
            throw new Error(
              `Cannot find a post with id: ${updatedPost.id} from the cache data`
            );
          return { ...prevPost, ...updatedPost };
        }
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
