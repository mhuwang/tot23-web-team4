/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:26
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-15 21:39:17
 */
import {
  getReplicationControllerLogs,
  getAllReplicationControllers,
  getReplicationControllerYamlByNameAndNamespace,
  deleteReplicationControllerByNameAndNamespace,
  getReplicationControllerResources,
  changeReplicationControllerByYamlString
} from '@/api/workload/replicationControllers'
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

  // 通过名字和命名空间删除 ReplicationController
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

  // 通过名字和命名空间查找 ReplicationController 相应资源
  getReplicationControllerResources({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getReplicationControllerResources(nameAndNamespace).then((response) => {
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

  // 获取 ReplicationController 所有日志
  getReplicationControllerLogs({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getReplicationControllerLogs(nameAndNamespace).then((response) => {
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

  changeReplicationControllerByYamlString({ commit }, yamlData) {
    return new Promise((resolve, reject) => {
      changeReplicationControllerByYamlString(yamlData).then((response) => {
        const { data } = response
        if (!data) {
          return reject('修改失败')
        }
        resolve(data)
      }).catch((error) => {
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
