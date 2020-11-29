/*
 * @Author: liuyr 
 * @Date: 2019-09-11 15:17:02 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 19:24:36
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva';
import styles from './Product.less';
import { Button, Table, Modal, message, Popover } from 'antd';
import config from '@/utils/config';
import ProductForm from './ProductForm'
const { confirm } = Modal;
@connect(state => state.product)
class Product extends PureComponent {
  state = {
    // 批量删除的数组
    ids: [],
    // 模态框的标题
    modalTitle: '添加产品信息',
    // 模态框的显示与隐藏
    visible: false,
    // 表单内设置的数据
    product: {}
  }
  // 组件渲染完毕后执行的钩子函数
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: "product/getProductDataA"
    });
    // 获取category的数据
    this.props.dispatch({
      type: "category/getCategoryDataA"
    });
  }
  /**
   * 单个删除产品信息
   * @param {number} id   要删除的id
   * @returns void
   * @memberof Product
   */
  toDelete = (id) => {
    // id就是要删除的对象的id
    // 分发异步action进行删除
    const t = this;
    confirm({
      title: '是否确定删除?',
      content: '',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        t.props.dispatch({
          type: 'product/deleteProductByIdA',
          payload: { id }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * 批量删除产品信息
   * @returns void
   * @memberof Product
   */
  toBatchDelete = () => {
    const { ids } = this.state;
    if (ids.length > 0) {
      // 询问是否删除，是，发送异步action
      const t = this;
      confirm({
        title: '是否确定批量删除?',
        content: '',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          t.props.dispatch({
            type: 'product/batchDeleteProductA',
            payload: { idList: ids.join(',') }
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      // 提示用户选择
      message.warning('请选择要删除的数据！');
    }
  }
  /**
   * 添加产品信息
   * @returns void
   * @memberof Product
   */
  toAdd = () => {
    // 修改模态框的标题，显示模态框。清空表单数据
    this.setState({
      modalTitle: '添加产品信息',
      visible: true,
      product: {}
    });
  }
  /**
  * 修改产品信息
  * @param {Object} record 修改的产品对象
  * @returns void
  * @memberof Product
  */
  toUpdate = (record) => {
    // 修改模态框的标题，显示模态框。填充表单数据
    this.setState({
      modalTitle: '修改产品信息',
      visible: true,
      product: record
    });
  }
  /**
  * 模态框的点击确定
  * @param {Object} e 事件对象
  * @returns void
  * @memberof Product
  */
  handleOk = (e) => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('表单的数据是：', values);
        // 分发异步action进行保存
        if (this.state.modalTitle === '添加产品信息') {
          this.props.dispatch({
            type: 'product/saveProductA',
            payload: values
          });
        } else {
          this.props.dispatch({
            type: 'product/updateProductA',
            payload: values
          });
        }
        this.handleCancel();
      }
    });
  }
  /**
  * 模态框的点击取消
  * @returns void
  * @memberof Product
  */
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  /**
  * 暴露表单对象给当前组件
  * @param {Object} form 表单对象
  * @returns void
  * @memberof Product
  */
  formRef = (form) => {
    this.form = form;
  }
  /**
   * 光标悬停显示大图
   * @param {String} text 图片文件id
   * @return ReactDOM
   * @memberof Product
   */
  popOverContent = (text) => {
    return (
      <div>
        <img src={config.fileBaseURL + text} style={{ width: 200, height: 200 }} alt="" />
      </div>
    )
  }
  /**
   * 渲染
   * @returns void
   * @memberof Product
   */
  render() {
    const { modalTitle, visible, product } = this.state;
    const t = this;
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        // selectedRowKeys是一个数组，是用户在表格中选中的复选框那一行的id值
        // console.log(selectedRowKeys);
        t.setState({
          ids: selectedRowKeys
        })
      }
    };
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      align: 'center'
    }, {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
    }, {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
    }, {
      title: '所属分类',
      dataIndex: 'categoryId',
      align: 'center',
    }, {
      title: '照片',
      dataIndex: 'photo',
      align: 'center',
      //表格自定义列显示
      render: (text) => {
        return (
          <Popover placement="right" content={this.popOverContent.bind(this, text)()} trigger="hover">
            <img src={config.fileBaseURL + text} style={{ width: 40, height: 40 }} alt="" />
          </Popover>
        );
      }
    }, {
      title: '操作',
      dataIndex: '',
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            <Button type="dashed" onClick={this.toUpdate.bind(this, record)}>修改</Button>
            <Button
              type="link"
              onClick={this.toDelete.bind(this, record.id)}
            >删除</Button>
            <Button type="link">查看详情</Button>
          </div>
        );
      }
    }];
    return (
      <div className={styles.product}>
        <div>
          <Button type="primary" onClick={this.toAdd}>添加</Button>
          <Button type="danger" onClick={this.toBatchDelete}>批量删除</Button>
          <Button>导出</Button>
        </div>
        <div className={styles.tableDiv}>
          <Table
            bordered
            size="small"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.productData} />
        </div>
        {/* 模态框 */}
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 表单组件 */}
          <ProductForm
            product={product}
            ref={this.formRef}
          ></ProductForm>
        </Modal>
      </div>
    )
  }
}
export default Product;


