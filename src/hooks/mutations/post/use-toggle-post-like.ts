import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { Post, useMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: useMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    // togglePostLike 함수에 인수로 전달된 {postId, userId}가
    // onMutate 함수의 매개변수로 전달됨
    onMutate: async ({ postId }) => {
      // 현재 낙관적으로 업데이트하려는 특정 포스트 아이템의 캐시 데이터가
      // 이전에 발생한 조회 요청으로 인해 덮혀씌워지지 않도록 방지하기 위해
      // 쿼리 키를 기준으로 이전의 조회 요청을 먼저 취소
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      // 혹시 mutation Fn (즉, 좋아요 요청)이 실패한 경우
      // 낙관적으로 업데이트한 캐시를 원상복구시켜줘야 함 -> 업데이트 이전의 포스트아이템 캐시 데이터를 저장

      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KEYS.post.byId(postId)
      );

      queryClient.setQueryData<Post>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post) throw new Error("Posting does not exist");
        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return { prevPost };
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      // 원상복구 로직
      if (context && context.prevPost) {
        queryClient.setQueryData(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
