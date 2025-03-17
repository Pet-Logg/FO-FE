import { UploadFile } from "antd";

export interface DiaryData {
  diaryId: number;
  title: string;
  content: string;
  images?: UploadFile[];
  createdAt: string; 
  imgUrl?: string;
}