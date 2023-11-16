import React from 'react';
import { HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import iconSrc from '/chitchatlogo.png';

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
      <FloatButton icon={<SettingOutlined />} />
      <FloatButton icon={<HomeOutlined />} />
    </FloatButton.Group>
  );
}

export default Floatingbutton;