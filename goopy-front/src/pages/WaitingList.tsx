import { useWaitingList } from "../hooks/useWaiting";

export default function WaitingList() {
  const { data, isLoading } = useWaitingList();

  if (isLoading) return <div>로딩중...</div>;

  const items = data?.data.items ?? [];

  return (
    <div>
      <h1>웨이팅 현황</h1>

      {items.length === 0 && <div>웨이팅 없음</div>}
      {items.map((w) => (
        <div key={w.id}>
          이름 : {w.name} 전화번호 : {w.phone} {w.queue_order + 1}번 · {w.status} · 예상 {w.estimated_minutes}분
        </div>
      ))}
    </div>
  );
}