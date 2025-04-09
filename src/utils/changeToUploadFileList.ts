import { UploadFile } from 'antd'

export const changeToUploadFileList = (urls): UploadFile[] => {
  return urls.map((url, idx) => ({
    uid: `${idx}`,
    name: `image-${idx}`,
    url,
    status: 'done'
  }))
}
