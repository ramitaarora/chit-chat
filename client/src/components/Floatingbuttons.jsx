// App.jsx
import React from 'react';
import { CommentOutlined, CustomerServiceOutlined, SmileOutlined, HomeOutLined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const Floatingbutton = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      type="default"
      style={{ right: 90}}
      icon={<SmileOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<HomeOutLined />} />
    </FloatButton.Group>
  );
}
export default Floatingbutton;