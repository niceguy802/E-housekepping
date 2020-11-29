/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:58:11 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 11:02:40
 */
//顾客信息管理的小仓库 customer
import { getCustomerDataS, deleteCustomerByIdS, batchDeleteCustomerS, saveOrUpdateCustomerS, queryCustomerS } from '@/services/customer'
import config from '@/utils/config'
import { notification } from 'antd';

export default {
  // 命名空间
  namespace: 'customer',
  // 小仓库中的数据
  state: {
    // 所有顾客数据
    customerData: []
  },
  // 异步action
  effects: {
    /**
     * 获取顾客信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *getCustomerDataA(_, { call, put }) {
      const res = yield call(getCustomerDataS);
      yield put({
        type: "changeCustomerData",
        payload: res.data
      })
    },
    /**
     * 模糊查询
     * @param {*} _
     * @param {*} { call, put }
     */
    *queryCustomerA(_, { call, put }) {
      const res = yield call(queryCustomerS, _.payload);
      yield put({
        type: "changeCustomerData",
        payload: res.data
      })
    },
    /**
     * 通过id删除顾客
     * @param {*} _
     * @param {*} { call, put }
     */
    *deleteCustomerByIdA(_, { call, put }) {
      const res = yield call(deleteCustomerByIdS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCustomerDataA"
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
     * 批量删除顾客
     * @param {*} _
     * @param {*} { call, put }
     */
    *batchDeleteCustomerA(_, { call, put }) {
      const res = yield call(batchDeleteCustomerS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '批量删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCustomerDataA"
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
     * 保存或更新顾客信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *saveOrUpdateCustomerA(_, { call, put }) {
      const res = yield call(saveOrUpdateCustomerS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '保存成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCustomerDataA"
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
     * 更改state中的customerData
     * @param {*} state
     * @param {*} action
     * @returns  Object  新的state
     */
    changeCustomerData(state, action) {
      return {
        ...state,
        customerData: action.payload
      }
    }
  }
}




