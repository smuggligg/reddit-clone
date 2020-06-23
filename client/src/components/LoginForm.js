import React, { Component } from "react";
import glam from "glamorous";
import { Button, Form, Input } from "antd-3.5.4";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const StyledForm = glam(Form)({ maxWidth: 300 });
const UserIcon = glam(UserOutlined)({ color: "rgba(0,0,0,0.25)" });
const PassIcon = glam(LockOutlined)({ color: "rgba(0,0,0,0.25)" });

class LoginForm extends Component {
  handleSubmit = e => {
    console.log({ e });
    e.preventDefault();
    const { form, handleSubmit, redirect } = this.props; //Destructuring redirect from LoginPage
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values, err => {
          if (err) {
            return form.setFields({
              //Early return goes here!
              password: {
                value: values.password,
                errors: [new Error(err.response.data.message)]
              }
            });
          }
          redirect(); //Occurs if the if statement is passed over i.e. there is no error
        });
      }
    });
  };

  render() {
    const { form, type } = this.props;
    const { getFieldDecorator } = form;
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Please input your username"
              }
            ]
          })(<Input prefix={<UserIcon />} placeholder="Username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password"
              }
            ]
          })(
            <Input
              prefix={<PassIcon />}
              placeholder="Password"
              type="password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {type === "login" ? "Login" : "Signup"}
          </Button>
        </Form.Item>
      </StyledForm>
    );
  }
}

export default Form.create()(LoginForm); //Only tweak we're making at the moment
