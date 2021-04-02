/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 2021-03-29 11:11:03
 * @LastEditors: Anna667
 * @LastEditTime: 2021-03-29 11:11:03
 */
import { getAllPVC } from '@/api/SettingStorage/persistentVolumeClaims'
import { getToken } from '@/utils/auth'

////------------
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
    persistentVolumeClaim: {
        persistentVolumeClaimName: '',
        persistentVolumeClaimNamespace: '',
    }
}


const mutations = {
    // 跳转 persistentVolumeClaim 详情页面
    TO_PERSISTENTVOLUMECLAIMS_DETIALS: (state, {persistentVolumeClaimName, persistentVolumeClaimNamespace}) => {
        // 赋值
        state.persistentVolumeClaim.persistentVolumeClaimName = persistentVolumeClaimName;
        state.persistentVolumeClaim.persistentVolumeClaimNamespace = persistentVolumeClaimNamespace;
    }

}

const actions = {
    // getAllPVC
    getAllPVC({ commit }) {
        return new Promise((resolve, reject) => {
            getAllPVC().then(response => {
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
    toDetails({ commit }, per) {
        commit("TO_DEPLOYMENTS_DETIALS", per);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
