import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetDetailById } from "../api/auth";
import basicPicture from "../assets/basicPicture.png";

interface Pet {
  petId: number;
  petImg: string | null;
  animal: string;
  petName: string;
  petBirth: string | null;
  petBreed: string | null;
  petGender: string | null;
  petWeight: number | null;
}

const PetDetail = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPetDetail = async () => {
      try {
        console.log("펫 아이디를 보자 : " + petId);

        if (!petId) {
          throw new Error("잘못된 요청입니다.");
        }

        const response = await getPetDetailById(Number(petId));

        setPet(response);
      } catch (error) {
        console.error("등록 실패 : " + error);
        setError("❌ 데이터를 불러오는 중 오류가 발생했습니다. ❌");
      } finally {
        setLoading(false);
      }
    };

    getPetDetail();
  }, [petId]);

  if (loading) return <p className="text-center text-3xl">⏳ 로딩 중...</p>;
  if (error)
    return <p className="text-center text-3xl text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white max-w-md w-full mx-4 p-6 rounded-2xl shadow-lg">
        <h1 className="text-center text-3xl font-bold mb-5">동물 등록증</h1>
        <img
          src={pet?.petImg || basicPicture}
          className="w-60 h-60 mx-auto mb-6 object-cover rounded-full border border-gray-300"
        />
        <h1 className="text-3xl font-bold mb-6 text-center">{pet?.petName}</h1>

        <div className="mx-20 grid grid-cols-2 gap-y-2">
          <p className="text-left font-medium">
            {pet?.animal === "DOG" ? "🐶 견종" : "🐱 묘종"}
          </p>
          <p>{pet?.petBreed || "-"}</p>

          <p className="text-left font-medium">🌼 성별</p>
          <p>
            {pet?.petGender
              ? pet.petGender === "MALE"
                ? "남자"
                : "여자"
              : "-"}
          </p>

          <p className="text-left font-medium">🎂 생년월일</p>
          <p>
            {pet?.petBirth
              ? new Date(pet.petBirth).toISOString().split("T")[0]
              : "-"}
          </p>

          <p className="text-left font-medium">👀 몸무게</p>
          <p>{pet?.petWeight ? `${pet?.petWeight} kg` : "-"} </p>
        </div>

        <div className="flex justify-center pt-9">
          <button className=" bg-blue-400 rounded-full w-24 h-10 text-white font-semibold shadow-md flex items-center justify-center mr-5 hover:bg-blue-500 transition">
            수정하기
          </button>
          <button className=" bg-red-400 rounded-full w-24 h-10 text-white font-semibold shadow-md flex items-center justify-center hover:bg-red-500 transition">
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
