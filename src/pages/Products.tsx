import { useState, useEffect } from "react";
import { ProductData } from "../types/ProductData";
import { getProducts } from "../api/auth"; // 백엔드 API 호출 함수
import { Link } from "react-router-dom";
import { getUserRole } from "../utils/getUserRole";
import Button from "../components/Button";

// 첫 번째 이미지를 가져오는 함수
const getFirstImage = (imgUrls: string[] | string): string => {
  if (Array.isArray(imgUrls) && imgUrls.length > 0) {
    return imgUrls[0]; // 배열이면 첫 번째 이미지 반환
  }
  return imgUrls[0] ?? ""; // 배열이 아니면 그대로 반환, 없으면 빈 문자열 반환
};

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // 백엔드 API에서 상품 데이터 가져오기
        setProducts(data);
      } catch (error) {
        console.error("상품 목록을 불러오는 중 오류 발생:", error);
      }
    };

    fetchProducts();

    const role = getUserRole();

    if (role === "ADMIN") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="w-[1050px] min-h-[600px] mx-auto py-12">
      <h2 className="text-2xl font-bold mb-10">상품 목록</h2>
      {isAdmin && (
        <Link to={"/createProduct"} className="flex justify-end mb-5">
          <Button text={"상품 등록"} type={"normal"} onClick={() => {}} />
        </Link>
      )}
      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <Link to={`/${product.productId}`}>
            <div key={product.productId} className="border p-4 rounded-lg">
              <img
                src={getFirstImage(product.imgUrl)}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-semibold">{product.name}</h3>
              <p className="text-xl font-bold">
                {product.price.toLocaleString()}원
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
