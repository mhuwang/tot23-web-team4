/*
 * @Description: your project
 * @version: 1.0
 * @Author: Bernie 
 * @Date: 2021-03-29 17:43
 * @LastEditors: Bernie
 * @LastEditTime: 2021-04-20 16:44:59
 */
import { getCustomResourceDefinition, getCustomResourceDefinitionByName, delObject, getCustomResourceDefinitionObjectListbyName, getObjectYamlByName, getCrdYamlByName,delCrd, getObjectByNameAndNamespace} from '@/api/customize'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    customResourceDefinitionName: '',
    objectDetails: {
      crdName: '',
      objectName: '',
      objectNamespace: '',
    }
  }
}

const state = getDefaultState()

const mutations = {
  // mutation
  // 跳转 CRD 详情页面
  TO_CRD_DETIALS: (state, customResourceDefinitionName) => {
    // 赋值
    state.customResourceDefinitionName = customResourceDefinitionName;
  },

  TO_OBJECT_DETIALS: (state, objectDetails) => {
    // 赋值
    state.objectDetails.crdName = objectDetails.crdName;
    state.objectDetails.objectName = objectDetails.objectName;
    state.objectDetails.objectNamespace=objectDetails.objectNamespace;
  }


}

const actions = {
  // getCrdYamlByName
  getCrdYamlByName({ commit },name) {
    return new Promise((resolve, reject) => {
      getCrdYamlByName(name).then(response => {
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

  //getObjectYamlByName
  getObjectYamlByName({ commit },objectDetails) {
    return new Promise((resolve, reject) => {
      getObjectYamlByName(objectDetails).then(response => {
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
  // getCustomResourceDefinition
  getCustomResourceDefinition({ commit }) {
    return new Promise((resolve, reject) => {
      getCustomResourceDefinition().then(response => {
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
  // getCustomResourceDefinitionByName
  getCustomResourceDefinitionByName({ commit }, customResourceDefinitionName) {
    return new Promise((resolve, reject) => {
      getCustomResourceDefinitionByName(customResourceDefinitionName).then(response => {
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
  //delObject
  delObject({ commit }, objectDetails) {
    return new Promise((resolve, reject) => {
      delObject(objectDetails).then(response => {
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
  // getCustomResourceDefinitionByName
  getObjectByNameAndNamespace({ commit }, objectDetails) {
    return new Promise((resolve, reject) => {
      getObjectByNameAndNamespace(objectDetails).then(response => {
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
  // 给全局变量赋值
  toDetails({ commit }, customResourceDefinitionName) {
    commit("TO_CRD_DETIALS", customResourceDefinitionName);
  },
  toObjectDetails({ commit }, objectDetails) {
    commit("TO_OBJECT_DETIALS", objectDetails);
  },
  //getCustomResourceDefinitionObjectListbyName
  getCustomResourceDefinitionObjectListbyName({ commit }, customResourceDefinitionName) {
    return new Promise((resolve, reject) => {
      getCustomResourceDefinitionObjectListbyName(customResourceDefinitionName).then(response => {
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
  
  delCrd({ commit }, name) {
    return new Promise((resolve, reject) => {
      delCrd(name).then(response => {
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

