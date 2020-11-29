/*
 * @Author: liuyr 
 * @Date: 2019-09-11 15:16:42 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 11:18:01
 */
import React, { PureComponent } from 'react'
import { connect } from 'dva';
import styles from './Category.less';
import { Button, Table, Modal, message } from 'antd';
import config from '@/utils/config';
import CategoryForm from './CategoryForm'

const { confirm } = Modal;
@connect(state => state.category)
class Category extends PureComponent {
  state = {
    // 批量删除的数组
    ids: [],
    // 模态框的标题
    modalTitle: '添加分类信息',
    // 模态框的显示与隐藏
    visible: false,
    // 表单内设置的数据
    category: {}
  }
  /**
   * 组件渲染完毕调用的钩子函数
   * @memberof Category
   */
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: "category/getCategoryDataA"
    });
  }
  /**
   * 单个删除类型
   * @param {number} id 单个删除的id
   * @returns void
   * @memberof Category
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
          type: 'category/deleteCategoryByIdA',
          payload: { id }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  /**
   * 批量删除类型
   * @returns void
   * @memberof Category
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
            type: 'category/batchDeleteCategoryA',
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
   * 添加类型
   * @returns void
   * @memberof Category
   */
  toAdd = () => {
    // 修改模态框的标题，显示模态框。清空表单数据
    this.setState({
      modalTitle: '添加分类信息',
      visible: true,
      category: {}
    });
  }
  /**
   * 修改类型
   * @param {Object} record 修改的顾客对象
   * @returns void
   * @memberof Category
   */
  toUpdate = (record) => {
    // 修改模态框的标题，显示模态框。填充表单数据
    this.setState({
      modalTitle: '修改分类信息',
      visible: true,
      category: record
    });
  }
  /**
   * 模态框的点击确定
   * @param {Object} e 事件对象
   * @returns void
   * @memberof Category
   */
  handleOk = (e) => {
    e.preventDefault();
    this.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('表单的数据是：', values);
        // 分发异步action进行保存
        if (this.state.modalTitle === '添加分类信息') {
          this.props.dispatch({
            type: 'category/saveCategoryA',
            payload: values
          });
        } else {
          this.props.dispatch({
            type: 'category/updateCategoryA',
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
   * @memberof Category
   */
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  /**
   * 将表单暴露，只有表单暴露了，才能在当前父组件中进行提交
   * @param {Object} form 表单对象 
   * @returns void
   * @memberof Category
   */
  formRef = (form) => {
    this.form = form;
  }
  /**
   * 渲染组件
   * @param {Object} form 表单对象
   * @returns void
   * @memberof Category
   */
  render() {
    const { modalTitle, visible, category } = this.state;
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
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    }, {
      title: '数量',
      dataIndex: 'num',
      align: 'center',
    }, {
      title: '父类型ID',
      dataIndex: 'parentId',
      align: 'center',
    }, {
      title: '操作',
      dataIndex: '',
      align: 'center',
      width: 180,
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
      <div className={styles.category}>
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
            dataSource={this.props.categoryData} />
        </div>
        {/* 模态框 */}
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {/* 表单组件 */}
          <CategoryForm
            category={category}
            ref={this.formRef}
          ></CategoryForm>
        </Modal>
      </div>
    )
  }
}
export default Category;





