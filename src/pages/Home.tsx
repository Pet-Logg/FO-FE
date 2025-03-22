import { useCookies } from "react-cookie";
import ImageSlider from "../components/ImageSlider";
import main001 from "../assets/main001.png";
import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";
import avatar3 from "../assets/avatar3.png";
import avatar4 from "../assets/avatar4.png";
import avatar5 from "../assets/avatar5.png";
import circle_triple from "../assets/circle-triple.svg";

const Home = () => {
  const [cookies, setCookie] = useCookies(["Authorization"]);
  const isLoggedin = !!cookies.Authorization;

  return (
    <div className="w-[1050px] mx-auto">
      {/* <div className="relative h-96">
        <div>
          <img src={main001} className="absolute z-10"></img>
          <h1 className="absolute top-20 left-12 text-[#f25f36] text-5xl font-gamhong py-20 z-20">
            Every Pawprint Tells a Story! <br />
          </h1>
          <h1 className="absolute top-60 left-12 text-[#f25f36] text-3xl font-gamhong pb-20 z-20 ">
            반려동물의 발자국으로 가득 채워나가세요!
          </h1>
        </div>
      </div> */}

      <section className="relative py-20 md:py-32 overflow-hidden ">
        <img
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl"
          src={circle_triple}
          alt=""
        />
        {/* <img className="absolute top-0 left-0" src={avatar2} alt="" />
        <img className="absolute top-0 right-0" src={avatar1} alt="" /> */}
        <div className="relative container px-4 mx-auto">
          <div className="max-w-sm sm:max-w-md md:max-w-2xl mx-auto">
            <h1 className="font-heading text-4xl xs:text-5xl md:text-6xl font-bold text-gray-900 mb-10">
              <span>Get ready to build your</span>
              <span className="font-serif italic">product</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10">
              Adipiscing neque id sit in odio at lorem.
            </p>
            <div className="md:flex mb-10 items-center">
              <div className="flex mb-6 md:mb-0 md:mr-6 items-center">
                <img src="saturn-assets/images/cta/avatar2.png" alt="" />
                <img className="-ml-2" src={avatar1} alt="" />
                <img className="-ml-2" src={avatar2} alt="" />
                <img className="-ml-2" src={avatar3} alt="" />
                <img className="-ml-2" src={avatar4} alt="" />
                <img className="-ml-2" src={avatar5} alt="" />
              </div>
              <div>
                <span className="block text-2xl font-bold leading-none">
                  250+
                </span>
                <span className="block text-xs text-gray-500 font-semibold">
                  Startup founders
                </span>
              </div>
            </div>
            <a
              className="relative group inline-block py-4 px-6 text-white font-semibold bg-orange-900 rounded-md overflow-hidden"
              href="#"
            >
              <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
              <div className="relative flex items-center justify-center">
                <span className="mr-4">Get Started</span>
                <span>
                  <svg
                    width="8"
                    height="12"
                    viewBox="0 0 8 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.83 5.29L2.59 1.05C2.49704 0.956274 2.38644 0.881879 2.26458 0.83111C2.14272 0.780342 2.01202 0.754204 1.88 0.754204C1.74799 0.754204 1.61729 0.780342 1.49543 0.83111C1.37357 0.881879 1.26297 0.956274 1.17 1.05C0.983753 1.23736 0.879211 1.49082 0.879211 1.755C0.879211 2.01919 0.983753 2.27264 1.17 2.46L4.71 6L1.17 9.54C0.983753 9.72736 0.879211 9.98082 0.879211 10.245C0.879211 10.5092 0.983753 10.7626 1.17 10.95C1.26344 11.0427 1.37426 11.116 1.4961 11.1658C1.61794 11.2155 1.7484 11.2408 1.88 11.24C2.01161 11.2408 2.14207 11.2155 2.26391 11.1658C2.38575 11.116 2.49656 11.0427 2.59 10.95L6.83 6.71C6.92373 6.61704 6.99813 6.50644 7.04889 6.38458C7.09966 6.26272 7.1258 6.13201 7.1258 6C7.1258 5.86799 7.09966 5.73728 7.04889 5.61543C6.99813 5.49357 6.92373 5.38297 6.83 5.29Z"
                      fill="#FFF2EE"
                    ></path>
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>
      {/* 
      <div className="z-0">
        <ImageSlider />
      </div> */}

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
    </div>
  );
};

export default Home;
