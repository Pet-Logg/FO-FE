import { useState } from "react";
import { loginUser } from '../api/auth';

const LoginPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1. 폼 제출 시 기본 동작(페이지 새로고침) 방지
    e.preventDefault();

    // 2. 이전의 에러 메시지를 초기화
    setError('');

    try {
      // loginUser API 호출
      const data = await loginUser(email, password);
      console.log("로그인 성공", data);

      // 이후 토큰 저장, 페이지 리다이렌션 추가하기
    } catch(err){
      setError('로그인에 실패했습니다.');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-sm w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">
          로그인
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              이메일
            </label>
            <input
              type="email"
              value={email}
              className="mt-1 block w-full border rounded p-2"
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="mt-1 block w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;