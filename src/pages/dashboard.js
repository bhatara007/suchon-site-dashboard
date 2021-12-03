import React, { useState, useEffect } from "react";
import {Layout,Table, Tag, Button, DatePicker} from "antd";
import { TeamOutlined } from "@ant-design/icons";
import Sider from "../components/sidebar";
import DashboardCard from "../components/dashboardCard";
import styled from 'styled-components';
import { FaSyringe } from "react-icons/fa";
import { BiChair } from "react-icons/bi";
import { GiStickingPlaster } from "react-icons/gi"
import axios from "../http";
import moment from 'moment'

const {Footer, Content } = Layout;
const { Column, ColumnGroup } = Table;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Dashboard = () => {

  const dateFormat = "DD-MM-YYYY";

  const [people, setPeople] = useState([])
  const [date, setDate] = useState(moment(new Date()).format("DD-MM-YYYY"))
  const [loading, setLoading] = useState(false)

  const [current, setCurrent] = useState("")
  const [available, setAvailable] = useState("");
  const [total, setTotal] = useState("");
  const [vaccine, setVaccine] = useState("");

  const getCurrent = async () => {
      axios.get('')
  }

  const getAvailable = async (date) => {
      const { data } = await axios.get("count/walkin/" + date);
      console.log(data);
      setAvailable(data.total_walkin)
  };

  const getTotal = async (date) => {
      const { data } = await axios.get("count/total/" + date);
      setTotal(data.count);
      setVaccine(data.vaccinated)

  };

  const getVaccine = async () => {

  };

  
  const onChange = (_, dateString) => {
    console.log("dateeeeee", dateString);
    setDate(dateString);
    getAvailable(dateString);
    getTotal(dateString);
    getPeople(dateString);
  };


  const getPeople = async (date) => {
    const res = await axios.get("by_date/queue/" + date);
    console.log(res.data);
    setPeople(res.data.people);
    setDate(res.data.date)
  };
  
  useEffect(() => {
    setDate(moment(new Date()).format("DD-MM-YYYY"));
    getAvailable(date)
    getTotal(date)
    getPeople(date);
  }, [])

  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Container>
          <div className="m-4">
            <div className="space-y-2 mb-6">
              <p className="text-5xl mt-7"> Dashboard</p>
              <p className="mt-7 text-lg "> Date: {date} </p>
            </div>
            <div className="space-x-4 flex flex-row mt-2 justify-between">
              <DashboardCard
                title="Current"
                number="99"
                color="blue"
                icon={<FaSyringe />}
              />
              <DashboardCard
                title="Available"
                icon={<BiChair />}
                number={available}
                color="green"
              />
              <DashboardCard
                title="Total people"
                icon={<TeamOutlined />}
                number={total}
                color="gray"
              />
              <DashboardCard
                title="Vaccinated"
                icon={<GiStickingPlaster />}
                number={vaccine}
                color="orange"
              />
            </div>
          </div>
          <div className="mx-5">
            <p className="text-5xl mb-5"> Queue Information</p>
            <DatePicker onChange={onChange} format={dateFormat} />
            <Table dataSource={people} loading={loading}>
              <Column
                title="Queue"
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
