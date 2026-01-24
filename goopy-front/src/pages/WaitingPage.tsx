import { useWaitingList } from "../hooks/useWaiting";

export default function Waiting() {
  const { data, isLoading } = useWaitingList();

  if (isLoading) return <div>로딩중...</div>;

  return (
    <div>
      <h1>웨이팅 현황</h1>
      {data?.map((w) => (
        <div key={w.id}>
          {w.queue_order + 1}번 · {w.status} · 예상 {w.estimated_minutes}분
        </div>
      ))}
    </div>
  );
}