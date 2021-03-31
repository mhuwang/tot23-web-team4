/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:18:28
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 14:39:08
 */
import { getAllServices } from '@/api/ExploreBalancing/services'
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
    // getAllServices
    getAllServices({ commit }) {
        return new Promise((resolve, reject) => {
            getAllServices().then(response => {
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
