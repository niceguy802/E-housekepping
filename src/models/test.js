/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:58:21 
 * @Last Modified by:   liuyr 
 * @Last Modified time: 2019-09-12 09:58:21 
 */
import { query } from '@/services/test';
export default {
  namespace: 'test',
  state: {
    data: []
  },
  effects: {
    *getData(_, { call, put }) {
      const response = yield call(query);
      yield put({
        type: 'changeData',
        payload: response.data,
      });
    },
  },
  reducers: {
    changeData(state, action) {
      return {
        ...state,
        data: action.payload
      };
    },
  },
};
