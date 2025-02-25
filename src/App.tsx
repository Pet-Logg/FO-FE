import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePetInfo from "./pages/CreatePetInfo";
import Header from "./components/Header";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createPetInfo" element={<CreatePetInfo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
