/*
 * @Author: liuyr 
 * @Date: 2019-09-14 08:18:14 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 08:22:36
 */
import axios from '@/utils/axios';
/**
 * 通过订单ID查找评论信息
 * @param {Object} param 传递给后台的数据 {order_id:1001}
 * @export
 * @returns
 */
export async function getCommentDataS(param) {
  return axios.get('/comment/findCommentByOrderId', { params: param });
}
/**
 * 通过id删除评论
 * @export
 * @param {Object} param 传递给后台的数据 {id:1001}
 * @returns
 */
export async function deleteCommentByIdS(param) {
  // param  从组件->models->services
  return axios.post('/comment/deleteCommentById', param);
}
/**
 * 保存评论
 * @export
 * @param {Object} param  传递给后台的数据
 * @returns
 */
export async function saveCommentS(param) {
  // param  从组件->models->services
  return axios.post('/comment/insertComment', param);
}
