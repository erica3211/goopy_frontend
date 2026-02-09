import { useWaitingList } from "../hooks/useWaiting";
import "../styles/WaitingList.css";

export default function WaitingList() {
  const { data: waitingData, isLoading: waitingLoading } =
    useWaitingList("WAITING");

  const { data: progressData, isLoading: progressLoading } =
    useWaitingList("IN_PROGRESS");

  if (waitingLoading || progressLoading) {
    return <div className="waiting-loading">로딩중...</div>;
  }

  const waitingList = waitingData?.data.items ?? [];
  const inProgressList = progressData?.data.items ?? [];

  const getEndTime = (startedAt: Date, estimatedMinutes: number) => {
    const start = new Date(startedAt);
    const end = new Date(start.getTime() + estimatedMinutes * 60 * 1000);

    return end.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="waiting-container">
      <h1 className="waiting-title">웨이팅 현황</h1>

      {/* 진행중 슬롯 */}
      <div className="current-slots">
        {inProgressList.map((w, idx) => (
          <div key={w.id} className="current-card">
            <div className="current-slot">슬롯 {idx + 1}</div>

            <div className="current-name">{w.name}</div>

            <div className="current-time">
              예상 종료 시간 | {getEndTime(w.started_at, w.estimated_minutes)}
            </div>

            <div className="slot-actions">
              <button className="btn end"
              //onClick={}
              >종료</button>
            </div>

            <div className="slot-duration">
              {[5, 10, 15, 20, 25].map((m) => {
                const isActive = w.estimated_minutes === m;

                return (
                  <button
                    key={m}
                    className={`btn minute ${isActive ? "active" : ""}`}
                  //onClick={() => updateEstimatedTime(w.id, m)}
                  >
                    {m}분
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 대기 목록 */}
      <div className="waiting-list">
        {waitingList.map((w, idx) => (
          <div key={w.id} className="waiting-row">
            <div className="waiting-order">{idx + 1}</div>

            <div className="waiting-name">{w.name}</div>

            <div className="waiting-time">
              {new Date(w.started_at).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            <div className="waiting-actions">
              <button className="btn start">시작</button>
              <button className="btn back">뒤로</button>
              <button className="btn cancel">취소</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}