import React from "react";
import { Form, Tooltip, Select, Button, InputNumber } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    }
  },
  wrapperCol: {
    xs: {
      span: 12
    },
    sm: {
      span: 8
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export default function RegistrationForm({ onSubmit }) {
  const [form] = Form.useForm();

  const onFinish = values => {
    onSubmit(values);
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="PassengerForm"
      onFinish={onFinish}
      scrollToFirstError
      initialValues={{
        pclass: 1,
        gender: 0,
        age: 25,
        sibsp: 0,
        parch: 0,
        embarked: 1
      }}
    >
      <Form.Item name="pclass" label="Passenger Class">
        <Select
          style={{
            width: 70
          }}
        >
          <Option value={1}>1st</Option>
          <Option value={2}>2nd</Option>
          <Option value={3}>3rd</Option>
        </Select>
      </Form.Item>

      <Form.Item name="gender" label="Gender">
        <Select>
          <Option value={0}>Female</Option>
          <Option value={1}>Male</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            required: true,
            message: "Please input your age!"
          }
        ]}
        hasFeedback
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        name="sibsp"
        label={
          <span>
            # Siblings / Spouses&nbsp;
            <Tooltip title="Number of siblings and spouses travelling with you">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please provide an appropriate number!"
          }
        ]}
        hasFeedback
      >
        <InputNumber min={0} precision={0} />
      </Form.Item>

      <Form.Item
        name="parch"
        label={
          <span>
            # Parents / Childrens&nbsp;
            <Tooltip title="Number of parents and childrens travelling with you">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: "Please provide an appropriate number!"
          }
        ]}
        hasFeedback
      >
        <InputNumber min={0} precision={0} />
      </Form.Item>

      <Form.Item name="embarked" label="Port of Embarkation">
        <Select
          style={{
            width: 150
          }}
        >
          <Option value={1}>Cherbourg</Option>
          <Option value={2}>Queenstown</Option>
          <Option value={3}>Southampton</Option>
        </Select>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Will I survive?
        </Button>
      </Form.Item>
    </Form>
  );
}
