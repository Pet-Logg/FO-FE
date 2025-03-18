import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryData } from "../types/DiaryData";
import { getDiaryDetailById } from "../api/auth";
import { Button, Upload, UploadFile } from "antd";

const PetDiaryDetail = () => {
  const { diaryId } = useParams();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [diary, setDiary] = useState<DiaryData>({
    diaryId: 0,
    title: "",
    content: "",
    imgUrl: [],
    createdAt: "",
  });

  useEffect(() => {
    if (diaryId) {
      getDiaryDetail(Number(diaryId));
    }
  }, [diaryId]);

  const getDiaryDetail = async (id: number) => {
    try {
      const response = await getDiaryDetailById(id);
      setDiary(response.data[0]);

      if (response.data[0]?.imgUrl) {
        const files: UploadFile[] = response.data[0].imgUrl.map(
          (url: string, index: number) => ({
            uid: `${index}`,
            name: `image-${index}`,
            url: url, // 백엔드에서 받은 이미지 URL
            status: "done",
          })
        );
        setFileList(files);
      }
    } catch (error) {
      console.error("다이어리 상세 정보를 가져오는 중 오류 발생", error);
      alert("다이어리 정보를 가져올 수 없습니다.");
    }
  };

  if (!diary) {
    return (
      <div className="w-full h-[800px] flex items-center justify-center">
        <p className="text-gray-500 text-lg">다이어리를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-1/2 mx-auto py-16 mb-12 relative">
      <div className="mb-5">
        {fileList.length > 0 && (
          <Upload
            listType="picture-card"
            fileList={fileList}
            showUploadList={{ showRemoveIcon: false }} // 삭제 버튼 숨김
            beforeUpload={() => false} // 실제 업로드 방지 (미리보기 용도)
          />
        )}
      </div>

      <div className="flex justify-center items-center">
        <div className="border border-gray-300 rounded-2xl h-[500px] w-full py-6 px-6">
          <div className="border-b border-gray-300">
            <input
              type="text"
              className="size-full mb-4 h-8 text-2xl focus:outline-none bg-white"
              disabled
              value={diary.title}
            />
          </div>
          <div className="w-full h-[388px]">
            <textarea
              className="mt-4 w-full h-full focus:outline-none resize-none bg-white"
              disabled
              value={diary.content}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <div className="mt-10">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/petDiary")}
          >
            수정
          </Button>
        </div>
        <div className="flex justify-end mt-10">
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/petDiary")}
          >
            목록
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PetDiaryDetail;
