import { useCookies } from "react-cookie";
import ImageSlider from "../components/ImageSlider";
import main001 from "../assets/main001.png";

const Home = () => {
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const isLoggedin = !!cookies.Authorization;

  return (
    <div className="px-48">
      <div className="relative h-96">
        <div>
          <img src={main001} className="absolute z-10"></img>
          <h1 className="absolute top-20 left-12 text-[#f25f36] text-5xl font-gamhong py-20 z-20">
            Every Pawprint Tells a Story! <br />
          </h1>
          <h1 className="absolute top-60 left-12 text-[#f25f36] text-3xl font-gamhong pb-20 z-20 ">
            반려동물의 발자국으로 가득 채워나가세요!
          </h1>
        </div>
      </div>

      <div className="z-0">
        <ImageSlider />
      </div>

      {/* {isLoggedin ? (
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
      )} */}

      <div className="p-6`">
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          커뮤니티
        </div>
      </div>
    </div>
  );
};

export default Home;
