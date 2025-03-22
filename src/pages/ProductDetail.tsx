import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../api/auth";
import { ProductData } from "../types/ProductData";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!productId) return;
        const data = await getProductById(Number(productId));
        setProduct(data);

        // 대표 이미지 설정
        if (Array.isArray(data.imgUrl)) {
          setMainImage(data.imgUrl[0]);
        } else {
          setMainImage(data.imgUrl);
        }
      } catch (error) {
        console.error("상품 정보 가져오기 실패:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return (
      <div className="w-[1050px] min-h-[600px] flex justify-center items-center mx-auto">
        상품을 불러 올 수 없습니다.
      </div>
    );
  }

  const imageList = Array.isArray(product.imgUrl)
    ? product.imgUrl
    : [product.imgUrl];

  const handleQuantityChange = (type: "increase" | "decrease") => {
    setQuantity((prev) => {
      if (type === "increase") return prev + 1;
      return prev > 1 ? prev - 1 : 1;
    });
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="w-[1050px] min-h-[600px] mx-auto py-20 flex gap-12">
      {/* 왼쪽 상품 정보 */}
      <div className="w-[450px]">
        <div className="border rounded-lg overflow-hidden mb-3">
          <img src={mainImage} alt="대표 이미지" className="w-full h-[450px]" />
        </div>

        <div className="flex gap-2 justify-center">
          {imageList.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`img-${idx}`}
              onMouseEnter={() => setMainImage(img)}
              className="w-20 h-20 object-cover rounded-md border hover:border-blue-500 cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* 오른쪽 상품 정보 */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-3">{product.name}</h1>
        <p className="text-2xl font-bold text-red-600 mb-6">
          {product.price.toLocaleString()}원
        </p>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="font-medium mb-2">{product.name}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => handleQuantityChange("decrease")}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <div className="w-10 text-center">{quantity}</div>
              <button
                onClick={() => handleQuantityChange("increase")}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>
            <div className="text-lg font-bold">
              {(product.price * quantity).toLocaleString()}원
            </div>
          </div>
        </div>

        <div className="text-xl font-bold mb-6">
          총 상품금액{" "}
          <span className="text-red-600">{totalPrice.toLocaleString()}원</span>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 border border-gray-300 py-3 rounded-full hover:bg-gray-100">
            장바구니 담기
          </button>
          <button className="flex-1 bg-red-500 text-white py-3 rounded-full hover:bg-red-600">
            바로 구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
