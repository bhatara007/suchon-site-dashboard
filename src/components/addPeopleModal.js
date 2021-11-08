import React, { useState, useEffect} from "react";
import { Modal, Button, Form, Input, DatePicker } from "antd";

const AddPeopleModal = ({className}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);

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

const onFinish = (values) => {
    console.log("Success:", values);
    setIsModalVisible(false);
};

useEffect(() => {
    if (!isModalVisible){
        form.resetFields()
    }
}, [isModalVisible])

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
            name="birth_date"
            rules={[
              {
                required: true,
                message: "Please input your Birth Date",
              },
            ]}
          >
            <DatePicker />
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