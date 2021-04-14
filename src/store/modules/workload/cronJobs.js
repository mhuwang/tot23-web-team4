/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:14
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-13 20:06:07
 */
import { getAllCronJobs, getCronJobByNameAndNamespace, deleteCronJobByNameAndNamespace, getCronJobYamlByNameAndNamespace } from '@/api/workload/cronJobs'
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
  // getAllCronJobs
  getAllCronJobs({ commit }, namespace) {
    return new Promise((resolve, reject) => {
      getAllCronJobs(namespace).then(response => {
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
  
  //通过名字和命名空间获取CronJob
  getCronJobByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getCronJobByNameAndNamespace(nameAndNamespace).then(response => {
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

  //通过名字和命名空间删除 CronJob
  deleteCronJobByNameAndNamespace({commit}, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      deleteCronJobByNameAndNamespace(nameAndNamespace).then((response) => {
        const { data } = response
        if (!data){
          return reject('删除失败')
        }
        resolve(data)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // 通过名字和命名空间获取 Yaml 格式的 Cronjob
  getCronJobYamlByNameAndNamespace({commit}, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getCronJobYamlByNameAndNamespace(nameAndNamespace).then(response => {
        const {data} =response
        if(!data){
          return reject('获取失败')
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
