/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:26
 * @LastEditors: zqy
 * @LastEditTime: 2021-05-08 16:09:13
 */
import { getAllStatefulSets, getStatefulSetYamlByNameAndNamespace, deleteStatefulSetByNameAndNamespace, getStatefulSetResources } from '@/api/workload/statefulSets'
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
  // getAllStatefulSets
  getAllStatefulSets({ commit }, namespace) {
    // console.log(namespace, "in store")
    return new Promise((resolve, reject) => {
      getAllStatefulSets(namespace).then(response => {
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
  
  // 通过名字和命名空间获取 Yaml 格式的 StatefulSet
  getStatefulSetYamlByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getStatefulSetYamlByNameAndNamespace(nameAndNamespace).then(response => {
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

  //通过名字和命名空间删除 StatefulSet
  deleteStatefulSetByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      deleteStatefulSetByNameAndNamespace(nameAndNamespace).then((response) => {
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

  //通过名字和命名空间查找 StatefulSet 相应资源
  getStatefulSetResources({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getStatefulSetResources(nameAndNamespace).then((response) => {
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
