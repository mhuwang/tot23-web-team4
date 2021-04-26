/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 
 * @LastEditors: Anna
 * @LastEditTime: 2021-04-16 10:28:24
 */
import { getAllPVC, getPVCByNameAndNamespace, getPVCYamlByNameAndNamespace, delPVCByNameAndNamespace} from '@/api/SettingStorage/persistentVolumeClaims'
import { getToken } from '@/utils/auth'



const state = { 
    token: getToken(),
    persistentVolumeClaim: {
        persistentVolumeClaimName: '',
        persistentVolumeClaimNamespace: '',
    }
}


const mutations = {
    // 跳转 persistentVolumeClaim 详情页面
    TO_PERSISTENTVOLUMECLAIMS_DETIALS: (state, per) => {
        // 赋值
        state.persistentVolumeClaim.persistentVolumeClaimName = per.persistentVolumeClaimName;
        state.persistentVolumeClaim.persistentVolumeClaimNamespace = per.persistentVolumeClaimNamespace;
    }

}

const actions = {
    // getAllPVC
    getAllPVC({ commit }, namespace) {
        return new Promise((resolve, reject) => {
            getAllPVC(namespace).then(response => {
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
    // 通过名称和命名空间获取对应的 persistentVolumeClaim 的详情，带利用率信息 
    getPVCByNameAndNamespace({ commit }, per) {
        return new Promise((resolve, reject) => {
            getPVCByNameAndNamespace(per).then(response => {
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

    // 通过名称和命名空间获取对应的 persistentVolumeClaim yaml 文件
    getPVCYamlByNameAndNamespace({ commit }, pvcDetails) {
        console.log("actions", pvcDetails)
        return new Promise((resolve, reject) => {
            getPVCYamlByNameAndNamespace(pvcDetails).then(response => {
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

    // 通过名称和命名空间删除 persistentVolumeClaim
    delPVCByNameAndNamespace({ commit }, pvcDetails) {
        return new Promise((resolve, reject) => {
            delPVCByNameAndNamespace(pvcDetails).then(response => {
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
        commit("TO_PERSISTENTVOLUMECLAIMS_DETIALS", per);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
