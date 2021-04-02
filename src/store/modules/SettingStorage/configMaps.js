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

//------------
const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: ''
    }
}

//const state = getDefaultState()
const state = {
    token: getToken(),
    configMap: {
        configMapName: '',
        configMapNamespace: '',
    }
}

const mutations = {
    // 跳转 configMap 详情页面
    TO_CONFIGMAPS_DETIALS: (state, {configMapName, configMapNamespace}) => {
        // 赋值
        state.configMap.configMapName = configMapName;
        state.configMap.configMapNamespace = configMapNamespace;
    }

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

    // 点击名字进入详情页
    toDetails({ commit }, con) {
        commit("TO_DEPLOYMENTS_DETIALS", con);
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
