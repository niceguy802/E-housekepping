/*
 * @Author: liuyr 
 * @Date: 2019-09-11 15:41:16 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-11 18:57:27
 */
import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
import config from '@/utils/config';
import { connect } from 'dva';
const { Option } = Select;
@connect(state => state.category)
class CategoryForm extends Component {
  /**
   * 组件渲染
   * @returns  void
   * @memberof CategoryForm
   */
  render() {
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
        <Form.Item label="名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入名称!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="数量">
          {getFieldDecorator('num', {
            rules: [
              {
                required: true,
                message: '请输入数量!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="父类型">
          {getFieldDecorator('parentId', {
            rules: [
              {
                required: true,
                message: '请选择父类型!',
              },
            ],
          })(
            <Select>
              <Option value="">请选择</Option>
              {
                this.props.categoryData.map((item, index) => {
                  return (
                    <Option
                      value={item.id}
                      key={index}>
                      {item.name}
                    </Option>
                  );
                })
              }
            </Select>
          )}
        </Form.Item>
      </Form>
    )
  }
}
/**
 * 接受父组件的数据设置表单数据
 * @param {Object} props 父组件给的数据
 * @returns  {Object} obj 表单内设置的数据
 * @memberof CategoryForm
 */
const mapPropsToFields = (props) => {
  // props.category 是父组件传过来的设置表单数据的对象
  let { category } = props;
  /* let o = {
    realname: 'zhangsan',
    password: 12,
    telephone: 123,
    photo: '213',
  } */
  // 遍历对象
  let obj = {};
  for (let key in category) {
    // key是对象内部的属性
    // obj[key]给要返回的对象添加属性
    // category[key]是获取category中属性的值
    // 将category的属性和值，设置到obj的属性和值上。值要经过处理之后再放
    obj[key] = Form.createFormField({
      value: category[key]
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
  name: 'categoryForm',
  mapPropsToFields
})(CategoryForm);