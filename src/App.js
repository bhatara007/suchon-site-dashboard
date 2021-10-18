import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Typography, Card, Statistic, Space} from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';


const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

function App() {

  const [collapsed, setCollapsed] = useState(false);
  
  const [count, setCount] = useState(1)

  useEffect(() => {
      let id = setInterval(() => {setCount(count => count+1)}, 1000);
      return () => clearInterval(id);
  }, []);
  
  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
      <div className=' h-16 flex items-center justify-center'>
        <Typography.Text ellipsis className='text-2xl text-white font-semibold'>
          S{ !collapsed && "uChon's site"}
        </Typography.Text>
      </div>
          <Menu.Item key="" icon={<PieChartOutlined />} title="">
            DashBoard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Monitor
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Admin
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className='bg-white'></Header>
        <Content className='h-screen'>
          <Space className='m-5 space-x-4'>
            <Card className=''>
              <Statistic
                title="Active"
                value={count}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined className=''/>}
                suffix="%"
              />
            </Card>
            <Card>
              <Statistic
                title="Active"
                value={11.20}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Space>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
