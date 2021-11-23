import React, { useState, useEffect } from "react";
import {Layout, Menu } from "antd";
import { TeamOutlined } from "@ant-design/icons";
import Sider from "../components/sidebar";
import DashboardCard from "../components/dashboardCard";
import styled from 'styled-components';
import { FaSyringe } from "react-icons/fa";
import { BiChair } from "react-icons/bi";
import { GiStickingPlaster } from "react-icons/gi"

const {Footer, Content } = Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Dashboard = () => {

  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Container>
          <div className="m-4 ">
            <div className=" text-4xl font-semibold mb-8">
              <p className="text-5xl mt-7"> Dashboard</p>
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
                icon={<GiStickingPlaster />}
                number="99"
                color="orange"
              />
            </div>
            <div className=" font-semibold text-gray-700 rounded-xl overflow-hidden flex items-center flex-col space-y-6 mt-10 bg-white">
              <p className="text-4xl font-semibold mt-4"> Name </p>
              <p className="text-4xl font-semibold pb-5">BHATARA CHAEMCHAN</p>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
