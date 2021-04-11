
/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:25
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-11 19:32:58
 */
import { getAllJobs, getJobByNameAndNamespace, deleteJobByNameAndNamespace, getJobYamlByNameAndNamespace } from '@/api/workload/jobs'
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
  // getAllJobs
  getAllJobs({ commit }) {
    return new Promise((resolve, reject) => {
      getAllJobs().then(response => {
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
  
  // getJobByNameAndNamespace
  getJobByNameAndNamespace({ commit }, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getJobByNameAndNamespace(nameAndNamespace).then(response => {
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

  //通过名字和命名空间删除 Job
  deleteJobByNameAndNamespace({commit}, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      deleteJobByNameAndNamespace(nameAndNamespace).then((response) => {
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
  getJobYamlByNameAndNamespace({commit}, nameAndNamespace) {
    return new Promise((resolve, reject) => {
      getJobYamlByNameAndNamespace(nameAndNamespace).then(response => {
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
