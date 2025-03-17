import { useEffect, useState } from "react";
import { Button } from "antd";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DiaryData } from "../types/DiaryData";
import { getDiaryById } from "../api/auth";
import defaultImg from "../assets/logo.png";

const PetDiary = () => {
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const MAX_LENGTH = 37; // 내용 최대 표시할 글자 수

  useEffect(() => {
    fetchDiaries();
  }, []);

  // 다이어리 목록 가져오기
  const fetchDiaries = async () => {
    try {
      const response = await getDiaryById();
      setDiaries(response.data);
      console.log(diaries);
    } catch (error) {
      console.error("다이어리 목록을 가져오는 중 오류 발생", error);
      alert("펫 목록 가져오기에 실패했습니다.");
    }
  };

  // 검색
  const filteredDiaries = diaries.filter((diary) =>
    diary.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const a = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="w-full h-[800px] px-72 py-20">
        <div className="flex flex-row justify-between mb-10">
          <Button
            type="primary"
            size="large"
            onClick={() => nav("/createPetDiary")}
          >
            ✏️ 일기 쓰기
          </Button>

          <form onSubmit={a} className="relative flex items-center">
            <input
              type="text"
              placeholder="일기 검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 md:w-96 px-4 py-2 border-2 border-orange-400 rounded-full focus:outline-none text-gray-700"
            />
            <button type="submit" className="absolute right-4 text-orange-500">
              <FaSearch />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-4 gap-x-5 gap-y-9">
          {filteredDiaries.length > 0 ? (
            filteredDiaries.map((diary) => (
              <div
                key={diary.diaryId}
                className="border p-5 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                onClick={() => nav(`/petDiaryDetail/${diary.diaryId}`)}
              >
                <div className="flex justify-between items-center border-b pb-3">
                  <span className="font-bold text-xl">{diary.title}</span>
                  <span className="text-gray-500 text-sm">
                    {diary.createdAt.split("T")[0]}
                  </span>
                </div>
                <img
                  src={diary.imgUrl?.[0] || defaultImg}
                  alt="Diary Image"
                  className="w-full h-40 object-cover rounded-md mt-3"
                />
                <p className="text-gray-600 text-sm mt-4">
                  {diary.content.length > MAX_LENGTH
                    ? `${diary.content.substring(0, MAX_LENGTH)}...`
                    : diary.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-4 text-center">
              작성된 다이어리가 없습니다.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default PetDiary;
