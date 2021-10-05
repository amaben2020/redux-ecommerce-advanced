import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const Navbar = () => {
  const { SubMenu } = Menu;

  const [current, setCurrent] = React.useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="mail" icon={<AppstoreOutlined />}>
          Home
        </Menu.Item>

        <Menu.Item
          className="float-right"
          key="register"
          icon={<UserAddOutlined />}
        >
          Register
        </Menu.Item>

        <Menu.Item className="float-right" key="login " icon={<UserOutlined />}>
          Login
        </Menu.Item>

        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Dashboard">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Navbar;
