/*
 * @Author: liuyr 
 * @Date: 2019-09-14 08:23:05 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 10:49:25
 */
//评论信息管理的小仓库 comment
import { getCommentDataS, deleteCommentByIdS, saveCommentS } from '@/services/comment'
import { getOrderDataS } from '@/services/order'
import config from '@/utils/config'
import { notification } from 'antd';

export default {
  // 命名空间
  namespace: 'comment',
  // 小仓库中的数据
  state: {
    // 通过订单ID查找的所有评论数据
    commentData: [],
    // 所有的订单数据,查找所有订单数据的时候设置
    cOrderData: [],
    //select 双向数据绑定的数据，查找所有订单数据的时候，获取到第一个订单的id，然后设置。显示在下拉列表的值上。下拉列表更改的时候，改变这个值。
    orderId: ''
  },
  // 异步action
  effects: {
    /**
     * 通过订单ID获取评论信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *getCommentDataA(_, { call, put }) {
      const res = yield call(getCommentDataS, _.payload);
      yield put({
        type: "changeCommentData",
        payload: res.data
      })
    },
    /**
     * 查找所有的订单数据，查找完了之后处理
     * @param {*} _
     * @param {*} { call, put }
     */
    *getcOrderDataA(_, { call, put }) {
      const res = yield call(getOrderDataS);
      // 通过第一个订单的ID查找评论数据
      if (res.data[0]) {
        yield put({
          type: "getCommentDataA",
          payload: { order_id: res.data[0].id }
        })
        // 设置state中当前用户选中的订单ID
        yield put({
          type: "changeOrderId",
          payload: res.data[0].id
        })
      }
      // 设置state中订单的数据
      yield put({
        type: "changecOrderData",
        payload: res.data
      })
    },
    /**
     * 通过id删除评论
     * @param {*} _
     * @param {*} { call, put }
     */
    *deleteCommentByIdA(_, { call, put }) {
      const res = yield call(deleteCommentByIdS, _.payload.deleteIdObj);
      if (res.status === 200) {
        notification['success']({
          message: '删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCommentDataA",
          payload: _.payload.orderIdObj
        })
      } else {
        notification['error']({
          message: '删除失败',
          description: '',
          duration: config.duration
        });
      }
    },
    /**
     * 保存评论信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *saveCommentA(_, { call, put }) {
      const res = yield call(saveCommentS, _.payload.insertObj);
      if (res.status === 200) {
        notification['success']({
          message: '保存成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCommentDataA",
          payload: _.payload.orderIdObj
        })
        yield put({
          type: "changeOrderId",
          payload: _.payload.orderIdObj.order_id
        })
      } else {
        notification['error']({
          message: '保存失败',
          description: '',
          duration: config.duration
        });
      }
    },
  },
  // 同步action
  reducers: {
    /**
     * 更改state中的commentData
     * @param {*} state
     * @param {*} action
     * @returns  Object  新的state
     */
    changeCommentData(state, action) {
      return {
        ...state,
        commentData: action.payload
      }
    },
    /**
     * 设置state中的订单数据 cOrderData
     * @param {*} state
     * @param {*} action
     * @returns Object  新的state
     */
    changecOrderData(state, action) {
      return {
        ...state,
        cOrderData: action.payload
      }
    },
    /**
     * 设置state中的订单ID， orderId
     *
     * @param {*} state
     * @param {*} action
     * @returns Object  新的state
     */
    changeOrderId(state, action) {
      return {
        ...state,
        orderId: action.payload
      }
    },
  }
}




