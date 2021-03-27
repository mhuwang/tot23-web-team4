/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-19 16:14:56
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 14:36:00
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import nodes from './modules/cluster/nodes'
import namespaces from './modules/cluster/namespaces'
import pods from './modules/workload/pods'
import deployments from './modules/workload/deployments'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    pods,
    nodes,
    namespaces,
    deployments
  },
  getters
})

export default store
