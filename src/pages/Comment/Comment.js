/*
 * @Author: liuyr 
 * @Date: 2019-09-14 09:01:42 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 10:49:42
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva';
import styles from './Comment.less';
import { Button, Table, Modal, Select } from 'antd';
import config from '@/utils/config';
import CommentForm from './CommentForm'
const { Option } = Select;
const { confirm } = Modal;
@connect(state => state.comment)
class Comment extends PureComponent {
  state = {
    // 批量删除的数组
    ids: [],
    // 模态框的标题
    modalTitle: '新增评论信息',
    // 模态框的显示与隐藏
    visible: false,
    // 表单内设置的数据
    comment: {}
  }
  // 组件渲染完毕后执行的钩子函数
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: "comment/getcOrderDataA"
    });
  }
  /**
   * 单个删除评论信息
   * @param {number} id   要删除的id
   * @returns void
   * @memberof Comment
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
          type: 'comment/deleteCommentByIdA',
          payload: {
            deleteIdObj: { id },
            orderIdObj: { order_id: t.props.orderId }
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * 添加评论信息
   * @returns void
   * @memberof Comment
   */
  toAdd = () => {
    // 修改模态框的标题，显示模态框。清空表单数据
    this.setState({
      modalTitle: '添加评论信息',
      visible: true,
      comment: {
        orderId: this.props.orderId
      }
    });
  }
  /**
  * 模态框的点击确定
  * @param {Object} e 事件对象
  * @returns void
  * @memberof Comment
  */
  handleOk = (e) => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('表单的数据是：', values);
        // 评价的时间
        values.commentTime = config.getNowTime();
        // 分发异步action进行保存
        this.props.dispatch({
          type: 'comment/saveCommentA',
          payload: {
            insertObj: values,
            orderIdObj: { order_id: values.orderId }
          }
        });
        this.handleCancel();
      }
    });
  }
  /**
  * 模态框的点击取消
  * @returns void
  * @memberof Comment
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
  * @memberof Comment
  */
  formRef = (form) => {
    this.form = form;
  }
  /**
   * selectChange
   * @param {Number} 订单的id值
   * @returns void
   * @memberof Comment
   */
  selectChange = (value) => {
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
   * 渲染
   * @returns void
   * @memberof Comment
   */
  render() {
    const { modalTitle, visible, comment } = this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      align: 'center'
    }, {
      title: '评论时间',
      dataIndex: 'commentTime',
      align: 'center',
      render: (text) => {
        return (<div>{config.parseTime(text)}</div>)
      }
    }, {
      title: '评论内容',
      dataIndex: 'content',
      align: 'center',
    }, {
      title: '订单ID',
      dataIndex: 'orderId',
      align: 'center',
    }, {
      title: '操作',
      dataIndex: '',
      align: 'center',
      render: (text, record) => {
        return (
          <div>
            <Button
              type="link"
              onClick={this.toDelete.bind(this, record.id)}
            >删除</Button>
          </div>
        );
      }
    }];
    return (
      <div className={styles.comment}>
        <div>
          <Button type="primary" onClick={this.toAdd}>添加</Button>
          <Select allowClear onChange={this.selectChange} style={{ width: 150 }} value={this.props.orderId}>
            {
              this.props.cOrderData.map((item, index) => {
                return <Option value={item.id} key={index}>{item.id}</Option>
              })
            }
          </Select>
        </div>
        <div className={styles.tableDiv}>
          <Table
            bordered
            size="small"
            rowKey="id"
            columns={columns}
            dataSource={this.props.commentData} />
        </div>
        {/* 模态框 */}
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 表单组件 */}
          <CommentForm
            comment={comment}
            ref={this.formRef}
          ></CommentForm>
        </Modal>
      </div>
    )
  }
}
export default Comment;





