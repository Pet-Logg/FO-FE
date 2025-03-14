import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePetInfo from "./pages/CreatePetInfo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PetManagement from "./pages/PetManagement";
import PetDetail from "./pages/PetDetail";

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
          <Route path="/petManagement" element={<PetManagement />} />
          <Route path="/getPetDetail/:petId" element={<PetDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
