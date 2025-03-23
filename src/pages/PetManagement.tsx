import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPetsById } from "../api/auth";
import basicPicture from "../assets/basicPicture.png";
import Button from "../components/Button";

interface Pet {
  petId: number;
  petName: string;
  petImg: string | null;
}

const PetManagement = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const getPets = async () => {
      try {
        const response = await getPetsById();
        setPets(response);
        setLoading(false);
      } catch (error) {
        console.error("등록 실패 : " + error);
        setError("❌ 데이터를 불러오는 중 오류가 발생했습니다. ❌");
        setLoading(false);
      }
    };

    getPets();
  }, []);

  return (
    <div className="py-16 min-h-screen w-[1050px] mx-auto flex flex-col">
      <h1 className="text-3xl font-bold mb-8">반려동물 하우스 🏠</h1>
      <div className="self-end">
        <Button
          text="추가하기"
          type="normal"
          onClick={() => nav("/createPetInfo")}
        />
      </div>

      {loading && <p className="text-center text-3xl">로딩 중..</p>}

      {error && <p className="text-center text-3xl text-red-500">{error}</p>}

      {!loading && !error && pets.length === 0 && (
        <p className="w-[1050px] min-h-[650px] mx-auto flex justify-center items-center text-3xl">
          등록된 반려동물이 없습니다.
        </p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.petId}
              className="text-center pb-4"
              onClick={() => nav(`/getPetDetail/${pet.petId}`)}
            >
              <img
                src={pet.petImg || basicPicture}
                alt={pet.petName}
                className="w-60 h-60 rounded-full mx-auto mb-4"
                onClick={() => nav(`/getPetDetail/${pet.petId}`)}
              />
              <h2
                className="text-xl font-semibold"
                onClick={() => nav(`/getPetDetail/${pet.petId}`)}
              >
                {pet.petName}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetManagement;
