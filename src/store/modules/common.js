/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-07 20:07:51
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-07 20:10:39
 */
import { changeResourceByYaml } from '@/api/common'
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}