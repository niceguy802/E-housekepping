import React, { Component } from 'react'
import styles from './CustomerDetails.less'
import { Tabs, Card, Table } from 'antd'
import config from '@/utils/config';
import { connect } from 'dva';
const { TabPane } = Tabs;
const { Meta } = Card;
@connect(state => {
  const { address, order } = state;
  return {
    address,
    order,
  }
})
export default class CustomerDetails extends Component {
  state = {
    // 当前顾客对象
    customer: {}
  }
  componentDidMount() {
    // 接受路由跳转的参数
    // console.log(this.props.location.state.record);
    // 设置当前的顾客对象
    this.setState({
      customer: this.props.location.state.record
    })
  }
  /**
   * Tab页跳转
   * @param {String} key 是每个选项卡的key
   * @memberof CustomerDetails
   */
  tabChange = (key) => {
    if (key === 'info') {
      return;
    }
    let type = (key === 'address') ? 'address/getAddressBycIdDataA' : 'order/getOrderBycIdDataA';
    // 发送请求获取当前顾客的地址或者订单信息
    this.props.dispatch({
      type,
      payload: {
        customerId: this.state.customer.id
      }
    })
  }
  render() {
    const { customer } = this.state;
    // 地址的列定义
    const addressColumns = [{
      title: '省份',
      dataIndex: 'province',
      align: 'center'
    }, {
      title: '城市',
      dataIndex: 'city',
      align: 'center'
    }, {
      title: '区县',
      dataIndex: 'area',
      align: 'center'
    }, {
      title: '详细地址',
      dataIndex: 'address',
      align: 'center'
    }];
    // 订单的列定义
    const orderColumns = [{
      title: '编号',
      dataIndex: 'id',
      align: 'center'
    }, {
      title: '下单时间',
      dataIndex: 'orderTime',
      align: 'center',
      render: (text) => {
        return (
          <div>
            {config.parseTime(text)}
          </div>
        )
      }
    }, {
      title: '服务员',
      dataIndex: 'waiter.realname',
      align: 'center'
    }, {
      title: '地址',
      dataIndex: 'address',
      align: 'center',
      render: (text) => {
        return (
          <div>{text.province + ' ' + text.city + ' ' + text.area}</div>
        )
      }
    }, {
      title: '总计',
      dataIndex: 'total',
      align: 'center'
    }];
    return (
      <div className={styles.customerDetails}>
        <Tabs defaultActiveKey="info" onChange={this.tabChange}>
          <TabPane tab="个人信息" key="info">
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={config.fileBaseURL + customer.photo} />}
            >
              <Meta title={customer.realname} description={customer.telephone} />
            </Card>
          </TabPane>
          <TabPane tab="地址信息" key="address">
            <Table
              bordered
              size="small"
              rowKey="id"
              columns={addressColumns}
              dataSource={this.props.address.addressBycIdData} />
          </TabPane>
          <TabPane tab="订单信息" key="order">
            <Table
              bordered
              size="small"
              rowKey="id"
              columns={orderColumns}
              dataSource={this.props.order.orderBycIdData} />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
