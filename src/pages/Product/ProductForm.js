/*
 * @Author: liuyr 
 * @Date: 2019-09-12 08:32:19 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 16:50:54
 */
import React, { Component } from 'react'
import config from '@/utils/config';
import { Upload, Button, Icon, Form, Input, Select, notification } from 'antd';

import { connect } from 'dva';
const { Option } = Select;
// 引入仓库
// @connect(state => state.category)
@connect(state => {
  return {
    // test: 'hello',
    // state.product是product的state对象  
    /* {
      productData: []
    } */
    product: state.product,
    /*   {
      categoryData: []
    } */
    category: state.category
  }

})
class ProductForm extends Component {
  /**
   * 渲染组件
   * @returns void
   * @memberof ProductForm
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
        <Form.Item label="产品名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请输入产品名称!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="产品描述">
          {getFieldDecorator('description', {
            rules: [
              {
                required: true,
                message: '请输入产品描述!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="产品价格">
          {getFieldDecorator('price', {
            rules: [
              {
                required: true,
                message: '请输入产品价格!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="所属分类">
          {getFieldDecorator('categoryId', {
            rules: [
              {
                required: true,
                message: '请选择所属分类!',
              },
            ],
          })(<Select>
            {
              this.props.category.categoryData.map((item, index) => {
                return <Option value={item.id} key={index}>{item.name}</Option>
              })
            }
          </Select>)}
        </Form.Item>
        <Form.Item label="上传照片">
          <Upload {...props} showUploadList={false}>
            <Button>
              <Icon type="upload" />上传产品照片
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    )
  }
}
/**
 * 接受父组件的数据设置表单数据
 * @param {Object} props 父组件给的数据的容器
 * @returns {Object} obj 表单对象，里面的属性值是表单控件的值
 * @memberof ProductForm
 */
const mapPropsToFields = (props) => {
  let { product } = props;
  let obj = {};
  for (let key in product) {
    obj[key] = Form.createFormField({
      value: product[key]
    });
  }
  return obj;
}
export default Form.create({
  name: 'productForm',
  mapPropsToFields
})(ProductForm);









