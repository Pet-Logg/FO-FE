import { useNavigate } from "react-router-dom"; // ✅ useNavigate 불러오기
import { useState } from "react";
import { FaPaw, FaCamera } from "react-icons/fa";
import { createPetInfo } from "../api/auth";
import SuccessPopup from "../components/SuccessPopup";

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

  const [petData, setPetData] = useState({
    petImage: null as string | null,
    petFile: null as File | null,
    petName: "",
    petAnimal: "",
    petBirth: "",
    petBreed: "",
    petGender: "",
    petWeight: "",
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name); // 어떤 요소에 입력이 들어온건지
    console.log(e.target.value);
    const { name, value } = e.target;

    setPetData({ ...petData, [name]: value });
  };

  const [showPopup, setShowPopup] = useState(false); // 팝업 상태
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

    setPetData({ ...petData, petImage: imageUrl, petFile: file });
    // setPetImage(imageUrl);
    // setPetFile(file);
  };

  // 폼 제출하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    setIsLoading(true);

    if (!petData.petName || !petData.petBirth) {
      alert("모든 필수 항목을 입력해주세요.");
      setIsLoading(false);
      return;
    }

    if (!petData.petFile || !petData.petImage) {
      alert("귀여운 반려동물의 사진을 넣어주세요");
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(petData).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      await createPetInfo(formData); // API

      setShowPopup(true);
    } catch (error) {
      console.error("등록 실패", error);
      alert("펫 정보 등록에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const today: string = new Date().toISOString().split("T")[0];

  return (
    <>
      {showPopup && <SuccessPopup />}

      <div className="pt-7 w-full h-full flex items-center justify-center p-24">
        <div className="p-8 w-96">
          <h2 className="text-4xl font-bold mb-10 flex items-center text-gray-700">
            반려동물 등록
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <div className="w-full flex flex-col items-center">
                <label className="cursor-pointer border border-gray-300 w-32 h-32 flex items-center justify-center rounded-full bg-gray-50">
                  {petData.petImage ? (
                    <img
                      src={petData.petImage}
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
              </div>
            </div>

            <div className="flex flex-col w-full mb-9">
              <div className="flex font-bold gap-1 ">
                <div className="mb-2">반려동물</div>
                <div className="text-sm text-red-600">*</div>
              </div>
              <div className="w-full flex gap-3">
                <button
                  name="petAnimal"
                  type="button"
                  className={`rounded-md border flex-1 py-2 ${
                    petData.petAnimal === "DOG" ? "bg-orange-100" : ""
                  }`}
                  onClick={() => setPetData({ ...petData, petAnimal: "DOG" })}
                >
                  강아지
                </button>
                <button
                  name="petAnimal"
                  type="button"
                  className={`rounded-md border flex-1 py-2 ${
                    petData.petAnimal === "CAT" ? "bg-orange-100" : ""
                  }`}
                  onClick={() => setPetData({ ...petData, petAnimal: "CAT" })}
                >
                  고양이
                </button>
              </div>
            </div>

            <div className="mb-9">
              <div className="flex font-bold items-start gap-1">
                <div className="mb-2">이름</div>
                <div className="text-sm text-red-600">*</div>
              </div>
              <input
                name="petName"
                type="text"
                value={petData.petName}
                onChange={onChangeInput}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-300"
              />
            </div>

            <div className="mb-9">
              <div className="flex font-bold items-start gap-1">
                <div className="mb-2">생일</div>
                <div className="text-sm text-red-600">*</div>
              </div>
              <input
                name="petBirth"
                type="date"
                max={today}
                value={petData.petBirth}
                onChange={onChangeInput}
                required
                placeholder="YYYY-MM-DD"
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-300"
              />
            </div>

            <div className="mb-9">
              <div className="flex font-bold items-start gap-1">
                <div className="mb-2">견종/묘종</div>
                <div className="text-sm text-red-600">*</div>
              </div>
              <input
                name="petBreed"
                type="text"
                value={petData.petBreed}
                onChange={onChangeInput}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-300"
              />
            </div>

            <div className="mb-9">
              <div className="flex font-bold gap-1 ">
                <div className="mb-2">성별</div>
                <div className="text-sm text-red-600">*</div>
              </div>
              <div className="flex w-full gap-3 ">
                <button
                  name="petGender"
                  type="button"
                  className={`rounded-md border flex-1 py-2 ${
                    petData.petGender === "MALE" ? "bg-sky-100" : " "
                  }`}
                  onClick={() => setPetData({ ...petData, petGender: "MALE" })}
                >
                  남아
                </button>
                <button
                  name="petGender"
                  type="button"
                  className={`rounded-md border flex-1 py-2 ${
                    petData.petGender === "FEMALE" ? "bg-violet-100" : " "
                  }`}
                  onClick={() =>
                    setPetData({ ...petData, petGender: "FEMALE" })
                  }
                >
                  여아
                </button>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex font-bold gap-1 ">
                <div>몸무게</div>
                <div className="text-sm text-red-600">*</div>
              </div>
              <p className="text-xs text-gray-500 mb-2">
                1kg미만인 경우, 750g이라면 0.75 입력해주세요.
              </p>
              <div className="relative flex w-full">
                <input
                  name="petWeight"
                  type="number"
                  min="0" // 0이상만 입력 가능
                  step="0.01" // 소수점 입력가능
                  value={petData.petWeight}
                  onChange={onChangeInput}
                  required
                  className="flex-1 py-2 pr-10 pl-3 border border-gray-200 rounded-md bg-transparent backdrop-blur-md focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700">
                  kg
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-md bg-gray-800 text-white"
                disabled={isLoading}
              >
                등록하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePetInfo;
