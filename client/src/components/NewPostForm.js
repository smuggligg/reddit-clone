import React, { Component } from "react";
import glam, { H3 } from "glamorous";
import { Button, Form, Input } from "antd-3.5.4";
import { TagOutlined, LinkOutlined, FileTextOutlined } from "@ant-design/icons";

const StyledForm = glam(Form)({ maxWidth: 300 });

class NewPostForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, handleSubmit, redirect } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit(values, (err, res) => {
          if (err) {
            return console.error(err);
          }
          redirect(res.data.post._id);
        });
      }
    });
  };
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input title!"
              }
            ]
          })(<Input prefix={<TagOutlined />} placeholder="Title" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("url")(
            <Input prefix={<LinkOutlined />} placeholder="URL" />
          )}
        </Form.Item>
        <H3>OR</H3>
        <Form.Item>
          {getFieldDecorator("text")(
            <Input prefix={<FileTextOutlined />} placeholder="Text" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </StyledForm>
    );
  }
}

export default Form.create()(NewPostForm);
