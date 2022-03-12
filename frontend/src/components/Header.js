import React, { useState } from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  UserAddOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    //console.log(e.key);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<MailOutlined />}>
        <Link to="/home">Home</Link>
      </Item>

      <Item key="Register" icon={<UserAddOutlined />} className="float-right">
        <Link to="/Register">Register</Link>
      </Item>

      <Item key="login" icon={<UserOutlined />} className="float-right">
        <Link to="/Login"> Login </Link>
      </Item>

      <SubMenu key="Profile" icon={<SettingOutlined />} title="User">
        <Item key="setting:1">View your profile</Item>
        <Item key="setting:2">Signout</Item>
      </SubMenu>
    </Menu>
  );
};

export default Header;
