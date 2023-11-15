// App.jsx
import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const Floatingbutton = () => {
    return (
  <>
    <Button.Group
      trigger="click"
      type="primary"
      style={{ right: 24 }}
      icon={<CustomerServiceOutlined />}
    >
      <Button />
      <Button icon={<CommentOutlined />} />
    </Button.Group>
    <Button.Group
      trigger="hover"
      type="primary"
      style={{ right: 94 }}
      icon={<CustomerServiceOutlined />}
    >
      <Button />
      <Button icon={<CommentOutlined />} />
    </Button.Group>
  </>
    );
    }

export default Floatingbutton;
