import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ChangePassword from './pages/ChangePassword'
import CreatePetDiary from './pages/CreatePetDiary'
import CreatePetInfo from './pages/CreatePetInfo'
import CreateProduct from './pages/CreateProduct'
import Home from './pages/Home'
import Login from './pages/Login'
import PetDetail from './pages/PetDetail'
import PetDiary from './pages/PetDiary'
import PetDiaryDetail from './pages/PetDiaryDetail'
import PetManagement from './pages/PetManagement'
import ProductDetail from './pages/ProductDetail'
import Products from './pages/Products'
import Signup from './pages/Signup'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/createPetInfo' element={<CreatePetInfo />} />
          <Route path='/petManagement' element={<PetManagement />} />
          <Route path='/getPetDetail/:petId' element={<PetDetail />} />
          <Route path='/petDiary' element={<PetDiary />} />
          <Route path='/createPetDiary' element={<CreatePetDiary />} />
          <Route path='/petDiaryDetail/:diaryId' element={<PetDiaryDetail />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/createProduct' element={<CreateProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/:productId' element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
