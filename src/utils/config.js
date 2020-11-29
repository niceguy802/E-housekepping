/*
 * @Author: liuyr 
 * @Date: 2019-09-12 09:59:35 
 * @Last Modified by: liuyr
 * @Last Modified time: 2019-09-14 10:32:06
 */
// const baseURL = 'http://134.175.154.93:6677';
// 后台接口地址-主要
const baseURL = 'http://47.106.244.1:6677';
// 文件服务器的基础地址+文件id
const fileBaseURL = 'http://134.175.154.93:8888/group1/';
// 文件上传的接口
const uploadFileURL = 'http://134.175.154.93:8099/manager/file/upload';
// 提示操作显示时长
const duration = 3;
/**
 * 将时间戳转换成年月日时分秒
 * @param {Number} time  时间戳
 * @returns 年月日时分秒字符串
 */
// 2019-09-12 16:22:03
function parseTime(time) {
  let date = new Date(time);
  let year = date.getFullYear();  //2019
  let month = addZero(date.getMonth() + 1); //09
  let day = addZero(date.getDate()); //12
  let hours = addZero(date.getHours()); //16
  let minutes = addZero(date.getMinutes()); //22
  let seconds = addZero(date.getSeconds()); //03
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}
/**
 * 小于10的补零
 * @param {Number} num 需要补零的数据
 * @returns Number或者String 补0之后的数据
 */
function addZero(num) {
  return num >= 10 ? num : '0' + num;
}

/**
 * 获取当前时间的时间戳
 * @returns 时间戳
 */
function getNowTime() {
  return (new Date()).getTime();
}
export default {
  baseURL,
  fileBaseURL,
  uploadFileURL,
  duration,
  parseTime,
  getNowTime,
};