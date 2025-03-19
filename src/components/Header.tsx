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

  return (
    <nav className="px-24 py-4 sticky top-0 bg-white shadow-sm z-50">
      <div className="flex justify-between items-center w-[1050px] m-auto">
        <div>
          <Link to="/">
            <img src={logo} alt="로고" className="h-14" />
          </Link>
        </div>

        <div className="w-4/5 flex justify-end items-center">
          <div className="flex gap-8">
            <Link to="/petManagement">반려동물 관리</Link>
            <Link to="/petDiary">육아일기</Link>
          </div>
        </div>

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
                        to="/"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        회원 정보 수정
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/changePassword"
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
