/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:59:10 
 * @Last Modified by:   liuyr 
 * @Last Modified time: 2019-09-12 09:59:10 
 */
import axios from '@/utils/axios';

export async function query() {
  return axios.get('/customer/findCustomerAll');
}
// cnpm install --save axios
