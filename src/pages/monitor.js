import React, { useState, useEffect } from 'react';
import { DatePicker, Layout, Menu, Table, Tag, Button } from "antd";
import {
  TeamOutlined,
} from '@ant-design/icons';
import Sider from '../components/sidebar'
import DashboardCard from '../components/dashboardCard';
import axios from '../http'
import AddPeopleModal from '../components/addPeopleModal';

import { FaSyringe } from 'react-icons/fa'

const { Column, ColumnGroup } = Table;



const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const Monitor = () => {

  const [people, setPeople] = useState([])
  const [date, setDate] = useState("")

  const getPeople = async (date) => {

    const res = await axios.get('by_date/' + date)
    setPeople(res.data.people)
    setDate(res.data.date)
    console.log(res.data.date);
    
  }

  useEffect(() => {
    getPeople('20-10-2021')
  }, [])

  const onChange = (_, dateString) => {
    console.log(dateString);
    getPeople(dateString)
  }

  const handleDoneClick = (reservation_id) => {
    console.log(date);
    console.log(reservation_id);
    axios.patch(date + "/" + reservation_id);
  };

  const dateFormat = "DD-MM-YYYY";


  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header className="bg-white"></Header>
        <Content className="flex flex-col min-h-screen">
          <div className="m-10 space-x-3">
            <AddPeopleModal className="mb-4 ml-3" />
            <DatePicker onChange={onChange} format={dateFormat} />
            <Table dataSource={people}>
              <Column
                title="Reservation ID"
                dataIndex="reservation_id"
                key="name"
              />
              <ColumnGroup colSpan="2" title="Name">
                <Column title="First Name" dataIndex="name" key="name" />
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
              <Column
                title="Action"
                dataIndex="action"
                key="action"
                render={(_, record) => {
                  return (
                    <div className="space-x-3">
                      <Button
                        onClick={() => handleDoneClick(record.reservation_id)}
                        type="primary"
                      >
                        {" "}
                        Done{" "}
                      </Button>
                      <Button type="danger"> Cancel </Button>
                    </div>
                  );
                }}
              />
            </Table>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Monitor;