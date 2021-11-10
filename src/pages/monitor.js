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
  const [loading, setLoading] = useState(false)

  const getPeople = async (date) => {
    setLoading(true)
    try{
      const res = await axios.get('by_date/' + date)
      setPeople(res.data.people);
      setDate(res.data.date);
      console.log(res.data.date);
    }catch(error){ 
      console.log(error.response.status);
    }
    setLoading(false);
    
  }

  useEffect(() => {
    getPeople('20-10-2021')
  }, [])

  const onChange = (_, dateString) => {
    console.log(dateString);
    getPeople(dateString)
  }

  const handleDoneClick = async (e, reservation_id) => {
    e.preventDefault();
    await axios.patch("vaccinated/" + date + "/" + reservation_id);
    getPeople(date)
    console.log(people);
  };

  const handleCancelClick = async (e, reservation_id) => {
    e.preventDefault();
    await axios.patch("cancel/" + date + "/" + reservation_id)
    getPeople(date);
  }

  const dateFormat = "DD-MM-YYYY";

    const p = [
      {
        reservation_id: 7,
        register_timestamp: "2021-10-20T17:12:39.738000",
        name: "faa",
        surname: "rockmakmak",
        birth_date: "2002-10-22",
        citizen_id: "1234567848204",
        occupation: "programmer",
        address: "bkk thailand",
        priority: "3",
        vaccinated: false,
        vac_time: 9,
      },
      {
        reservation_id: 8,
        register_timestamp: "2021-10-20T17:12:39.738000",
        name: "fee",
        surname: "rockmakmak",
        birth_date: "2002-10-22",
        citizen_id: "1234567848204",
        occupation: "programmer",
        address: "bkk thailand",
        priority: "3",
        vaccinated: false,
        vac_time: 9,
      },
      {
        reservation_id: 9,
        register_timestamp: "2021-10-20T17:12:39.738000",
        name: "fuu",
        surname: "rockmakmak",
        birth_date: "2002-10-22",
        citizen_id: "1234567848204",
        occupation: "programmer",
        address: "bkk thailand",
        priority: "3",
        vaccinated: true,
        vac_time: 9,
      },
      {
        reservation_id: 10,
        register_timestamp: "2021-10-20T17:12:39.738000",
        name: "fii",
        surname: "rockmakmak",
        birth_date: "2002-10-22",
        citizen_id: "1234567848204",
        occupation: "programmer",
        address: "bkk thailand",
        priority: "3",
        vaccinated: false,
        vac_time: 9,
      },
    ]


  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <Header className="bg-white"></Header>
        <Content className="flex flex-col min-h-screen">
          <div className="m-10 space-x-3">
            <AddPeopleModal
              className="mb-4 ml-3"
              date={date}
              getPeople={getPeople}
            />
            <DatePicker onChange={onChange} format={dateFormat} />
            <Table dataSource={p} loading={loading}>
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
              <Column
                title="Action"
                dataIndex="action"
                key="action"
                render={(_, record) => {
                  return (
                    <div className="space-x-3">
                      <Button
                        onClick={(e) =>
                          handleDoneClick(e, record.reservation_id)
                        }
                        type="primary"
                      >
                        {" "}
                        Done{" "}
                      </Button>
                      <Button
                        onClick={(e) =>
                          handleCancelClick(e, record.reservation_id)
                        }
                        type="danger"
                      >
                        {" "}
                        Cancel{" "}
                      </Button>
                    </div>
                  );
                }}
              />
            </Table>
          </div>
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
}

export default Monitor;