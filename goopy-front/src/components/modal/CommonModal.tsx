interface Props {
  type: "ALERT" | "CONFIRM";
  message: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export default function CommonModal({
  type,
  message,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>{message}</p>

        <div className="modal-buttons">
          {type === "CONFIRM" ? (
            <>
              <button
                className="confirm"
                onClick={() => {
                  onConfirm?.();
                  onClose();
                }}
              >
                확인
              </button>

              <button className="cancel" onClick={onClose}>
                취소
              </button>
            </>
          ) : (
            <button className="confirm" onClick={onClose}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}