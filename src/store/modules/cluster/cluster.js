/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-16 12:12:57
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-16 12:19:33
 */
import { initClusterGraph } from '@/api/cluster/cluster'
import { getToken } from '@/utils/auth'

const state = {
    token: getToken(),
}

const mutations = {
}

const actions = {
    // 初始化图
    initClusterGraph({ commit }) {
        return new Promise((resolve, reject) => {
            initClusterGraph().then(response => {
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