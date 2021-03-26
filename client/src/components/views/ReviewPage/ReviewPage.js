import React from 'react';

import { Input } from 'antd';
import ImageUploader from 'react-images-upload';

function ReviewPage() {
  const { TextArea } = Input;

  return (
    <div>
      <div>
        <h1>별점 매기는 곳</h1>
      </div>
      <div style={{ width: '90%', margin: '3rem auto' }}>
        <TextArea
          showCount
          maxLength={500}
          rows={6}
          style={{ borderColor: 'black' }}
        />
      </div>
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="사진 업로드"
          // onChange={this.onDrop}
          imgExtension={['.jpg', '.gif', '.png', '.gif']}
          maxFileSize={5242880}
        />
      </div>
    </div>
  );
}

export default ReviewPage;
