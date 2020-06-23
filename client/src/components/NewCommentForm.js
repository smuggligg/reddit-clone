import React, { Component } from "react";
import { Button, Form, Input } from "antd-3.5.4";
import glam from "glamorous";

const StyledForm = glam(Form)({
  ".ant-form": { marginTop: 20 }
});

class NewCommentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const { form, handleSubmit, postId } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        handleSubmit({ ...values, postId }, (err, res) => {
          if (err) {
            return console.error(err);
          }
          form.resetFields();
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
          {getFieldDecorator("text", {
            rules: [
              {
                required: true,
                message: "Please input a comment!"
              }
            ]
          })(<Input.TextArea rows={4} placeholder="Comment" />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add comment
          </Button>
        </Form.Item>
      </StyledForm>
    );
  }
}

export default Form.create()(NewCommentForm);
