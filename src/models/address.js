/*
 * @Author: liuyr 
 * @Date: 2019-09-12 15:18:41 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 16:45:25
 */
//地址信息管理的小仓库 address
import { getAddressByCustomerIdS } from '@/services/address'
export default {
  // 命名空间
  namespace: 'address',
  // 小仓库中的数据
  state: {
    // 通过顾客id查找的地址信息
    addressBycIdData: []
  },
  // 异步action
  effects: {
    /**
     * 获取顾客信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *getAddressBycIdDataA(_, { call, put }) {
      const res = yield call(getAddressByCustomerIdS, _.payload);
      yield put({
        type: "changeAddressBycIdData",
        payload: res.data
      })
    },
  },
  // 同步action
  reducers: {
    /**
     * 更改state中的addressBycIdData
     * @param {*} state
     * @param {*} action
     * @returns  Object  新的state
     */
    changeAddressBycIdData(state, action) {
      return {
        ...state,
        addressBycIdData: action.payload
      }
    }
  }
}




