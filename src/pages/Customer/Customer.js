/*
 * @Author: liuyr 
 * @Date: 2019-09-11 15:17:02 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 11:16:06
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva';
import styles from './Customer.less';
import { Button, Table, Modal, message, Popover, Input } from 'antd';
import config from '@/utils/config';
import CustomerForm from './CustomerForm'
const { confirm } = Modal;
const { Search } = Input;
@connect(state => state.customer)
class Customer extends PureComponent {
  state = {
    // 批量删除的数组
    ids: [],
    // 模态框的标题
    modalTitle: '新增顾客信息',
    // 模态框的显示与隐藏
    visible: false,
    // 表单内设置的数据
    customer: {}
  }
  // 组件渲染完毕后执行的钩子函数
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: "customer/getCustomerDataA"
    });
  }
  /**
   * 单个删除顾客信息
   * @param {number} id   要删除的id
   * @returns void
   * @memberof Customer
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
          type: 'customer/deleteCustomerByIdA',
          payload: { id }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * 批量删除顾客信息
   * @returns void
   * @memberof Customer
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
            type: 'customer/batchDeleteCustomerA',
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
   * 添加顾客信息
   * @returns void
   * @memberof Customer
   */
  toAdd = () => {
    // 修改模态框的标题，显示模态框。清空表单数据
    this.setState({
      modalTitle: '添加顾客信息',
      visible: true,
      customer: {}
    });
  }
  /**
  * 修改顾客信息
  * @param {Object} record 修改的顾客对象
  * @returns void
  * @memberof Customer
  */
  toUpdate = (record) => {
    // 修改模态框的标题，显示模态框。填充表单数据
    this.setState({
      modalTitle: '修改顾客信息',
      visible: true,
      customer: record
    });
  }
  /**
  * 模态框的点击确定
  * @param {Object} e 事件对象
  * @returns void
  * @memberof Customer
  */
  handleOk = (e) => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('表单的数据是：', values);
        // 分发异步action进行保存
        this.props.dispatch({
          type: 'customer/saveOrUpdateCustomerA',
          payload: values
        });
        this.handleCancel();
      }
    });
  }
  /**
  * 模态框的点击取消
  * @returns void
  * @memberof Customer
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
  * @memberof Customer
  */
  formRef = (form) => {
    this.form = form;
  }
  /**
   * 跳转到顾客详情页
   * @param {Object} record  顾客对象
   * @returns void
   * @memberof Customer
   */
  toDetails = (record) => {
    // 跳转路由
    this.props.history.push({
      pathname: '/customerDetails',
      // 给详情页带的参数
      state: {
        record
      }
    });
  }
  /**
   * 光标悬停显示大图
   * @param {String} text 图片文件id
   * @return ReactDOM
   * @memberof Customer
   */
  popOverContent = (text) => {
    return (
      <div>
        <img src={config.fileBaseURL + text} style={{ width: 200, height: 200 }} alt="" />
      </div>
    )
  }
  /**
   * 模糊查询
   * @param {String} value Input框的值
   * @memberof Customer
   */
  toSearch = (value) => {
    // 模糊查询
    this.props.dispatch({
      type: 'customer/queryCustomerA',
      payload: { realname: value }
    });
  }
  /**
   * 渲染
   * @returns void
   * @memberof Customer
   */
  render() {
    const { modalTitle, visible, customer } = this.state;
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
      title: '姓名',
      dataIndex: 'realname',
      align: 'center'
    }, {
      title: '电话',
      dataIndex: 'telephone',
      align: 'center',
    }, {
      title: '密码',
      dataIndex: 'password',
      align: 'center',
    }, {
      title: '头像',
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
            <Button type="link" onClick={this.toDetails.bind(this, record)}>查看详情</Button>
          </div>
        );
      }
    }];
    return (
      <div className={styles.customer}>
        <div>
          <Button type="primary" onClick={this.toAdd} className={styles.marginRight}>添加</Button>
          <Button type="danger" onClick={this.toBatchDelete}>批量删除</Button>
          <Search placeholder="姓名" onSearch={this.toSearch} enterButton className={styles.searchInput} />
        </div>
        <div className={styles.tableDiv}>
          <Table
            bordered
            size="small"
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.customerData} />
        </div>
        {/* 模态框 */}
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 表单组件 */}
          <CustomerForm
            customer={customer}
            ref={this.formRef}
          ></CustomerForm>
        </Modal>
      </div>
    )
  }
}
export default Customer;





