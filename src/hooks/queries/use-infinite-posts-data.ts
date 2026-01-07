import { fetchPosts } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import { useInfiniteQuery } from "@tanstack/react-query";

// useInfiniteQuery가 데이터를 불러오는 방식
/* 데이터베이스에 post item이 1~10번까지 저장되어 있는 경우
한 번에 쿼리 펑션으로 페이지를 다 불러오는 대신
Page라는 단위를 설정하여 (예: 한 페이지에 아이템 3개)
페이지 단위로 데이터를 나누어 불러온다 
쿼리 펑션에 pageParam으로 현재 데이터를 불러올 페이지 번호를 전달
*/

const PAGE_SIZE = 5; // number of items to be included in one page unit

export function useInfinitePostsData() {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const posts = await fetchPosts({ from, to });
      return posts;
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined; // 마지막 페이지 도달 시
      return allPages.length; // 페이지 번호가 1씩 증가하도록 설정됨
    },
    // 새로운 페이지의 데이터를 불러와야 할 때 쿼리펑션보다 먼저 호출되어 다음 페이지 번호 계산
    // 즉, 사용자가 스크롤을 최하단까지 내린 경우 호출됨
    // lastPage: 지난 페이지의 데이터 - 포스트 배열
    // allPages: 지금까지 불러온 모든 페이지의 데이터 - 이차원 배열 - 페이지 단위로 구분된 모든 포스트 아이템
  });
}
