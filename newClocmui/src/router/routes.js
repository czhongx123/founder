import ModuleHome from '@/pages/ModuleHome'
import CreateTask from '@/pages/CreateTask'
import TaskManage from '@/pages/TaskManage'
import CheckList from '@/pages/CheckList'
import CheckTask from '@/pages/CheckTask'
import MyTask from '@/pages/MyTask'
import ContactPlan from '@/pages/ContactPlan'
import moduleConfig from '@root/package.json'
export default [
  {
    // 模块主路由通过工程信息自动配置，无需手动更改
    path: '/' + moduleConfig.name,
    name: moduleConfig.name,
    component: ModuleHome,
    // 路由元数据，包含路由扩展配置信息
    meta: {
      title: '外拨管理', // 页面标题，用于显示在浏览器标题
      notRecord: true // 不记录路由，手动设置成true时，当前路由不会记录在页面标签栏中。
    },
    children: [
     {
        path: 'CreateTask',
        name: moduleConfig.name + '/createTask',
        component: CreateTask,
        meta: {
          title: '创建外呼任务'
        }
      },
      {
        path: 'TaskManage',
        name: moduleConfig.name + '/taskManage',
        component: TaskManage,
        meta: {
          title: '外呼任务管理'
        }
      },
      {
        path: 'CheckList',
        name: moduleConfig.name + '/checkList',
        component: CheckList,
        meta: {
          title: '呼损列表查看'
        }
      },
      {
        path: 'CheckTask',
        name: moduleConfig.name + '/checkTask',
        component: CheckTask,
        meta: {
          title: '任务俯瞰'
        }
      },
        {
            path: 'MyTask',
            name: moduleConfig.name + '/myTask',
            component: MyTask,
            meta: {
                title: '我的任务'
            }
        },
        ,
        {
            path: 'ContactPlan',
            name: moduleConfig.name + '/contactPlan',
            component: ContactPlan,
            meta: {
                title: '联系计划'
            }
        }
    ]
  }
]