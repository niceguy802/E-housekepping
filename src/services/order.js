/*
 * @Author: liuyr 
 * @Date: 2019-09-12 11:21:26 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-13 08:36:10
 */
import axios from '@/utils/axios';
/**
 * 获取所有的订单信息
 * @export
 * @returns
 */
export async function getOrderDataS() {
  return axios.get('/order/findAllOrder');
}
/**
 * 通过顾客id查找订单信息
 * @export
 * @param {Object} param 传递给后台的参数 {customerId:1001}
 * @returns
 */
export async function getOrderByCustomerIdS(param) {
  // param={customerId:1001}
  return axios.get('/order/query', { params: param });
}

/**
 * 通过id删除订单
 * @export
 * @param {Object} param 传递给后台的数据{id:1001}
 * @returns
 */
export async function deleteOrderByIdS(param) {
  // param  从组件->models->services
  return axios.post('/order/deleteOrderById', param);
}
/**
 * 批量删除订单
 * @export
 * @param {Object} param 传递给后台的数据 {ids:'1,2,3,4'}
 * @returns
 */
export async function batchDeleteOrderS(param) {
  // param  从组件->models->services
  return axios.post('/order/batchDeleteOrder', param);
}
/**
 * 保存订单
 * @export
 * @param {*} param 传递给后台的数据 
 * {
 *  customerId:1001,
 *  addressId:1,
 *  orderLines:[{productId:1,number:10},{productId:2,number:2}]
 * }
 * @returns
 */
export async function saveOrderS(param) {
  // param  从组件->models->services
  return axios.post('/order/insertOrder', param);
}
/**
 * 更新订单
 * @export
 * @param {*} param 传递给后台的数据  {id:1001,waiterId:1}
 * @returns
 */
export async function updateOrderS(param) {
  // param  从组件->models->services
  return axios.post('/order/updateOrderPrimaryKey', param);
}
