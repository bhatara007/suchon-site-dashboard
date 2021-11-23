import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";
import  axios from "../http" 

const AddPeopleModal = ({className, date, getPeople}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState("");

  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.submit()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }; 

  const onFinish = async (values) => {
    console.log("Success:", values);
    const json = {...values, birth_date: birthDate}
    console.log(json);
    setIsModalVisible(false);
    // await axios.post("add/" + date, json);
    getPeople(date)
  };

  useEffect(() => {
    if (!isModalVisible){
        form.resetFields()
    }
  }, [isModalVisible])

  const onChange = (_, dateString) => {
      console.log(dateString);
      setBirthDate(dateString)
  }

  const dateFormat = "DD-MM-YYYY";

  return (
    <>
      <Button type="primary" className={className} onClick={showModal}>
        Add People
      </Button>
      <Modal
        title="Add Walk-in people"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: "Please input your Surname",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Citizen id"
            name="citizen_id"
            rules={[
              {
                required: true,
                message: "Please input your Citizen id",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Birth Date"
            rules={[
              {
                required: true,
                message: "Please input your Birth Date",
              },
            ]}
          >
            <DatePicker format={dateFormat} onChange={onChange} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddPeopleModal