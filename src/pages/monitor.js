import React, { useState, useEffect } from 'react';
import { DatePicker, Layout, Menu, Table, Tag, Button } from "antd";
import {
  TeamOutlined,
} from '@ant-design/icons';
import Sider from '../components/sidebar'
import DashboardCard from '../components/dashboardCard';
import axios from '../http'
import AddPeopleModal from '../components/addPeopleModal';
import moment  from 'moment';

import { FaSyringe } from 'react-icons/fa'

const { Column, ColumnGroup } = Table;



const { Header, Footer, Content } = Layout;
const { SubMenu } = Menu;

const Monitor = () => {


  const [people, setPeople] = useState([])
  const [date, setDate] = useState(moment(new Date()).format("DD-MM-YYYY"));
  const [loading, setLoading] = useState(false)

  const getPeople = async (date) => {
    setLoading(true)
    try{
      const res = await axios.get('by_date/' + date)
      setPeople(res.data.people);
      if(res.data.date){
        setDate(res.data.date);
      }
    }catch(error){ 
      console.log(error.response.status);
    }
    setLoading(false);
    
  }

  useEffect(() => {
    getPeople(date)
    console.log(date)
  }, [])

  const onChange = (_, dateString) => {
    setDate(dateString)
    getPeople(dateString)
  }

  const handleDoneClick = async (e, reservation_id) => {
    e.preventDefault();
    try{
      await axios.patch("vaccinated/" + date + "/" + reservation_id);
    }catch(error){
      console.log(error);
    }
    getPeople(date)
  };

  const handleCancelClick = async (e, reservation_id) => {
    e.preventDefault();
    await axios.patch("cancel/" + date + "/" + reservation_id)
    getPeople(date);
  }

  const dateFormat = "DD-MM-YYYY";

  return (
    <Layout>
      <Sider></Sider>
      <Layout>
        <div className="space-y-2">
          <p className="text-5xl mt-7 ml-12"> Monitor</p>
          <p className='mt-7 ml-12 text-lg mb-2'> Date: {date} </p>
        </div>
        <Content className="flex flex-col min-h-screen">
          <div className="m-10 mt-5 space-x-3">
            <AddPeopleModal
              className="mb-4 ml-3"
              date={date}
              getPeople={getPeople}
            />
            <DatePicker onChange={onChange} format={dateFormat} />
            <Table dataSource={people} loading={loading} className=" mx-20">
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
                    <div className="space-y-2 flex flex-col items-center">
                      <Button
                        className="w-20"
                        onClick={(e) =>
                          handleDoneClick(e, record.reservation_id)
                        }
                        type="primary"
                      >
                        {" "}
                        Done{" "}
                      </Button>
                      <Button
                        className="w-20"
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