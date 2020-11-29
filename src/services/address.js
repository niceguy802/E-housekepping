/*
 * @Author: liuyr 
 * @Date: 2019-09-12 11:17:01 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-12 15:07:06
 */
import axios from '@/utils/axios';
/**
 * 通过顾客id查找地址信息
 * @export
 * @param {Object} param 提交给后台的数据{customerId:1001}
 * @returns
 */
export async function getAddressByCustomerIdS(param) {
  // param={customerId:1001}
  return axios.get('/address/query', { params: param });
}


