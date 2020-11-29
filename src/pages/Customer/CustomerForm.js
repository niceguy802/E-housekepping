/*
 * @Author: liuyr 
 * @Date: 2019-09-11 15:41:20 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 16:51:38
 */
import React, { Component } from 'react'
import config from '@/utils/config';
import { Upload, Button, Icon, Form, Input, notification } from 'antd';

class CustomerForm extends Component {
  render() {
    const t = this;
    const props = {
      name: 'file',
      // 提交给后台的地址
      action: config.uploadFileURL,
      onChange(info) {
        if (info.file.status === 'done') {
          // 设置photo的值
          t.props.form.setFieldsValue({
            photo: info.file.response.data.id
          });
          // 提示用户上传完毕
          notification['success']({
            message: '顾客头像上传成功',
            description: '',
            duration: config.duration
          });
        } else if (info.file.status === 'error') {
          console.log('上传失败');
        }
      },
    };
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const { getFieldDecorator } = this.props.form;
    // 设置id属性
    getFieldDecorator('id');
    return (
      <Form {...formItemLayout}>
        <Form.Item label="姓名">
          {getFieldDecorator('realname', {
            rules: [
              {
                required: true,
                message: '请输入姓名!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label="手机">
          {getFieldDecorator('telephone', {
            rules: [
              {
                required: true,
                message: '请输入手机号!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="头像">
          {getFieldDecorator('photo', {
            rules: [
              {
                required: true,
                message: '请选择头像!',
              },
            ],
          })(<Input readOnly />)}
        </Form.Item>
        <Form.Item label="上传头像">
          <Upload {...props} showUploadList={false}>
            <Button>
              <Icon type="upload" />上传顾客头像
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    )
  }
}
/**
 * 接受父组件的数据设置表单数据
 * @param {Object} props 父组件给的数据
 * @returns  {Object} obj 表单内设置的数据
 * @memberof CustomerForm
 */
const mapPropsToFields = (props) => {
  // props.customer 是父组件传过来的设置表单数据的对象
  let { customer } = props;
  /* let o = {
    realname: 'zhangsan',
    password: 12,
    telephone: 123,
    photo: '213',
  } */
  // 遍历对象
  let obj = {};
  for (let key in customer) {
    // key是对象内部的属性
    // obj[key]给要返回的对象添加属性
    // customer[key]是获取customer中属性的值
    // 将customer的属性和值，设置到obj的属性和值上。值要经过处理之后再放
    obj[key] = Form.createFormField({
      value: customer[key]
    });
  }
  // console.log(obj);
  return obj;
  /* return {
    username: Form.createFormField({
      ...props.username,
      value: props.username.value,
    }), 
  };*/
}

export default Form.create({
  name: 'customerForm',
  mapPropsToFields
})(CustomerForm);