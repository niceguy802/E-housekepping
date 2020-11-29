/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:58:16 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 16:51:48
 */
//产品信息管理的小仓库 product
import { getProductDataS, deleteProductByIdS, batchDeleteProductS, saveProductS, updateProductS } from '@/services/product'
import config from '@/utils/config'
import { notification } from 'antd';
export default {
  // 命名空间
  namespace: 'product',
  // 小仓库的数据
  state: {
    // 所有的产品的数据
    productData: []
  },
  // 异步action
  effects: {
    /**
     * 获取产品的数据
     * @param {*} _
     * @param {*} { call, put }
     */
    *getProductDataA(_, { call, put }) {
      const res = yield call(getProductDataS);
      yield put({
        type: "changeProductData",
        payload: res.data
      })
    },
    /**
     * 单个删除产品
     * @param {*} _
     * @param {*} { call, put }
     */
    *deleteProductByIdA(_, { call, put }) {
      const res = yield call(deleteProductByIdS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getProductDataA"
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
     * 批量删除产品
     * @param {*} _
     * @param {*} { call, put }
     */
    *batchDeleteProductA(_, { call, put }) {
      const res = yield call(batchDeleteProductS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '批量删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getProductDataA"
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
     * 保存产品
     * @param {*} _
     * @param {*} { call, put }
     */
    *saveProductA(_, { call, put }) {
      const res = yield call(saveProductS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '保存成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getProductDataA"
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
     * 更新产品
     * @param {*} _
     * @param {*} { call, put }
     */
    *updateProductA(_, { call, put }) {
      const res = yield call(updateProductS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '更新成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getProductDataA"
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
     * 更改state中的productData
     * @param {*} state
     * @param {*} action
     * @returns Object state 新的state对象
     */
    changeProductData(state, action) {
      return {
        ...state,
        productData: action.payload
      }
    }
  }
}




