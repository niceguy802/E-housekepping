/*
 * @Author: liuyr 
 * @Date: 2019-09-13 09:04:33 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-13 09:06:03
 */
import axios from '@/utils/axios';
/**
 * 查找所有的服务员信息
 * @export
 * @returns
 */
export async function getWaiterDataS() {
  return axios.get('/waiter/findAllWaiter');
}