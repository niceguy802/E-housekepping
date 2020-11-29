/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:58:47 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 11:01:35
 */
import axios from '@/utils/axios';
/**
 * 查找顾客信息
 * @export
 * @returns
 */
export async function getCustomerDataS() {
  return axios.get('/customer/findCustomerAll');
}
/**
 * 模糊查询顾客信息
 * @export
 * @param {*} param  传递给后台的数据
 * @returns
 */
export async function queryCustomerS(param) {
  return axios.get('/customer/queryCustomer', { params: param });
}
/**
 * 通过id删除顾客
 * @export
 * @param {Object} param 传递给后台的数据 {id:1001}
 * @returns
 */
export async function deleteCustomerByIdS(param) {
  // param  从组件->models->services
  return axios.post('/customer/deleteCustomerById', param);
}
/**
 * 批量删除顾客
 * @export
 * @param {Object} param 传递给后台的数据 {ids:'1,2,3,4'}
 * @returns
 */
export async function batchDeleteCustomerS(param) {
  // param  从组件->models->services
  return axios.post('/customer/batchDeleteCustomer', param);
}
/**
 * 保存和更新顾客
 * @export
 * @param {Object} param  传递给后台的数据
 * @returns
 */
export async function saveOrUpdateCustomerS(param) {
  // param  从组件->models->services
  return axios.post('/customer/saveCustomerOrUpdateCustomer', param);
}
