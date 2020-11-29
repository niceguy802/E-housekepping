/*
 * @Author: liuyr 
 * @Date: 2019-09-13 08:54:58 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-13 09:02:43
 */
import React, { Component } from 'react'
import config from '@/utils/config';
import { Upload, Button, Icon, Form, Input, Select, notification } from 'antd';

import { connect } from 'dva';
const { Option } = Select;
// 引入仓库
@connect(state => state.waiter)
class OrderForm extends Component {
  /**
   * 渲染组件
   * @returns void
   * @memberof OrderForm
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
    // 添加id属性
    getFieldDecorator('id');
    return (
      <Form {...formItemLayout}>
        <Form.Item label="服务员">
          {getFieldDecorator('waiterId', {
            rules: [
              {
                required: true,
                message: '请选择服务员!',
              },
            ],
          })(<Select>
            {
              this.props.waiterData.map((item, index) => {
                return <Option value={item.id} key={index}>{item.realname}</Option>
              })
            }
          </Select>)}
        </Form.Item>
      </Form>
    )
  }
}
/**
 * 接受父组件的数据设置表单数据
 * @param {Object} props 父组件给的数据的容器
 * @returns {Object} obj 表单对象，里面的属性值是表单控件的值
 * @memberof OrderForm
 */
const mapPropsToFields = (props) => {
  let { order } = props;
  let obj = {};
  for (let key in order) {
    obj[key] = Form.createFormField({
      value: order[key]
    });
  }
  return obj;
}
export default Form.create({
  name: 'orderForm',
  mapPropsToFields
})(OrderForm);

