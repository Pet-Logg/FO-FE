import { FaTimes, FaLink, FaInstagram } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SuccessPopup: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000); // 3초후 Confetti 사라짐
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}

      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-12 rounded-lg shadow-lg relative w-80 text-center">
          <div className="text-6xl">🥳</div>
          <h2 className="text-4xl mt-3">반려동물 등록 완료!</h2>
          <p className="mt-2">
            함께하고 싶은 친구들에게 반려동물을 공유해 보세요!
          </p>

          <div className="flex justify-around mt-4">
            <button className="flex flex-col items-center">
              <FaLink />
              <span className="mt-2">링크 복사</span>
            </button>
            <button className="flex flex-col items-center">
              <RiKakaoTalkFill />
              <span className="mt-2">링크 복사</span>
            </button>
            <button className="flex flex-col items-center">
              <FaInstagram />
              <span className="mt-2">링크 복사</span>
            </button>
          </div>

          <div>
            <Link
              to="/"
              className="mt-4 w-16 h-10 rounded-full bg-blue-400 text-white"
            >
              확인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessPopup;
