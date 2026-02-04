import Hangul from "hangul-js";

interface Props {
    onInput: (value: string) => void;
    onBackspace: () => void;
    onConfirm: () => void;
}

export const appendHangul = (prev: string, char: string) => {
  const disassembled = Hangul.disassemble(prev);
  disassembled.push(char);
  return Hangul.assemble(disassembled);
};

const ROWS = [
    ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ"],
    ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
    ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
];

const TextKeypad = ({ onInput, onBackspace, onConfirm }: Props) => {
    return (
        <div className="keypad keypad--text">
            {ROWS.map((row, rowIndex) => (
                <div className="keypad__row" key={rowIndex}>
                    {row.map((char) => (
                        <button
                            key={char}
                            className="keypad__button"
                            onClick={() => onInput(char)}
                        >
                            {char}
                        </button>
                    ))}
                </div>
            ))}

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
    );
};

export default TextKeypad;