/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-10 15:03:17
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-02 13:27:38
 */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

  // 登录页
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 404 页面
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 集群信息
  {
    path: '/',
    component: Layout,
    redirect: '/summary',
    children: [
      {
      path: 'summary',
      name: '集群信息',
      component: () => import('@/views/summary/index'),
      meta: { title: '集群信息', icon: 'summary' }
      },
      {
        path: 'summary/nodes/:name([a-z0-9-]+)',
        component: () => import('@/views/summary/details/Node/index'),
        name: 'Node 详情',
        meta: { title: 'Node Details', noCache: true, activeMenu: '/summary'},
        hidden: true
      },
      {
        path: 'summary/namespaces/:name([a-z0-9-]+)',
        component: () => import('@/views/summary/details/Namespace/index'),
        name: 'Namespace 详情',
        meta: { title: 'Namespace Details', noCache: true, activeMenu: '/summary'},
        hidden: true
      }
    ]
  },

  // 工作量
  {
    path: '/workload',
    component: Layout,
    redirect: '/workload/CronJobs',
    name: '工作量',
    meta: { title: '工作量', icon: 'workload' },
    children: [
      {
        path: 'cronjobs',
        name: 'Cron Jobs',
        component: () => import('@/views/workload/CronJobs/index'),
        meta: { title: 'Cron Jobs', icon: 'cron-jobs' }
      },
      // cronjob 详情
      {
        path: 'cronjob/:name',
        component: () => import('@/views/workload/CronJobs/details/index'),
        name: 'CronJob 详情',
        meta: { title: 'CronJob Details', noCache: true, activeMenu: '/cronjobs'},
        hidden: true,
        props: true
      },
      {
        path: 'daemonsets',
        name: 'Daemon Sets',
        component: () => import('@/views/workload/DaemonSets/index'),
        meta: { title: 'Daemon Sets', icon: 'daemon-sets' }
      },
      // daemonset 详情
      {
        path: 'daemonset/:name',
        component: () => import('@/views/workload/DaemonSets/details/index'),
        name: 'DaemonSet 详情',
        meta: { title: 'Daemon Set Details', noCache: true, activeMenu: '/daemonsets'},
        hidden: true,
        props: true
      },
      {
        path: 'deployments',
        name: 'Deployments',
        component: () => import('@/views/workload/Deployments/index'),
        meta: { title: 'Deployments', icon: 'deployments' },
      },
      // deployment 详情
      {
        path: 'deployment/:name',
        component: () => import('@/views/workload/Deployments/details/index'),
        name: 'Deployment 详情',
        meta: { title: 'Deployment Details', noCache: true, activeMenu: '/deployments'},
        hidden: true,
        props: true
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('@/views/workload/Jobs/index'),
        meta: { title: 'Jobs', icon: 'jobs' }
      },
      // job 详情
      {
        path: 'job/:name',
        component: () => import('@/views/workload/Jobs/details/index'),
        name: 'Job 详情',
        meta: { title: 'Job Details', noCache: true, activeMenu: '/jobs'},
        hidden: true,
        props: true
      },
      {
        path: 'pods',
        name: 'Pods',
        component: () => import('@/views/workload/Pods/index'),
        meta: { title: 'Pods', icon: 'pods' }
      },
      {
        path: 'replicasets',
        name: 'Replica Sets',
        component: () => import('@/views/workload/ReplicaSets/index'),
        meta: { title: 'ReplicaSets', icon: 'replica-sets' }
      },
      // replicaset 详情
      {
        path: 'replicaset/:name',
        component: () => import('@/views/workload/ReplicaSets/details/index'),
        name: 'ReplicaSet 详情',
        meta: { title: 'Replicaset Details', noCache: true, activeMenu: '/replicasets'},
        hidden: true,
        props: true
      },
      {
        path: 'replicationcontrollers',
        name: 'Replication Controllers',
        component: () => import('@/views/workload/ReplicationControllers/index'),
        meta: { title: 'Replication Controllers', icon: 'replication-controllers' }
      },
      // replicationcontroller 详情
      {
        path: 'replicationcontroller/:name',
        component: () => import('@/views/workload/ReplicationControllers/details/index'),
        name: 'ReplicationController 详情',
        meta: { title: 'replicationcontroller Details', noCache: true, activeMenu: '/replicationcontrollers'},
        hidden: true,
        props: true
      },
      {
        path: 'statefulsets',
        name: 'Stateful Sets',
        component: () => import('@/views/workload/StatefulSets/index'),
        meta: { title: 'Stateful Sets', icon: 'stateful-sets' }
      },
      // statefulset 详情
      {
        path: 'statefulset/:name',
        component: () => import('@/views/workload/StatefulSets/details/index'),
        name: 'Statefulset 详情',
        meta: { title: 'Statefulset Details', noCache: true, activeMenu: '/statefulsets'},
        hidden: true,
        props: true
      },
    ]
  },

  // 发现与负载均衡
  {
    path: '/explorebalancing',
    component: Layout,
    redirect: '/explorebalancing/Ingresses',
    name: '发现与负载均衡',
    meta: { title: '发现与负载均衡', icon: 'explore-balancing' },
    children: [
      {
        path: 'ingresses',
        name: 'Ingresses',
        component: () => import('@/views/ExploreBalancing/Ingresses/index'),
        meta: { title: 'Ingresses', icon: 'ingresses' }
      },
      {
        path: 'services',
        name: 'Services',
        component: () => import('@/views/ExploreBalancing/Services/index'),
        meta: { title: 'Services', icon: 'services' }
      }
    ]
  },

  // 配置和存储
  {
    path: '/settingstorage',
    component: Layout,
    redirect: '/SettingStorage/ConfigMaps',
    name: '配置与存储',
    meta: { title: '配置与存储', icon: 'setting-storage' },
    children: [
      {
        path: 'configmaps',
        name: 'Config Maps',
        component: () => import('@/views/SettingStorage/ConfigMaps/index'),
        meta: { title: 'Config Maps', icon: 'config-maps' }
      },
      // -----configMap 详情
      {
        path: 'configmaps/:name([a-z0-9-]+)',
        component: () => import('@/views/SettingStorage/ConfigMaps/details/index'),
        name: 'Config Map 详情',
        meta: { title: 'ConfigMap Details', noCache: true, activeMenu: '/configmaps'},
        hidden: true
      },
      {
        path: 'persistentvolumeclaims',
        name: 'Persistent Volume Claims',
        component: () => import('@/views/SettingStorage/PersistentVolumeClaims/index'),
        meta: { title: 'Persistent Volume Claims', icon: 'persistent-volume-claims' }
      },
      //------- persistentvolumeclaims 详情
      {
        path: 'persistentvolumeclaims/:name([a-z0-9-]+)',
        component: () => import('@/views/SettingStorage/PersistentVolumeClaims/details/index'),
        name: 'PersistentVolumeClaims 详情',
        meta: { title: 'PersistentVolumeClaims Details', noCache: true, activeMenu: '/persistentvolumeclaims'},
        hidden: true
      },
      {
        path: 'secrets',
        name: 'Secrets',
        component: () => import('@/views/SettingStorage/Secrets/index'),
        meta: { title: 'Secrets', icon: 'secrets' }
      },
      //-------- Secrets 详情
      {
        path: 'secrets/:name([a-z0-9-]+)',
        component: () => import('@/views/SettingStorage/Secrets/details/index'),
        name: 'Secrets 详情',
        meta: { title: 'Secrets Details', noCache: true, activeMenu: '/secrets'},
        hidden: true
      }
    ]
  },

  // 自定义资源
  {
    path: '/customize',
    component: Layout,
    redirect: '/customize',
    children: [{
      path: 'customize',
      name: '自定义资源',
      component: () => import('@/views/customize/index'),
      meta: { title: '自定义资源', icon: 'customize' }
    }]
  },
  // 负载预测
  {
    path: '/loadforecasting',
    component: Layout,
    redirect: '/loadforecasting',
    children: [{
      path: 'loadforecasting',
      name: '负载预测',
      component: () => import('@/views/LoadForecasting/index'),
      meta: { title: '负载预测', icon: 'load-forecasting' }
    }]
  },
  // 边缘节点
  {
    path: '/edge',
    component: Layout,
    redirect: '/edge',
    children: [
      {
      path: 'edge',
      name: '边缘节点',
      component: () => import('@/views/edge/index'),
      meta: { title: '边缘节点', icon: 'edge' }
      },
      {
        path: 'edgenodes/:name([a-z0-9-]+)',
        component: () => import('@/views/edge/details/index'),
        name: '边缘节点详情',
        meta: { title: 'Edge Node Details', noCache: true, activeMenu: '/edge'},
        hidden: true
      },
    ]
  },
  // 创建资源
  {
    path: '/establish',
    component: Layout,
    redirect: '/establish',
    children: [{
      path: 'establish',
      name: '创建资源',
      component: () => import('@/views/establish/index'),
      meta: { title: '创建资源', icon: 'establish' }
    }]
  },
  // 用户管理
  {
    path: '/account',
    component: Layout,
    redirect: '/account',
    children: [{
      path: 'account',
      name: '用户管理',
      component: () => import('@/views/account/index'),
      meta: { title: '用户管理', icon: 'account' }
    }]
  },
  // 个人信息
  {
    path: '/information',
    component: Layout,
    redirect: '/information',
    children: [{
      path: 'information',
      name: '个人信息',
      component: () => import('@/views/information/index'),
      meta: { title: '个人信息', icon: 'information' }
    }]
  },
  // 关于
  {
    path: '/about',
    component: Layout,
    redirect: '/about',
    children: [{
      path: 'about',
      name: '关于',
      component: () => import('@/views/about/index'),
      meta: { title: '关于', icon: 'about' }
    }]
  },
  // {
  //   path: '/table',
  //   component: Layout,
  //   redirect: '/table',
  //   children: [{
  //     path: 'table',
  //     name: 'Table',
  //     component: () => import('@/views/table/index'),
  //     meta: { title: 'Table', icon: 'table' }
  //   }]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
