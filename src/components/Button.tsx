import clsx from "clsx";

interface DeleteButtonProps {
  text: string;
  type: string;
  onClick: () => void;
}

const Button: React.FC<DeleteButtonProps> = ({ text, type, onClick }) => {
  const buttonClass = clsx(
    "rounded-full w-24 h-10 text-white font-semibold shadow-md flex items-center justify-center transition ",
    {
      "bg-red-400 hover:bg-red-500": type === "delete",
      "bg-gray-400 hover:bg-gray-500": type === "cancel",
      "bg-blue-400 hover:bg-blue-500": type === "normal",
    }
  );

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default Button;
