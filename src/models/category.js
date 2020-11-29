/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:57:36 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 16:51:49
 */
//分类信息管理的小仓库 category
import { getCategoryDataS, deleteCategoryByIdS, batchDeleteCategoryS, saveCategoryS, updateCategoryS } from '@/services/category';
import config from '@/utils/config'
import { notification } from 'antd';
export default {
  // 命名空间
  namespace: 'category',
  // 小仓库的数据
  state: {
    // 所有的类型数据
    categoryData: []
  },
  // 异步action
  effects: {
    /**
     * 获取所有的类型数据
     * @param {*} _  
     * @param {*} { call, put }
     */
    *getCategoryDataA(_, { call, put }) {
      const res = yield call(getCategoryDataS);
      yield put({
        type: "changeCategoryData",
        payload: res.data
      })
    },
    /**
     * 通过id删除类型
     * @param {*} _
     * @param {*} { call, put }
     */
    *deleteCategoryByIdA(_, { call, put }) {
      const res = yield call(deleteCategoryByIdS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCategoryDataA"
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
     * 批量删除类型
     * @param {*} _
     * @param {*} { call, put }
     */
    *batchDeleteCategoryA(_, { call, put }) {
      const res = yield call(batchDeleteCategoryS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '批量删除成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCategoryDataA"
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
     * 保存类型信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *saveCategoryA(_, { call, put }) {
      const res = yield call(saveCategoryS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '保存成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCategoryDataA"
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
     * 更新类型信息
     * @param {*} _
     * @param {*} { call, put }
     */
    *updateCategoryA(_, { call, put }) {
      const res = yield call(updateCategoryS, _.payload);
      if (res.status === 200) {
        notification['success']({
          message: '更新成功',
          description: '',
          duration: config.duration
        });
        yield put({
          type: "getCategoryDataA"
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
     * 更改state中categoryData
     * @param {*} state
     * @param {*} action
     * @returns Object 新的state
     */
    changeCategoryData(state, action) {
      return {
        ...state,
        categoryData: action.payload
      }
    }
  }
}




