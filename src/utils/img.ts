import { CustomUploadFile } from '@/types/CustomUploadFile'

// 이미지 URL을 UploadFile[]로 변환
export const mapImageUrlsToFileList = (
  urls: string[],
  keys: string[]
): CustomUploadFile[] => {
  return urls.map((url, index) => ({
    uid: `existing-${index}`,
    name: `이미지${index + 1}`,
    status: 'done',
    url, // 이미지 미리보기 URL
    key: keys[index]
  }))
}
