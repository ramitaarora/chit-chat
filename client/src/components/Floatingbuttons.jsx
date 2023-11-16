import React from 'react';
import { CommentOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const Floatingbutton = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      type="default"
      style={{ right: 90 }}
      icon={<SmileOutlined />}
    >
      <FloatButton />
      <FloatButton icon={<HomeOutlined />} /> {/* Replaced CustomerServiceOutlined with HomeOutlined */}
    </FloatButton.Group>
  );
}

export default Floatingbutton;