import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../assets/logo.png";
import icon_user from "../assets/icon_user.svg";

const Header = () => {
  const nav = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["Authorization"]);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoggedin = !!cookies.Authorization;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const clickLogout = () => {
    removeCookie("Authorization", { path: "/" });
    nav("/");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const closeClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", closeClickOutside);
    } else {
      document.removeEventListener("mousedown", closeClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", closeClickOutside);
    };
  }, [isOpen]);

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

        <div className="relative" ref={dropdownRef}>
          {isLoggedin ? (
            <>
              <button onClick={toggleDropdown}>
                <img src={icon_user} className="mt-2" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-36 border border-gray-300 rounded-md shadow-lg bg-white">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/petManagement"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        반려동물 관리
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        육아일기
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        회원 정보 수정
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        비밀번호 변경
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={clickLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
