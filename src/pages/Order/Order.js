/*
 * @Author: liuyr 
 * @Date: 2019-09-13 09:11:34 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-13 09:48:13
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva';
import styles from './Order.less';
import { Button, Table, Modal, message } from 'antd';
import config from '@/utils/config';
import OrderForm from './OrderForm'
const { confirm } = Modal;
@connect(state => state.order)
class Order extends PureComponent {
  state = {
    // 批量删除的数组
    ids: [],
    // 模态框的标题
    modalTitle: '新增订单信息',
    // 模态框的显示与隐藏
    visible: false,
    // 表单内设置的数据
    order: {}
  }
  // 组件渲染完毕后执行的钩子函数
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: "order/getOrderDataA"
    });
    // 获取服务员的数据
    this.props.dispatch({
      type: "waiter/getWaiterDataA"
    });
  }
  /**
   * 单个删除订单信息
   * @param {number} id   要删除的id
   * @returns void
   * @memberof Order
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
          type: 'order/deleteOrderByIdA',
          payload: { id }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * 批量删除订单信息
   * @returns void
   * @memberof Order
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
            type: 'order/batchDeleteOrderA',
            payload: { ids: ids.join(',') }
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
   * 添加订单信息
   * @returns void
   * @memberof Order
   */
  toAdd = () => {
    // 修改模态框的标题，显示模态框。清空表单数据
    /* this.setState({
      modalTitle: '添加订单信息',
      visible: true,
      order: {}
    }); */
    let obj = {
      customerId: 7,
      addressId: 2,
      orderLines: [{
        productId: 89,
        number: 10,
      }, {
        productId: 363,
        number: 10,
      }, {
        productId: 366,
        number: 10,
      }]
    }
    // 分发异步action进行保存
    this.props.dispatch({
      type: 'order/saveOrderA',
      payload: obj
    });
  }
  /**
  * 修改订单信息
  * @param {Object} record 修改的订单对象
  * @returns void
  * @memberof Order
  */
  toUpdate = (record) => {
    // 修改模态框的标题，显示模态框。填充表单数据
    this.setState({
      modalTitle: '修改订单信息',
      visible: true,
      order: record
    });
  }
  /**
  * 模态框的点击确定
  * @param {Object} e 事件对象
  * @returns void
  * @memberof Order
  */
  handleOk = (e) => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 分发异步action进行保存
        this.props.dispatch({
          type: 'order/updateOrderA',
          payload: values
        });
        this.handleCancel();
      }
    });
  }
  /**
  * 模态框的点击取消
  * @returns void
  * @memberof Order
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
  * @memberof Order
  */
  formRef = (form) => {
    this.form = form;
  }
  /**
   * 跳转到订单详情页
   * @param {Object} record  订单对象
   * @returns void
   * @memberof Order
   */
  toDetails = (record) => {
    // 跳转路由
    this.props.history.push({
      pathname: '/OrderDetails',
      // 给详情页带的参数
      state: {
        record
      }
    });
  }
  /**
   * 渲染
   * @returns void
   * @memberof Order
   */
  render() {
    const { modalTitle, visible, order } = this.state;
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
      title: '编号',
      dataIndex: 'id',
      align: 'center'
    }, {
      title: '下单时间',
      dataIndex: 'orderTime',
      align: 'center',
      render: (text) => {
        return (<div>{config.parseTime(text)}</div>)
      }
    }, {
      title: '顾客ID',
      dataIndex: 'customerId',
      align: 'center',
    }, {
      title: '地址ID',
      dataIndex: 'addressId',
      align: 'center',
    }, {
      title: '服务员ID',
      dataIndex: 'waiterId',
      align: 'center',
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
          </div>
        );
      }
    }];
    return (
      <div className={styles.order}>
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
            dataSource={this.props.orderData} />
        </div>
        {/* 模态框 */}
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 表单组件 */}
          <OrderForm
            order={order}
            ref={this.formRef}
          ></OrderForm>
        </Modal>
      </div>
    )
  }
}
export default Order;

