import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed({ authorId }: { authorId?: string }) {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostsData(authorId);

  const { ref, inView } = useInView(); // 레퍼런스 객체 하나, inView라는 boolean 값 하나 반환
  // 아래의 빈 div에 ref를 연결해주면, div 태그를 인터섹션 옵저버가 관측하고
  // 해당 div 태그가 화면에 나타나는지 여부가 inView 값에 저장된다

  useEffect(() => {
    if (inView) {
      // div tag is in view, so load more data in the next page
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.map((postId) => <PostItem key={postId} postId={postId} />)
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
