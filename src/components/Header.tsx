import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useCookies } from "react-cookie";

const Header = () => {
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoggedin = !!cookies.Authorization;

  const clickLogout = () => {
    removeCookie("Authorization", { path: "/" });
    nav("/");
  };

  const a = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <nav className="p-4 sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="로고" className="h-14" />
        </Link>

        <form onSubmit={a} className="relative flex items-center">
          <input
            type="text"
            placeholder="궁금한 것을 물어보세요!"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 md:w-96 px-4 py-2 border-2 border-orange-400 rounded-full focus:outline-none text-gray-700"
          />
          <button type="submit" className="absolute right-4 text-orange-500">
            <FaSearch />
          </button>
        </form>

        <div>
          {isLoggedin ? (
            <>
              <Link to="/mypage" className="px-5">
                마이페이지
              </Link>
              <button className="px-5" onClick={clickLogout}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5">
                로그인
              </Link>
              <Link to="signup">회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
