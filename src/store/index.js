/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-19 16:14:56
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-07 20:23:32
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import common from './modules/common'

import nodes from './modules/cluster/nodes'
import namespaces from './modules/cluster/namespaces'
import clusterRoles from './modules/cluster/clusterRoles'

import cronJobs from './modules/workload/cronJobs'
import daemonSets from './modules/workload/daemonSets'
import deployments from './modules/workload/deployments'
import jobs from './modules/workload/jobs'
import pods from './modules/workload/pods'
import replicaSets from './modules/workload/replicaSets'
import replicationControllers from './modules/workload/replicationControllers'
import statefulSets from './modules/workload/statefulSets'

import services from './modules/ExploreBalancing/services'
import ingresses from './modules/ExploreBalancing/ingresses'
import configMaps from './modules/SettingStorage/configMaps'
import secrets from './modules/SettingStorage/secrets'
import persistentVolumeClaims from './modules/SettingStorage/persistentVolumeClaims'

import customize from './modules/customize'
import edge from './modules/edge'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    nodes,
    namespaces,
    common,

    cronJobs,
    daemonSets,
    deployments,
    configMaps,
    secrets,
    persistentVolumeClaims,
    jobs,
    pods,
    replicaSets,
    replicationControllers,
    statefulSets,
    
    services,
    ingresses,
    clusterRoles,
    customize,
    edge,
  },
  getters
})

export default store
