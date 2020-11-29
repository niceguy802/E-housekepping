/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:58:42 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 14:56:23
 */
import axios from '@/utils/axios';
/**
 * 查找分类信息
 * @export
 * @returns 
 */
export async function getCategoryDataS() {
  return axios.get('/category/findAllCategory');
}
/**
 * 通过id删除分类
 * @export
 * @param {Object} param 传递给后台的数据{id:1001}
 * @returns
 */
export async function deleteCategoryByIdS(param) {
  // param  从组件->models->services
  return axios.post('/category/deleteByCategoryId', param);
}
/**
 * 批量删除分类
 * @export
 * @param {Object} param 传递给后台的数据 {ids:'1,2,3,4'}
 * @returns
 */
export async function batchDeleteCategoryS(param) {
  // param  从组件->models->services
  return axios.post('/category/batchDeleteCategory', param);
}
/**
 * 保存分类
 * @export
 * @param {*} param 传递给后台的数据
 * @returns
 */
export async function saveCategoryS(param) {
  // param  从组件->models->services
  return axios.post('/category/insertCategory', param);
}
/**
 * 更新分类
 * @export
 * @param {*} param 传递给后台的数据
 * @returns
 */
export async function updateCategoryS(param) {
  // param  从组件->models->services
  return axios.post('/category/updateCategory', param);
}
