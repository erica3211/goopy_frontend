import { useRef, useState } from "react";
import Hangul from "hangul-js";

interface Props {
  isOpen: boolean;
  onInput: (char: string) => void;
  onBackspace: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

const KEYS_NORMAL = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
];

const KEYS_SHIFT = [
  ["ㅃ", "ㅉ", "ㄸ", "ㄲ", "ㅆ", "ㅛ", "ㅕ", "ㅑ", "ㅒ", "ㅖ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
];

export default function TextKeypad({
  isOpen,
  onInput,
  onBackspace,
  onConfirm,
  onClose,
}: Props) {
  const [isShift, setIsShift] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const startY = useRef<number | null>(null);

  const HANDLE_HEIGHT = 32;
  const CLOSED_Y = 360;
  const OPEN_Y = 0;

  const baseY = isOpen ? OPEN_Y : CLOSED_Y;
  const translateY = Math.min(
    CLOSED_Y,
    Math.max(OPEN_Y, baseY + offsetY)
  );

  const keys = isShift ? KEYS_SHIFT : KEYS_NORMAL;

  /* ================= 드래그 ================= */

  const handlePointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (startY.current === null) return;
    setOffsetY(e.clientY - startY.current);
  };

  const handlePointerUp = () => {
    if (offsetY > 120) {
      onClose(); // 아래로 충분히 → 닫기
    }
    setOffsetY(0);
    startY.current = null;
  };

  /* ================= 입력 ================= */

  const handleKeyInput = (char: string) => {
    onInput(char);
    if (isShift) setIsShift(false);
  };

  return (
    <div
      className="keypad keypad--text"
      style={{
        transform: `translateY(${translateY}px)`,
        transition: offsetY === 0 ? "transform 0.25s ease" : "none",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
     <div className="keypad__handle" />

      {keys.map((row, idx) => (
        <div key={idx} className="keypad__row">
          {row.map((key) => (
            <button
              key={key}
              className="keypad__button"
              onClick={() => handleKeyInput(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}

      <div className="keypad__row">
        <button
          className={`keypad__button keypad__button--shift ${
            isShift ? "active" : ""
          }`}
          onClick={() => setIsShift((prev) => !prev)}
        >
          Shift
        </button>

        <button
          className="keypad__button keypad__button--delete"
          onClick={onBackspace}
        >
          ←
        </button>

        <button
          className="keypad__button keypad__button--confirm"
          onClick={onConfirm}
        >
          확인
        </button>
      </div>
    </div>
  );
}