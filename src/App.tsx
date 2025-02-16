import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <Link to="/login" className="text-white">
              로그인
            </Link>
            <Link to="signup" className="text-white">
              회원가입
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
