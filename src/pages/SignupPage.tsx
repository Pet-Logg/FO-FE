import { useState } from "react";
import { signupUser } from "../api/auth";
const SignupPage = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errer, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 새로고침 방지
    setError(""); // 이전 에러 초기화

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const data = await signupUser(username, email, password);
      console.log("회원가입 성공!", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 에러가 발생했습니다.");
      }
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">
          회원가입
        </h2>
        {errer && <p className="text-red-500 mb-4" >{errer}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">이름</label>
            <input
              type="text"
              className="mt-1 block w-full border rounded p-2"
              required
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full border rounded p-2"
              required
              onChange={(e) => {
               setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호</label>
            <input
              type="password"
              className="mt-1 block w-full border rounded p-2"
              required
              onChange={(e) => {
               setPassword(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">비밀번호 확인</label>
            <input
              type="password"
              className="mt-1 block w-full border rounded p-2"
              required
              onChange={(e) => {
               setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;