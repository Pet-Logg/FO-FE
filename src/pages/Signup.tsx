import { useState } from "react";
import { useSignUpUser } from "@/services/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errer, setError] = useState("");
  const signUpMutate = useSignUpUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setError(""); // 이전 에러 초기화

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    signUpMutate.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log("회원가입 성공!", data);
        },
        onError: (err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("알 수 없는 에러가 발생했습니다.");
          }
          console.log(err);
        },
      }
    );
  };

  return (
    <>
      <div className="w-[1050px] min-h-[650px] mx-auto flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg border w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>
          {errer && <p className="text-red-500 mb-4">{errer}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                비밀번호
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
