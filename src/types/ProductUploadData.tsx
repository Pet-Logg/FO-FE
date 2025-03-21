import { UploadFile } from "antd";

export interface PcreateProductData {
  name: string;
  productImg: UploadFile[];
  price: number;
  quantity: number;
}
