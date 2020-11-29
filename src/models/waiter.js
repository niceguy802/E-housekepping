/*
 * @Author: liuyr 
 * @Date: 2019-09-13 09:06:53 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-13 09:10:19
 */
//服务员信息管理的小仓库 waiter
import { getWaiterDataS } from '@/services/waiter'
export default {
  // 命名空间
  namespace: 'waiter',
  // 小仓库中的数据
  state: {
    // 服务员信息
    waiterData: []
  },
  // 异步action
  effects: {
    /**
     * 获取顾客信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *getWaiterDataA(_, { call, put }) {
      const res = yield call(getWaiterDataS);
      yield put({
        type: "changeWaiterData",
        payload: res.data
      })
    },
  },
  // 同步action
  reducers: {
    /**
     * 更改state中的waiterData
     * @param {*} state
     * @param {*} action
     * @returns  Object  新的state
     */
    changeWaiterData(state, action) {
      return {
        ...state,
        waiterData: action.payload
      }
    }
  }
}