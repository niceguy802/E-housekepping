/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:58:50 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 15:00:11
 */
import axios from '@/utils/axios';
/**
 * 查找产品信息
 * @export
 * @returns
 */
export async function getProductDataS() {
  return axios.get('/product/findAllProduct');
}
/**
 * 通过id删除产品
 * @export
 * @param {Object} param 传递给后台的数据 {id:1001}
 * @returns
 */
export async function deleteProductByIdS(param) {
  // param  从组件->models->services
  return axios.post('/product/deleteProductById', param);
}
/**
 * 批量删除产品
 * @export
 * @param {Object} param 传递给后台的数据 {idList:'1,2,3,4'}
 * @returns
 */
export async function batchDeleteProductS(param) {
  // param  从组件->models->services
  return axios.post('/product/deleteBathProduct', param);
}
/**
 * 保存产品
 * @export
 * @param {Object} param 传递给后台的数据
 * @returns
 */
export async function saveProductS(param) {
  // param  从组件->models->services
  return axios.post('/product/insertProduct', param);
}
/**
 * 更新产品
 * @export
 * @param {Object} param 传递给后台的数据
 * @returns
 */
export async function updateProductS(param) {
  // param  从组件->models->services
  return axios.post('/product/updateProduct', param);
}
