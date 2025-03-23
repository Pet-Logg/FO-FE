import { useEffect, useState } from "react";
import { Upload, message } from "antd";
import { UploadFile } from "antd/es/upload/interface";
import { InboxOutlined } from "@ant-design/icons";
import { createProduct, updateProduct } from "../api/auth";
import { PcreateProductData } from "../types/ProductUploadData";
import { useLocation, useSearchParams } from "react-router-dom";
import { getProductById } from "../api/auth";
import OneButtonModal from "../components/OneButtonModal";

const { Dragger } = Upload;

const CreateProduct: React.FC = () => {
  const [formData, setFormData] = useState<PcreateProductData>({
    name: "",
    productImg: [],
    price: 0,
    quantity: 0,
  });

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const mode = location.state?.mode || "create";
  const paramProductId = searchParams.get("productId");

  const [showModal, setShowModal] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeFile = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 5) {
      message.error("최대 5개의 이미지만 업로드할 수 있습니다.");
      return;
    }
    setFileList(fileList);
    setFormData((prev) => ({
      ...prev,
      productImg: fileList,
    }));
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name === "" || formData.name === null) {
      message.error("상품명을 입력해주세요.");
      return;
    }

    if (formData.price === 0 || formData.name === null) {
      message.error("상품 가격을 입력해주세요.");
      return;
    }

    if (formData.quantity === 0 || formData.quantity === null) {
      message.error("상품 수량을 입력해주세요.");
      return;
    }

    if (formData.productImg.length === 0) {
      message.error("상품 이미지를 최소 1개 이상 선택하세요.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price.toString());
    data.append("quantity", formData.quantity.toString());

    formData.productImg.forEach((file) => {
      if (file.originFileObj) {
        data.append("productImg", file.originFileObj);
      }
    });

    // 수정할 때
    if (mode === "edit" && paramProductId) {
      try {
        await updateProduct(Number(paramProductId), data); // 수정 API 호출
        console.log("상품이 성공적으로 수정되었습니다!");
        setShowModal(true);
      } catch (error) {
        console.log("상품 수정에 실패했습니다.");
      }
      return;
    }

    try {
      await createProduct(data);
      setFormData({
        name: "",
        price: 0,
        quantity: 0,
        productImg: [],
      });
      setFileList([]);
      message.success("상품이 성공적으로 등록되었습니다!");
      setShowModal(true);
    } catch (error) {
      message.error("상품 등록에 실패했습니다.");
    }
  };

  // 이미지 URL을 UploadFile[]로 변환
  const mapImageUrlsToFileList = (urls: string[]): UploadFile[] => {
    return urls.map((url, index) => ({
      uid: `existing-${index}`,
      name: `이미지${index + 1}`,
      status: "done",
      url, // 이미지 미리보기 URL
    }));
  };

  // 수정모드일 때 정보 불러오기
  useEffect(() => {
    const fetchProductData = async () => {
      if (mode === "edit" && paramProductId) {
        try {
          const data = await getProductById(Number(paramProductId));

          const imageArray = Array.isArray(data.imgUrl)
            ? data.imgUrl
            : [data.imgUrl];

          const mappedImages = mapImageUrlsToFileList(imageArray);

          setFileList(mappedImages);

          setFormData({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            productImg: mappedImages,
          });
        } catch (error) {
          console.error("상품 정보 불러오기 실패", error);
        }
      }
    };

    fetchProductData();
  }, [mode, paramProductId]);

  return (
    <div className="w-[1050px] mx-auto">
      <div className="w-1/2 mx-auto my-20">
        <h2 className="text-2xl font-bold mb-10">상품 등록</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="flex font-bold items-start gap-1 mb-2">
              <div>상품명</div>
              <div className="text-sm text-red-600">*</div>
            </div>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={onChangeInput}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-300"
            />
          </div>
          <div className="mb-8">
            <div className="flex font-bold items-start gap-1 mb-2">
              <div>가격 (원)</div>
              <div className="text-sm text-red-600">*</div>
            </div>
            <input
              name="price"
              type="text"
              value={formData.price}
              onChange={onChangeInput}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-300"
            />
          </div>
          <div className="mb-8">
            <div className="flex font-bold items-start gap-1 mb-2">
              <div>수량 (개)</div>
              <div className="text-sm text-red-600">*</div>
            </div>
            <input
              name="quantity"
              type="text"
              value={formData.quantity}
              onChange={onChangeInput}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:border-blue-300"
            />
          </div>
          <div className="mb-12">
            <div className="flex font-bold gap-1 mb-2">
              <div>상품 이미지 (최대 5개)</div>
              <div className="text-sm text-red-600">*</div>
            </div>
            <Dragger
              name="productImg"
              listType="picture"
              multiple
              maxCount={5}
              fileList={fileList}
              onChange={onChangeFile}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                상품 이미지를 드래그하거나 클릭하여 업로드하세요.
              </p>
            </Dragger>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            상품 등록
          </button>
        </form>

        {showModal && (
          <OneButtonModal
            text="상품 등록 완료"
            buttonName="확인"
            buttonType="normal"
            onConfirm={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
