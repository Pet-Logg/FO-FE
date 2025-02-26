import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPetsById } from "../api/auth";
import basicPicture from "../assets/basicPicture.png";

interface Pet {
  petId: number;
  petName: string;
  petImg: string | null;
}

const PetManagement = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
    <div className="relative px-40 pt-16 min-h-screen">
      <h1 className="text-3xl font-bold mb-14">반려동물 하우스 🏠</h1>
      <Link
        to="/createPetInfo"
        className="absolute right-72 top-20 bg-blue-400 rounded-full w-24 h-10 text-white font-semibold shadow-md flex items-center justify-center"
      >
        추가하기
      </Link>

      {loading && <p className="text-center text-3xl">로딩 중..</p>}

      {error && <p className="text-center text-3xl text-red-500">{error}</p>}

      {!loading && !error && pets.length === 0 && (
        <p className="text-center text-3xl">등록된 반려동물이 없습니다.</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.petId} className="text-center">
              <img
                src={pet.petImg || basicPicture}
                alt={pet.petName}
                className="w-60 mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold">{pet.petName}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetManagement;
