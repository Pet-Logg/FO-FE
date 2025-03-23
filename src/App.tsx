import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePetInfo from "./pages/CreatePetInfo";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PetManagement from "./pages/PetManagement";
import PetDetail from "./pages/PetDetail";
import PetDiary from "./pages/PetDiary";
import CreatePetDiary from "./pages/CreatePetDiary";
import PetDiaryDetail from "./pages/PetDiaryDetail";
import ChangePassword from "./pages/ChangePassword";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";

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
          <Route path="/petDiary" element={<PetDiary />} />
          <Route path="/createPetDiary" element={<CreatePetDiary />} />
          <Route path="/petDiaryDetail/:diaryId" element={<PetDiaryDetail />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/createProduct" element={<CreateProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
