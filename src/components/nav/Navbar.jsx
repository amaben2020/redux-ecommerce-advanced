import React from 'react';
import { Menu, Badge } from 'antd';
import {
  UserOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Search from './../../components/forms/Search';
const Navbar = () => {
  const history = useHistory();

  const { SubMenu, Item } = Menu;

  //const { user } = useSelector((state) => state.user);
  const { user, cart } = useSelector((state) => ({ ...state }));

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
        <Item key="shop" icon={<ShoppingOutlined />}>
          <Link to="/shop"> Shop </Link>
        </Item>

        <Item key="cart" icon={<ShoppingCartOutlined />}>
          <Link to="/cart">
            {' '}
            <Badge count={cart.length} offset={[11, 0]}>
              Cart
            </Badge>
          </Link>
        </Item>
        {!user && (
          <Item
            className="float-right"
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register"> Register </Link>
          </Item>
        )}

        {!user && (
          <Item
            style={{ marginLeft: 'auto' }}
            className="float-right"
            key="login "
            icon={<UserOutlined />}
          >
            <Link to="/login"> Login </Link>
          </Item>
        )}

        {user && (
          <SubMenu
            key="SubMenu"
            style={{ marginLeft: 'auto' }}
            icon={<SettingOutlined />}
            title={user.email && user.email.split('@')[0]}
          >
            <Menu.ItemGroup title="Item 1">
              {user && user.role === 'subscriber' && (
                <Item>
                  {' '}
                  <Link to="/user/history">Dashboard</Link>
                </Item>
              )}

              {user && user.role === 'admin' && (
                <Item>
                  {' '}
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Item>
              )}

              <Item key="setting:3" onClick={logout} icon={<LogoutOutlined />}>
                Logout
              </Item>
            </Menu.ItemGroup>
          </SubMenu>
        )}
        <span className="ml-auto p-1">
          <Search />
        </span>
      </Menu>
    </div>
  );
};

export default Navbar;
