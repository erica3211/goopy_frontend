import { useEffect, useState } from "react";
import { updateWaiting } from "../api/waiting";
import { useUpdateWaiting, useWaitingList } from "../hooks/useWaiting";
import "../styles/WaitingList.css";
import CommonModal from "../components/modal/CommonModal";

export default function WaitingList() {

  const [commonModal, setCommonModal] = useState<{
    type: "ALERT" | "CONFIRM";
    message: string;
    onConfirm?: () => void;
  } | null>(null);
  
  const { data: waitingData, isLoading: waitingLoading } =
    useWaitingList("WAITING");

  const { data: progressData, isLoading: progressLoading } =
    useWaitingList("IN_PROGRESS");
  const { mutate: updateWaitingMutate } = useUpdateWaiting();
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

  const maskPhone = (phone?: string) => {
    if (!phone) return "";
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1-****-$2");
  };

  const formatTime = (time: Date) =>
    new Date(time).toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <>
      <div className="waiting-container">
        <h1 className="waiting-title">웨이팅 현황</h1>

        {/* 진행중 슬롯 */}
        <div className="current-slots">
          {inProgressList.map((w, idx) => (
            <div key={w.id} className="current-card">
              <div className="current-slot">슬롯 {idx + 1}</div>

              <div className="current-name">{w.name}</div>

              <div className="current-time">
                시작 시간 | {formatTime(w.started_at)}
                예상 종료 시간 | {getEndTime(w.started_at, w.estimated_minutes)}
              </div>

              <div className="current-controls">
                <div className="slot-duration">
                  {[5, 10, 15, 20, 25].map((m) => (
                    <button
                      key={m}
                      className={`btn minute ${w.estimated_minutes === m ? "active" : ""
                        }`}
                      onClick={() =>
                        updateWaitingMutate({
                          waiting_id: w.id,
                          estimated_minutes: m,
                          status: w.status,
                        })
                      }
                    >
                      {m}분
                    </button>
                  ))}
                  <button
                    className="btn end"
                    onClick={() =>
                      updateWaitingMutate({
                        waiting_id: w.id,
                        estimated_minutes: w.estimated_minutes,
                        status: "DONE",
                      })
                    }
                  >
                    종료
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 대기 목록 */}
        <div className="waiting-list">
          {waitingList.map((w, idx) => (
            <div key={w.id} className="waiting-row">
              <div className="waiting-order">{idx + 1}</div>

              <div>
                <div className="waiting-name">{w.name}</div>
                <div className="waiting-phone">{maskPhone(w.phone)}</div>
              </div>
              <div className="waiting-time">
                {formatTime(w.updated_at)}
              </div>

              <div className="waiting-actions">
                <button className="btn start" onClick={() => {
                  if (inProgressList.length >= 2) {
                    setCommonModal({
                      type: "ALERT",
                      message: "빈 슬롯이 없습니다.",
                    });
                    return;
                  }
                  setCommonModal({
                    type: "CONFIRM",
                    message: `${w.name}님의 염색을 시작하시겠습니까?`,
                    onConfirm: () => {
                      updateWaitingMutate({
                        waiting_id: w.id,
                        estimated_minutes: 15, // 기본값
                        status: "IN_PROGRESS",
                      });
                      setCommonModal(null);
                    },
                  });

                }}>시작</button>
                <button className="btn back">뒤로</button>
                <button className="btn cancel" onClick={() => updateWaitingMutate({
                  waiting_id: w.id,
                  estimated_minutes: w.estimated_minutes,
                  status: "CANCEL"
                })}>취소</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {commonModal?.type && (
        <CommonModal
          type={commonModal.type}
          message={commonModal.message}
          onConfirm={commonModal.onConfirm}
          onClose={() => {
            setCommonModal(null)
          }}
        />
      )}
    </>
  );
}