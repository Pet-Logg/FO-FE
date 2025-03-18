import { UploadFile } from "antd";

export interface DiaryData {
  diaryId: number;
  title: string;
  content: string;
  images?: UploadFile[];
  imgUrl?: string[];
  createdAt: string; 
}