import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePetInfo from "./pages/CreatePetInfo";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createPetInfo" element={<CreatePetInfo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
