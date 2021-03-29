/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-19 16:14:56
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-28 19:30:02
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import nodes from './modules/cluster/nodes'
import namespaces from './modules/cluster/namespaces'
import clusterRoles from './modules/cluster/clusterRoles'

import pods from './modules/workload/pods'
import deployments from './modules/workload/deployments'
import services from './modules/ExploreBalancing/services'
import ingresses from './modules/ExploreBalancing/ingresses'
import configMaps from './modules/SettingStorage/configMaps'
import secrets from './modules/SettingStorage/secrets'
import persistentVolumeClaims from './modules/SettingStorage/persistentVolumeClaims'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    pods,
    nodes,
    namespaces,
    deployments,
    configMaps,
    secrets,
    persistentVolumeClaims,
    services,
    ingresses,
    clusterRoles
  },
  getters
})

export default store
