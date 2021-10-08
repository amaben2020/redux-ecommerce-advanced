import React from 'react';
import { Menu } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
const Navbar = () => {
  const history = useHistory();

  const { SubMenu, Item } = Menu;

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [current, setCurrent] = React.useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    // firebase.auth.signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });

    history.push('/login');
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="mail" icon={<AppstoreOutlined />}>
          <Link to="/"> Home </Link>
        </Item>

        <Item className="float-right" key="register" icon={<UserAddOutlined />}>
          <Link to="/register"> Register </Link>
        </Item>

        <Item
          style={{ marginLeft: 'auto' }}
          className="float-right"
          key="login "
          icon={<UserOutlined />}
        >
          <Link to="/login"> Login </Link>
        </Item>

        <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Dashboard">
          <Menu.ItemGroup title="Item 1">
            <Item key="setting:1">Option 1</Item>
            <Item key="setting:2">Option 2</Item>
            <Item key="setting:3" onClick={logout} icon={<LogoutOutlined />}>
              Logout
            </Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default Navbar;
