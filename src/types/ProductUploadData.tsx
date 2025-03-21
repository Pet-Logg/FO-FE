import { UploadFile } from "antd";

export interface ProductUploadData {
  name: string;
  productImg: UploadFile[];
  price: number;
  quantity: number;
}
