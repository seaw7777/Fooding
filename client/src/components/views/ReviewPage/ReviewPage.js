import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Input } from 'antd';
import ImageUploader from 'react-images-upload';

function ReviewPage() {
  const { TextArea } = Input;
  const [value, setValue] = React.useState(0);

  return (
    <div>
      <div style={{ display: 'flex', margin: '2rem auto' }}>
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          style={{ display: 'flex', margin: ' auto' }}
        >
          <Rating
            name="simple-controlled"
            value={value}
            size="large"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
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
