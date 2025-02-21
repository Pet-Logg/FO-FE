import { useNavigate } from "react-router-dom"; // ✅ useNavigate 불러오기
import { useState } from "react";
import { FaPaw, FaCamera } from "react-icons/fa";
import { createPetInfo } from "../api/auth";
import Header from "../components/Header";

const CreatePetInfo = () => {
  const navigate = useNavigate();

  const [petImage, setPetImage] = useState<null | string>(null); // 미리보기 URL 저장
  const [petFile, setPetFile] = useState<null | File>(null); // 원본 파일 젖아
  const [petName, setPetName] = useState("");
  const [petAnimal, setPetAnimal] = useState("");
  const [petBirth, setPetBirth] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petGender, setPetGender] = useState("");
  const [petWeight, setPetWeight] = useState("");

  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 이미지 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    console.log("Uploaded Image URL:", imageUrl);

    setPetImage(imageUrl);
    setPetFile(file);
  };

  // 폼 제출하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setIsLoading(true);

    if (!petName || !petBirth) {
      alert("모든 필수 항목을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (!petFile || !petImage) {
      alert("귀여운 반려동물의 사진을 넣어주세요");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      if (petImage) {
        formData.append("petImage", petFile);
      }
      console.log(petImage);
      formData.append("petName", petName);
      formData.append("petAnimal", petAnimal);
      formData.append("petBirth", petBirth);
      formData.append("petBreed", petBreed);
      formData.append("petGender", petGender);
      formData.append("petWeight", petWeight);

      const response = await createPetInfo(formData);
      console.log("📝 FormData 내용:", [...formData.entries()]); // FormData 확인

      console.log("펫 정보 등록 완료!", response);

      alert("펫 정보가 성공적으로 등록되었습니다!");
      navigate("/dashboard"); // ✅ 등록 성공 후 이동
    } catch (error) {
      console.error("등록 실패", error);
      alert("펫 정보 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const todayArray: string[] = new Date().toISOString().split("T");
  const today: string = todayArray[0]; // "YYYY-MM-DD"

  return (
    <>
      <Header />

      <div className="pt-7 w-full h-full flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl mb-6 text-center flex items-center justify-center text-3xl">
            <FaPaw className="text-emerald-500 mr-2" /> 반려동물 프로필 등록
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block font-bold mb-2 ">
                반려동물 사진 업로드
              </label>
              <div className="w-full flex flex-col items-center">
                <label className="cursor-pointer border-2 border-dashed border-gray-300 w-32 h-32 flex items-center justify-center rounded-lg bg-gray-50">
                  {petImage ? (
                    <img
                      src={petImage}
                      alt="pet preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <FaCamera className="text-gray-400 text-2xl" />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  이미지 권장 크기: 140 x 140
                </p>
              </div>
            </div>

            <div className="mb-5 flex w-full justify-around">
              <button
                type="button"
                className={`rounded-md border px-6 py-2 ${
                  petAnimal === "DOG" ? "bg-yellow-200" : ""
                }`}
                onClick={() => setPetAnimal("DOG")}
              >
                강아지
              </button>
              <button
                type="button"
                className={`rounded-md border px-6 py-2 ${
                  petAnimal === "CAT" ? "bg-yellow-200" : ""
                }`}
                onClick={() => setPetAnimal("CAT")}
              >
                고양이
              </button>
            </div>

            <div className="mb-5">
              <label className="block mb-2">* 이름</label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-300"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2">* 생일</label>
              <input
                type="date"
                max={today}
                value={petBirth}
                onChange={(e) => setPetBirth(e.target.value)}
                required
                placeholder="YYYY-MM-DD"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-300"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2">견종/묘종</label>
              <input
                type="text"
                value={petBreed}
                onChange={(e) => setPetBreed(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-300"
              />
            </div>

            <div className="mb-5 w-full">
              <label className="block mb-2">성별</label>
              <div className="flex justify-around">
                <button
                  type="button"
                  className={`rounded-md border px-6 py-2 ${
                    petGender === "MALE" ? "bg-blue-200" : " "
                  }`}
                  onClick={() => {
                    setPetGender("MALE");
                  }}
                >
                  남아
                </button>
                <button
                  type="button"
                  className={`rounded-md border px-6 py-2 ${
                    petGender === "FEMALE" ? "bg-blue-200" : " "
                  }`}
                  onClick={() => {
                    setPetGender("FEMALE");
                  }}
                >
                  여아
                </button>
              </div>
            </div>

            {/* <div className="mb-5 w-full">
              <label className="block mb-2">중성화</label>
              <div className="flex justify-around">
                <button
                  type="button"
                  className={`rounded-md border px-6 py-2 ${
                    petIsNeutered === true ? "bg-green-200" : ""
                  }`}
                  onClick={() => {
                    setPetIsNeutered(true);
                  }}
                >
                  했어요!
                </button>
                <button
                  type="button"
                  className={`rounded-md border px-6 py-2 ${
                    petIsNeutered === false ? "bg-red-200" : ""
                  }`}
                  onClick={() => {
                    setPetIsNeutered(false);
                  }}
                >
                  안했어요!
                </button>
              </div>
            </div> */}

            <div className="mb-5">
              <label className="block mb-2">몸무게</label>
              <input
                type="number"
                min="0" // 0이상만 입력 가능
                step="0.01" // 소수점 입력가능
                value={petWeight}
                onChange={(e) => setPetWeight(e.target.value)}
                required
                className="px-3 py-2 mr-2 border border-gray-300 rounded-md focus:border-blue-300"
              />
              kg
              <p className="text-base ml-2 mt-1 text-gray-500">
                * 1kg미만인 경우, 750g이라면 0.75 입력
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-yellow-100 py-2 px-4 rounded-md hover:bg-pink-100"
                disabled={isLoading}
              >
                {isLoading ? "등록 중.." : "등록하기"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePetInfo;
