/*
 * @Author: liuyr 
 * @Date: 2019-09-12 15:19:11 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-13 09:14:39
 */
//订单信息管理的小仓库 order
import { getOrderByCustomerIdS, getOrderDataS, deleteOrderByIdS, batchDeleteOrderS, saveOrderS, updateOrderS } from '@/services/order'
import { notification } from 'antd';
import config from '@/utils/config';
export default {
  // 命名空间
  namespace: 'order',
  // 小仓库中的数据
  state: {
    // 通过顾客id查找的地址信息
    orderBycIdData: [],
    orderData: [],
  },
  // 异步action
  effects: {
    /**
     * 通过顾客ID获取订单信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *getOrderBycIdDataA(_, { call, put }) {
      const res = yield call(getOrderByCustomerIdS, _.payload);
      yield put({
        type: "changeOrderBycIdData",
        payload: res.data
      })
    },
    /**
     * 获取所有的订单数据
     * @param {*} _  
     * @param {*} { call, put }
     */
    *getOrderDataA(_, { call, put }) {
      const res = yield call(getOrderDataS);
      yield put({
        type: "changeOrderData",
        payload: res.data
      })
    },
    /**
     * 通过id删除订单
     * @param {*} _
     * @param {*} { call, put }
     */
    *deleteOrderByIdA(_, { call, put }) {
      const res = yield call(deleteOrderByIdS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getOrderDataA"
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
     * 批量删除订单
     * @param {*} _
     * @param {*} { call, put }
     */
    *batchDeleteOrderA(_, { call, put }) {
      const res = yield call(batchDeleteOrderS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '批量删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getOrderDataA"
        })
      } else {
        notification['error']({
          message: '批量删除失败',
          description: '',
          duration: config.duration
        });
      }
    },
    /**
     * 保存订单信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *saveOrderA(_, { call, put }) {
      const res = yield call(saveOrderS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '保存成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getOrderDataA"
        })
      } else {
        notification['error']({
          message: '保存失败',
          description: '',
          duration: config.duration
        });
      }
    },
    /**
     * 更新订单信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *updateOrderA(_, { call, put }) {
      const res = yield call(updateOrderS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '更新成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getOrderDataA"
        })
      } else {
        notification['error']({
          message: '更新失败',
          description: '',
          duration: config.duration
        });
      }
    },
  },
  // 同步action
  reducers: {
    /**
     * 更改state中的orderBycIdData
     * @param {*} state
     * @param {*} action
     * @returns  Object  新的state
     */
    changeOrderBycIdData(state, action) {
      return {
        ...state,
        orderBycIdData: action.payload
      }
    },
    /**
     * 更改state中的orderData
     * @param {*} state
     * @param {*} action
     * @returns  Object  新的state
     */
    changeOrderData(state, action) {
      return {
        ...state,
        orderData: action.payload
      }
    },
  }
}




