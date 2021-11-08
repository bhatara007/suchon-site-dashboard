import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
} from '@ant-design/icons';


const { Sider } = Layout;

const Sidebar = () => {

  const [collapsed, setCollapsed] = useState(false);
  
  const [count, setCount] = useState(1)

  
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
    <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        className='h-full'
    >
    <div className='h-16 flex items-center justify-center'>
    <Typography.Text ellipsis className='text-2xl text-white font-semibold'>
        S{ !collapsed && "uChon's site"}
    </Typography.Text>
    </div>
        <Menu.Item key="" icon={<PieChartOutlined />} title="">
          <a href='/'>DashBoard</a>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          <a href='/monitor'>Monitor</a>
        </Menu.Item>
        <Menu.Item key="3" icon={<ContainerOutlined />}>
        Admin
        </Menu.Item>
    </Menu>
    </Sider>
  );
}

export default Sidebar;