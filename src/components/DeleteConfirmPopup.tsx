interface DeleteConfirmPopupProps {
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmPopup: React.FC<DeleteConfirmPopupProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-80">
        <p className="text-xl font-bold mb-1 text-center">
          반려동물을 삭제하시겠습니까?
        </p>
        <p className="text-gray-500 text-sm mb-5 text-center">
          삭제한 반려동물은 복구할 수 없습니다.
        </p>
        <div className="flex justify-center pt-3">
          <button
            onClick={onConfirm}
            className=" bg-red-400 rounded-full w-24 h-10 text-white font-semibold shadow-md flex items-center justify-center mr-5 hover:bg-red-500 transition"
          >
            삭제
          </button>
          <button
            onClick={onClose}
            className=" bg-blue-400 rounded-full w-24 h-10 text-white font-semibold shadow-md flex items-center justify-center hover:bg-blue-500 transition"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
