
/*
 * @Description: your project
 * @version: 1.0
 * @Author: zqy
 * @Date: 2021.03.29 16:25
 * @LastEditors: zqy
 * @LastEditTime: 2021.03.29 16:25
 */
import { getAllJobs } from '@/api/workload/jobs'
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
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
