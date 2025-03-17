import { UploadFile } from "antd";

export interface DiaryData {
  title: string;
  content: string;
  images?: UploadFile[];
}