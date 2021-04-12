/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:07:51
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-12 20:49:57
 */
import { changeResourceByYaml, changeServicesByYaml } from '@/api/common'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
  }
}

const state = getDefaultState()

const mutations = {

}

const actions = {
  // 根据 yaml 文件编辑资源
  changeResourceByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
        changeResourceByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 根据 yaml 文件编辑 service
  changeServicesByYaml({ commit }, yaml) {
    return new Promise((resolve, reject) => {
      changeServicesByYaml(yaml).then(response => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}