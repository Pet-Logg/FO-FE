import { UploadFile } from 'antd/es/upload/interface'

export interface CustomUploadFile extends UploadFile {
  key?: string // S3 key 필드 추가
}
