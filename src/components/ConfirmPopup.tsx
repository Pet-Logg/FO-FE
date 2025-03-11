import Button from "./Button";

interface PopupProps {
  text: string;
  subText: string;
  onConfirm: () => void;
  onCancle: () => void;
}

const ConfirmPopup: React.FC<PopupProps> = ({
  text,
  subText,
  onConfirm,
  onCancle,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-80">
        <p className="text-xl font-bold mb-1 text-center">{text}</p>
        <p className="text-gray-500 text-sm mb-5 text-center">{subText}</p>
        <div className="flex justify-around pt-3">
          <Button text="삭제" type="delete" onClick={onConfirm} />
          <Button text="취소" type="cancel" onClick={onCancle} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
