import React from 'react';
import { CommentOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import iconSrc from '../assets/chitchatlogo.png';

const CustomIcon = () => {

  return (
    <img
      src={iconSrc}
      alt="logo"
      style={{ width: '100%', height: 'auto', margin: 'auto' }}
    />
  );
};

const Floatingbutton = () => {
  return (
    <FloatButton.Group
      trigger="hover"
      type="default"
      style={{ right: 90 }}
      icon={<CustomIcon />}
    >
      <FloatButton />
      <FloatButton icon={<HomeOutlined />} />
    </FloatButton.Group>
  );
}

export default Floatingbutton;