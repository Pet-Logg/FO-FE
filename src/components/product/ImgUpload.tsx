import { CustomUploadFile } from '@/types/CustomUploadFile'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'

interface ImgUploadProps {
  fileList: CustomUploadFile[]
  handleImageUpload: ({ fileList }: { fileList: CustomUploadFile[] }) => void
}

export const ImgUpload = ({ fileList, handleImageUpload }: ImgUploadProps) => {
  return (
    <div className='mb-12'>
      <div className='mb-2 flex gap-1 font-bold'>
        <div>상품 이미지 (최대 5개)</div>
        <div className='text-sm text-red-600'>*</div>
      </div>
      <Dragger
        name='productImg'
        listType='picture'
        multiple
        maxCount={5}
        fileList={fileList}
        onChange={handleImageUpload}
        beforeUpload={() => false}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          상품 이미지를 드래그하거나 클릭하여 업로드하세요.
        </p>
      </Dragger>
    </div>
  )
}
