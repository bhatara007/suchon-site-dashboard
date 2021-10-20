import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Typography, Card, Statistic, Space} from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';
import Sider from '../components/sidebar'
import Table from '../components/peopletable'


const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const Monitor = () => {

  const [collapsed, setCollapsed] = useState(false);
  
  const [count, setCount] = useState(1)

  useEffect(() => {
      let id = setInterval(() => {setCount(count => count+1)}, 1000);
      return () => clearInterval(id);
  }, []);
  
  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header className='bg-white'></Header>
        <div className='flex flex-col'>
          <div className='space-x-6 m-5 flex flex-row justify-center'>
            <Card className='h-auto w-auto'>
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
          </div>
          <div className='flex justify-between m-5'>
            <Card className='w-96 m-5'/>
            <Table className='w-1/2 h-30'/>
          </div>
        </div>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Monitor;