import { useState } from "react";
import { DiaryData } from "../types/DiaryData";
import { createDiary } from "../api/auth";
import { Upload, UploadFile, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const CreatePetDiary = () => {
  const nav = useNavigate();

  const [diaryData, setDiaryData] = useState<DiaryData>({
    title: "",
    content: "",
    images: [], //
  });

  // 변경감지
  const onChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setDiaryData({ ...diaryData, [name]: value });
  };

  // 이미지 업로드
  const handleImageUpload = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 5) {
      message.error("최대 5장까지만 업로드 가능합니다.");
      return;
    }
    setDiaryData({ ...diaryData, images: fileList });
  };

  // 이미지 삭제
  const handleRemoveImage = (file: UploadFile) => {
    const newImages = diaryData.images!.filter(
      (item: UploadFile) => item.uid !== file.uid
    );
    setDiaryData({ ...diaryData, images: newImages });
  };

  // 폼 제출하기
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    if (!diaryData.title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!diaryData.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("title", diaryData.title);
    formData.append("content", diaryData.content);

    // 이미지 파일 추가
    diaryData.images?.forEach((file: UploadFile) => {
      if (file.originFileObj) {
        // originFileObj은 실제 파일
        formData.append("images", file.originFileObj);
      }
    });

    try {
      await createDiary(formData); // API
      nav("/petDiary");
    } catch (error) {
      console.error("등록 실패", error);
      alert("펫 정보 등록에 실패했습니다.");
    }
  };

  return (
    <>
      <div className="w-full px-72 py-16 mb-12 relative">
        <h2 className="text-4xl font-bold mb-10 ml-36 text-gray-700">
          일기 작성
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5 ml-36">
            <Upload
              listType="picture-card"
              fileList={diaryData.images}
              onChange={handleImageUpload}
              onRemove={handleRemoveImage}
              beforeUpload={() => false} // 실제 업로드 X, 미리보기만
            >
              {diaryData.images!.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>사진 추가</div>
                </div>
              )}
            </Upload>
          </div>

          <div className="flex justify-center items-center">
            <div className="border border-gray-300 rounded-2xl h-[500px] w-3/4 py-6 px-6">
              <div className="border-b border-gray-300">
                <input
                  type="text"
                  placeholder="제목을 입력하세요."
                  className="size-full mb-4 h-8 text-2xl focus:outline-none"
                  name="title"
                  value={diaryData.title}
                  onChange={onChangeInput}
                />
              </div>
              <div className="w-full h-[388px]">
                <textarea
                  placeholder="내용을 입력하세요."
                  className="mt-4 w-full h-full focus:outline-none resize-none"
                  name="content"
                  value={diaryData.content}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>

          <div className="absolute right-1/4 mt-4">
            <Button type="primary" htmlType="submit">
              완료
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePetDiary;
