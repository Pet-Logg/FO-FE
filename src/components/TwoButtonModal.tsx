import Button from "./Button";

interface PopupProps {
  text: string;
  subText: string;
  firstButton: string;
  secondButton: string;
  firstType: string;
  secondType: string;
  onConfirm: () => void;
  onCancle: () => void;
}

const TwoButtonModal: React.FC<PopupProps> = ({
  text,
  subText,
  firstButton,
  secondButton,
  firstType,
  secondType,
  onConfirm,
  onCancle,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-80">
        <p className="text-xl font-bold mb-1 text-center">{text}</p>
        <p className="text-gray-500 text-sm mb-5 text-center">{subText}</p>
        <div className="flex justify-around pt-3">
          <Button text={firstButton} type={firstType} onClick={onConfirm} />
          <Button text={secondButton} type={secondType} onClick={onCancle} />
        </div>
      </div>
    </div>
  );
};

export default TwoButtonModal;
