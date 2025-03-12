import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetDetailById } from "../api/auth";
import basicPicture from "../assets/basicPicture.png";
import { deletePet } from "../api/auth";
import ConfirmPopup from "../components/ConfirmPopup";
import Button from "../components/Button";

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
  const nav = useNavigate();
  const { petId } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    const getPetDetail = async () => {
      try {
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

  const clickDeletePet = async () => {
    if (!petId) return;

    try {
      await deletePet(Number(petId));
      nav("/petManagement");
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  if (loading) return <p className="text-center text-3xl">⏳ 로딩 중...</p>;
  if (error)
    return <p className="text-center text-3xl text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg">
        <img
          src={pet?.petImg || basicPicture}
          className="w-60 h-60 mx-auto mb-6 object-cover rounded-full border border-gray-300"
        />

        <h1 className="text-3xl font-bold mb-6 text-center">{pet?.petName}</h1>

        <div>
          <h1 className="text-lg font-bold ml-2 mb-3">🐶 기본 정보</h1>
          <div className="mx-10 grid grid-cols-2 gap-y-2 border-b pb-5">
            <p className="text-left font-medium">
              {pet?.animal === "DOG" ? "견종" : "묘종"}
            </p>
            <p>{pet?.petBreed || "-"}</p>

            <p className="text-left font-medium">성별</p>
            <p>
              {pet?.petGender
                ? pet.petGender === "MALE"
                  ? "남자"
                  : "여자"
                : "-"}
            </p>

            <p className="text-left font-medium">생년월일</p>
            <p>
              {pet?.petBirth
                ? new Date(pet.petBirth).toISOString().split("T")[0]
                : "-"}
            </p>

            <p className="text-left font-medium">몸무게</p>
            <p>{pet?.petWeight ? `${pet?.petWeight} kg` : "-"} </p>
          </div>

          <h1 className="text-lg font-bold ml-2 mb-3 pt-5">💊 건강 정보</h1>
          <div className="mx-10 grid grid-cols-2 gap-y-2 ">
            <p className="text-left font-medium">중성화 여부</p>
            <p>-</p>

            <p className="text-left font-medium">염려질환</p>
            <p>-</p>

            <p className="text-left font-medium">알러지</p>
            <p>-</p>
          </div>
        </div>

        <div className="flex justify-center pt-9 gap-7">
          <Button
            text={"수정"}
            type={"normal"}
            onClick={() => {
              nav("/editPetInfo");
            }}
          />
          <Button
            text={"삭제"}
            type={"delete"}
            onClick={() => setOpenPopup(true)}
          />
        </div>
      </div>

      {openPopup && (
        <ConfirmPopup
          text="반려동물을 삭제하시겠습니까?"
          subText="삭제한 반려동물은 복구할 수 없습니다."
          onCancle={() => {
            setOpenPopup(false);
          }}
          onConfirm={clickDeletePet}
        />
      )}
    </div>
  );
};

export default PetDetail;
