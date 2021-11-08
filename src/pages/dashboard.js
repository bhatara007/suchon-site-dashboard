import React, { useState, useEffect } from "react";
import { Button, Layout, Menu } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import Sider from "../components/sidebar";
import DashboardCard from "../components/dashboardCard";

import { FaSyringe } from "react-icons/fa";
import { BiChair } from "react-icons/bi";
import { GiStickingPlaster } from "react-icons/gi"

const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [count, setCount] = useState(1);

  useEffect(() => {
    let id = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Content className="flex flex-col min-h-screen">
          <div className="m-4 ">
            <div className=" text-4xl font-semibold mb-8 mt-11">
              <p className="text-5xl"> Dashboard</p>
            </div>
            <div className="space-x-4 flex flex-row mt-2 justify-between">
              <DashboardCard
                title="Current Queue"
                number="99"
                color="blue"
                icon={<FaSyringe />}
              />
              <DashboardCard
                title="Available seat"
                icon={<BiChair />}
                number="9999"
                color="green"
              />
              <DashboardCard
                title="Total people"
                icon={<TeamOutlined />}
                number="99"
                color="gray"
              />
              <DashboardCard 
              title="Vaccinated"
              icon={<GiStickingPlaster/>} 
              number="99" 
              color="orange" />
            </div>
            <div className="flex m-5 justify-center mt-24">
              <p className="text-6xl font-semibold">Name BHATARA CHAEMCHAN</p>
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
