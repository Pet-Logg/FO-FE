import Button from "./Button";

interface PopupProps {
  text: string;
  buttonName: string;
  buttonType: string;
  onConfirm: () => void;
}

const OneButtonModal: React.FC<PopupProps> = ({
  text,
  buttonName,
  buttonType,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-80">
        <p className="text-xl font-bold mb-5 text-center">{text}</p>
        <div className="flex justify-around pt-3">
          <Button text={buttonName} type={buttonType} onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default OneButtonModal;
