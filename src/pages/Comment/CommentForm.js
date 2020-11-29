/*
 * @Author: liuyr 
 * @Date: 2019-09-14 08:52:06 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 10:07:46
 */
import React, { Component } from 'react'
import config from '@/utils/config';
import { Upload, Button, Icon, Form, Input, Select, notification } from 'antd';
import { connect } from 'dva';
const { Option } = Select;
const { TextArea } = Input;
// 引入仓库
// @connect(state => state.category)
@connect(state => state.comment)
class CommentForm extends Component {
  /**
   * selectChange
   * @param {Number} 订单的id值
   * @returns void
   * @memberof Comment
   */
  selectChange = (value) => {
    // 设置表单控件的orderId的值
    this.props.form.setFieldsValue({
      orderId: value
    });
    // 设置仓库中的orderId
    this.props.dispatch({
      type: "comment/changeOrderId",
      payload: value
    });
    // 通过订单ID获取评价数据
    this.props.dispatch({
      type: "comment/getCommentDataA",
      payload: { order_id: value }
    });
  }
  /**
   * 渲染组件
   * @returns void
   * @memberof CommentForm
   */
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
            message: '产品图片上传成功',
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
    // 添加id属性
    getFieldDecorator('id');
    // 添加photo属性
    getFieldDecorator('photo');
    return (
      <Form {...formItemLayout}>
        <Form.Item label="订单ID">
          {getFieldDecorator('orderId', {
            rules: [
              {
                required: true,
                message: '请选择订单ID!',
              },
            ],
          })(<Select>
            {
              this.props.cOrderData.map((item, index) => {
                return <Option value={item.id} key={index}>{item.id}</Option>
              })
            }
          </Select>)}
        </Form.Item>
        <Form.Item label="评价内容">
          {getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: '请输入评价内容!',
              },
            ],
          })(<TextArea rows={4} />)}
        </Form.Item>
      </Form>
    )
  }
}
/**
 * 接受父组件的数据设置表单数据
 * @param {Object} props 父组件给的数据的容器
 * @returns {Object} obj 表单对象，里面的属性值是表单控件的值
 * @memberof CommentForm
 */
const mapPropsToFields = (props) => {
  let { comment } = props;
  let obj = {};
  for (let key in comment) {
    obj[key] = Form.createFormField({
      value: comment[key]
    });
  }
  return obj;
}
export default Form.create({
  name: 'commentForm',
  mapPropsToFields
})(CommentForm);









