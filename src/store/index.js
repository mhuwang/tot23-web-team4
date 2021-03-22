/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-19 16:14:56
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-22 17:27:25
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import pods from './modules/pods'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    pods
  },
  getters
})

export default store
