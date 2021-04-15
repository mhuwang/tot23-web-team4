/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:26
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-13 20:42:07
 */
import { getAllReplicationControllers, getReplicationControllerYamlByNameAndNamespace, deleteReplicationControllerByNameAndNamespace } from '@/api/workload/replicationControllers'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {

}

const actions = {
  // getAllReplicationControllers
  getAllReplicationControllers({ commit }, namespace) {
    return new Promise((resolve, reject) => {
      getAllReplicationControllers(namespace).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 通过名字和命名空间获取 Yaml 格式的 ReplicationController
  getReplicationControllerYamlByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getReplicationControllerYamlByNameAndNamespace(nameAndNamespace).then(response => {
        const { data } = response
        if (!data) {
          return reject('获取失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  //通过名字和命名空间删除 ReplicationController
  deleteReplicationControllerByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      deleteReplicationControllerByNameAndNamespace(nameAndNamespace).then((response) => {
        const { data } = response
        if (!data) {
          return reject('删除失败')
        }
        resolve(data)
      }).catch((error) => {
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
