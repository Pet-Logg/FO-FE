import { useState } from "react";
import Button from "../components/Button";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PetDiary = () => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const a = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full px-40 py-20">
        <div className="flex flex-row justify-between mb-10">
          <div>
            <Button
              text="✏️ 일기 쓰기"
              type="normal"
              onClick={() => {
                nav("/createPetDiary");
              }}
            />
          </div>
          <div className="flex items-center">
            <form onSubmit={a} className="relative flex items-center">
              <input
                type="text"
                placeholder="궁금한 것을 물어보세요!"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 md:w-96 px-4 py-2 border-2 border-orange-400 rounded-full focus:outline-none text-gray-700"
              />
              <button
                type="submit"
                className="absolute right-4 text-orange-500"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className="border p-5 rounded-lg">
            <div className="flex justify-between items-center border-b pb-3">
              <span className="font-bold">작성자</span>
              <span className="text-gray-500 text-sm">2025.01.01</span>
            </div>
            <h1 className="font-bold text-xl mt-4">일기 제목</h1>
            <p className="text-gray-600 text-sm mt-2">내용</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetDiary;
