import React, { useState, useEffect } from "react";
import {Layout,Table, Tag, Button} from "antd";
import { TeamOutlined } from "@ant-design/icons";
import Sider from "../components/sidebar";
import DashboardCard from "../components/dashboardCard";
import styled from 'styled-components';
import { FaSyringe } from "react-icons/fa";
import { BiChair } from "react-icons/bi";
import { GiStickingPlaster } from "react-icons/gi"
import axios from "../http";

const {Footer, Content } = Layout;
const { Column, ColumnGroup } = Table;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Dashboard = () => {

  const [people, setPeople] = useState([])
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)

  const getPeople = async (date) => {
    setLoading(true)
    try{
      const res = await axios.get("by_date/" + "11-11-2021");
      setPeople(res.data.people);
      setDate(res.data.date);
      console.log(res.data);
    }catch(error){ 
      console.log(error.response.status);
    }
    setLoading(false);
    
  }

  useEffect(() => {
    getPeople()
  }, [])


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
          </div>
          <div className="mx-5">
            <p className="text-5xl mb-5 font-semibold">
              {" "}
              Queue Information
            </p>
            <Table dataSource={people} loading={loading}>
              <Column
                title="Reservation ID"
                dataIndex="reservation_id"
                key="name"
                sorter={(a, b) => a - b}
              />
              <ColumnGroup colSpan="2" title="Name">
                <Column
                  title="First Name"
                  dataIndex="name"
                  key="name"
                  sorter={(a, b) => a.name.localeCompare(b.name)}
                />
                <Column title="Last Name" dataIndex="surname" key="surname" />
              </ColumnGroup>
              <Column
                title="Birth Date"
                dataIndex="birth_date"
                key="birth_date"
              />
              <Column title="Address" dataIndex="address" key="address" />
              <Column
                title="Occupation"
                dataIndex="occupation"
                key="occupation"
              />
              <Column
                title="Status"
                dataIndex="vaccinated"
                key="vaccinated"
                sorter={(a, b) => {
                  if (a.vaccinated) return -1;
                  if (b.vaccinated) return 1;
                  return 0;
                }}
                render={(status) => {
                  return (
                    <div>
                      {status ? (
                        <Tag color="green">Done</Tag>
                      ) : (
                        <Tag color="red">Not yet</Tag>
                      )}
                    </div>
                  );
                }}
              />
            </Table>
          </div>
        </Container>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
