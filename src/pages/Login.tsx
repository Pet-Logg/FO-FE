import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useCookies } from "react-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cookie, setCookie] = useCookies(["Authorization"]);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1. 폼 제출 시 기본 동작(페이지 새로고침) 방지
    e.preventDefault();

    // 2. 이전의 에러 메시지를 초기화
    setError("");

    try {
      // loginUser API 호출
      const data = await loginUser(email, password);
      console.log("로그인 성공", data);

      setCookie("Authorization", data.data, { path: "/" });

      nav("/createPetInfo");
    } catch (err) {
      setError("로그인에 실패했습니다.");
      console.log(err);
    }
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center">로그인</h2>
          <form onSubmit={handleSubmit} id="loginForm">
            <div className="mb-4">
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-grㄹay-900"
                >
                  자동로그인
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
