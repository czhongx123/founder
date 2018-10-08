/**
 * 模块所有API定义
 */
import axios from 'axios'
import {env} from '@/config'
// http请求默认配置
axios.defaults.baseURL = env.API_BASE
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000

export default {
  createTask:{
      getSomething: () => axios.get('get.json'),
      next:() => axios.get('get.json'),//进行下一步
      loadData:() => axios.get('get.json'),//确定导入数据
      finishTask:() => axios.get('get.json'),//完成任务分配
  }

}
