import PostFeed from "@/components/post/post-feed";
import ProfileInfo from "@/components/profile/profile-info";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

export default function ProfileDetailPage() {
  const params = useParams();
  const userId = params.userId;

  // 사용자가 이 페이지에 진입하여 페이지 컴포넌트가 마운트될 때마다 스크롤을 최상단으로 고정
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // 유저가 없는 경우 인덱스 페이지로 이동(replace를 사용해 뒤로가기 방지)
  if (!userId) return <Navigate to={"/"} replace />;

  // 유저가 있는 경우 수파베이스에서 유저의 프로필 데이터를 불러와 화면에 렌더링
  return (
    <div className="flex flex-col gap-10">
      <ProfileInfo userId={userId} />
      <div className="border-b"></div>
      <PostFeed authorId={userId} />
    </div>
  );
}
