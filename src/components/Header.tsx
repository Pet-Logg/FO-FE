import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <nav className="p-4 sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="로고" className="h-14" />
        </Link>
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
