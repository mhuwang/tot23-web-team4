/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 
 * @LastEditors: Anna667
 * @LastEditTime: 
 */
import { getAllConfigMaps, getConfigMapByNameAndNamespace, getConfigMapYamlByNameAndNamespace, delConfigMapByNameAndNamespace } from '@/api/SettingStorage/configMaps'
import { getToken } from '@/utils/auth'



const state = {
    token: getToken(),
    configMap: {
        configMapName: '',
        configMapNamespace: '',
    }
}

const mutations = {
    // 跳转 configMap 详情页面
    TO_CONFIGMAPS_DETIALS: (state, configMapsDetails) => {
        // 赋值
        state.configMap.configMapName = configMapsDetails.configMapName;
        state.configMap.configMapNamespace = configMapsDetails.configMapNamespace;
    }

}

const actions = {
    // 获取所有 ConfigMaps
    getAllConfigMaps({ commit }, namespace) {
        return new Promise((resolve, reject) => {
            getAllConfigMaps(namespace).then(response => {
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
    // 通过名称和命名空间获取对应的 configMap 的详情，带利用率信息
    getConfigMapByNameAndNamespace({ commit }, con) {

        return new Promise((resolve, reject) => {
            getConfigMapByNameAndNamespace(con).then(response => {
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

    // 通过名称和命名空间获取对应的 configMap yaml 文件
    getConfigMapYamlByNameAndNamespace({ commit }, configMapsDetails) {
        console.log("actions", configMapsDetails)
        return new Promise((resolve, reject) => {
            getConfigMapYamlByNameAndNamespace(configMapsDetails).then(response => {
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

    // 通过名称和命名空间删除 configMap
    delConfigMapByNameAndNamespace({ commit }, configMapDetails) {
        return new Promise((resolve, reject) => {
            delConfigMapByNameAndNamespace(configMapDetails).then(response => {
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
    toDetails({ commit }, configMapsDetails) {
        //console.log("1111",configMapsDetails.configMapName);
        commit("TO_CONFIGMAPS_DETIALS", configMapsDetails);
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
