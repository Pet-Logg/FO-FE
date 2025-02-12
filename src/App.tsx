import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";

const App = () => {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <Link to="/" className="text-white">
              로그인
            </Link>
            <Link to="signup" className="text-white">
              회원가입
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;