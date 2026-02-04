interface Props {
  onInput: (value: number) => void;
  onBackspace: () => void;
  onConfirm: () => void;
}
const numbers = [1,2,3,4,5,6,7,8,9,0];
const NumberKeypad = ({ onInput, onBackspace, onConfirm }: Props) => {
  return (
<div className="keypad keypad--number">
  {numbers.map((n) => (
    <button
      key={n}
      className="keypad__button"
      onClick={() => onInput(n)}
    >
      {n}
    </button>
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

export default NumberKeypad;