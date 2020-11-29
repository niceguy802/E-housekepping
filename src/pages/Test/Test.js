/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:56:51 
 * @Last Modified by:   liuyr 
 * @Last Modified time: 2019-09-12 09:56:51 
 */
import React, { PureComponent } from 'react';
import { Button, Table, Modal, message } from 'antd';
import styles from './Test.less';
import { connect } from 'dva';
const { confirm } = Modal;
//()=>{}  state=>state
// 参照mapStateToProps进行理解，返回的是大仓库中的test小仓库中的state对应的初始化的数据
@connect(state => state.test)

class Test extends PureComponent {
  state = {
    // 要进行批量删除的id
    ids: [],
    // 模态框的显示与隐藏
    visible: false,
    // 模态框的标题
    modalTitle: '新增',
  }
  componentDidMount() {
    // 发送异步action
    // console.log(this.props.dispatch);
    this.props.dispatch({
      type: 'test/getData',
      payload: ''
    });
  }
  // 批量删除
  tobatchDelete = () => {
    if (this.state.ids.length > 0) {
      confirm({
        title: '是否确认删除?',
        content: '',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          //发送异步action  携带的数据是{ids:this.state.ids}
          console.log('OK');
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    } else {
      message.warning('请选择要删除的数据！');
    }
  }
  // 点击了确认按钮
  handleOk = () => {
    // 获取表单数据发送异步action,保存，关闭模态框
    this.handleCancel();
  }
  // 点击了取消按钮，关闭模态框
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  // 新增
  toAdd = (type) => {
    this.setState({
      visible: true,
      modalTitle: type
    })
  }
  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'realname',
      },
      {
        title: '电话',
        dataIndex: 'telephone',
      },
      {
        title: '密码',
        dataIndex: 'password',
      },
      {
        title: '操作',
        dataIndex: '',
        render: (text, record) => {
          return (
            <div>
              <Button type="dashed" onClick={this.toAdd.bind(this, '修改')}>修改</Button>
              <Button type="link">删除</Button>
            </div>
          );
        }
      },
    ];
    const t = this;
    const rowSelection = {
      onChange: (selectedRowKeys) => {
        t.setState({
          ids: selectedRowKeys
        });
      }
    };
    const { visible, modalTitle } = this.state;
    return (
      <div className={styles.Test}>
        {/* {JSON.stringify(this.props.data)} */}
        <Button type="primary" style={{ marginRight: 10 }} onClick={this.toAdd.bind(this, '新增')}>新增</Button>
        <Button type="danger" onClick={this.tobatchDelete}>批量删除</Button>
        {/* 表格 */}
        <Table rowKey="id" className={styles.Table} rowSelection={rowSelection} columns={columns} dataSource={this.props.data} />
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}
export default Test;