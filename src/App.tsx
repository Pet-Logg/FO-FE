import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/common/Footer'
import { Header } from './components/common/Header'
import { ChangePassword } from './pages/ChangePassword'
import { CreatePet } from './pages/CreatePet'
import { CreatePetDiary } from './pages/CreatePetDiary'
import { CreateProduct } from './pages/CreateProduct'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Order } from './pages/Order'
import { PetDetail } from './pages/PetDetail'
import { PetDiaries } from './pages/PetDiaries'
import { PetDiaryDetail } from './pages/PetDiaryDetail'
import { Pets } from './pages/Pets'
import { ProductDetail } from './pages/ProductDetail'
import { Products } from './pages/Products'
import { Signup } from './pages/Signup'
import { Carts } from './pages/Carts'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/createPet' element={<CreatePet />} />
          <Route path='/pets' element={<Pets />} />
          <Route path='/getPetDetail/:petId' element={<PetDetail />} />
          <Route path='/petDiaries' element={<PetDiaries />} />
          <Route path='/createPetDiary' element={<CreatePetDiary />} />
          <Route path='/petDiaryDetail/:diaryId' element={<PetDiaryDetail />} />
          <Route path='/changePassword' element={<ChangePassword />} />
          <Route path='/createProduct' element={<CreateProduct />} />
          <Route path='/products' element={<Products />} />
          <Route path='/:productId' element={<ProductDetail />} />
          <Route path='/cartView' element={<Carts />} />
          <Route path='/order' element={<Order />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
