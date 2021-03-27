/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:18:28
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 14:39:08
 */
import { getAllDeployments } from '@/api/workload/deployments'
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
    // getAllDeployments
    getAllDeployments({ commit }) {
        return new Promise((resolve, reject) => {
            getAllDeployments().then(response => {
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
