const Home = () => {
  return (
    <div className="p-6">
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
      <div className="p-6`">
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          커뮤니티
        </div>
      </div>
    </div>
  );
};

export default Home;
