import { Link } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import logo from "../assets/logo.png";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const a = (e) => {
    e.preventDefault();
    console.log(searchQuery);
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
          <Link to="/login" className="text-black px-5">
            로그인
          </Link>
          <Link to="signup" className="text-black">
            회원가입
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
