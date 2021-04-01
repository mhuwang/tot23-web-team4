/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 2021-03-28 21:00:03
 * @LastEditors: Anna667
 * @LastEditTime: 2021-03-28 21:00:03
 */
import { getAllConfigMaps } from '@/api/SettingStorage/configMaps'
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
    // getAllConfigMaps
    getAllConfigMaps({ commit }) {
        return new Promise((resolve, reject) => {
            getAllConfigMaps().then(response => {
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
