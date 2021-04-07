/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 2021-04-06 21:42:03
 * @LastEditors: Anna667
 * @LastEditTime: 2021-04-06 21:42:03
 */
import { getAllConfigMaps, getConfigMapByNameAndNamespace} from '@/api/SettingStorage/configMaps'
import { getToken } from '@/utils/auth'

//------------
// const getDefaultState = () => {
//     return {
//         token: getToken(),
//         name: '',
//         avatar: ''
//     }
// }

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
    TO_CONFIGMAPS_DETIALS: (state, configMapsDetails) => {        
        // 赋值
        state.configMap.configMapName = configMapsDetails.configMapName;
        state.configMap.configMapNamespace = configMapsDetails.configMapNamespace;
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
    // getConfigMapByNameAndNamesapce
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
