import { useCookies } from "react-cookie";
import ImageSlider from "../components/ImageSlider";

const Home = () => {
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const isLoggedin = !!cookies.Authorization;

  return (
    <div className="">
      <div>
        <h1 className="text-[#e25b36] text-6xl font-gamhong text-center py-10">
          Every Pawprint Tells a Story!
        </h1>
        <h1 className="text-[#e25b36] text-6xl font-gamhong text-center pb-20">
          만나서 반가워요!
        </h1>

        <ImageSlider />

        <span id="cursor"></span>
      </div>

      {isLoggedin ? (
        <div className="flex justify-around">
          <div className="text-3xl text-center">
            <p className="pb-4">오늘 내 반려동물</p>
            <div className="border-2 h-96 w-96"></div>
          </div>

          <div className="text-3xl text-center">
            <p className="pb-4">📅 캘린더</p>
            <div className="border-2 h-96 w-96"></div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="p-6`">
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          커뮤니티
        </div>
      </div>
    </div>
  );
};

export default Home;
