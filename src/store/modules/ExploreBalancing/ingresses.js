/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:18:28
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-13 13:55:38
 */

import { getAllIngresses, getIngressesByNameAndNamespace, getIngressYamlByNameAndNamespace, delIngressByNameAndNamespace } from '@/api/ExploreBalancing/ingresses'
import { getToken } from '@/utils/auth'

const state = {
    token: getToken(),
    ingress: {
        ingressName: '',
        ingressNamespace: '',
    }
}

const mutations = {
    // 跳转 ingress 详情页面
    TO_INGRESSES_DETIALS: (state, { ingressName, ingressNamespace }) => {
        // 赋值
        state.ingress.ingressName = ingressName;
        state.ingress.ingressNamespace = ingressNamespace;
    }
}

const actions = {
    // getAllIngresses
    getAllIngresses({ commit }) {
        return new Promise((resolve, reject) => {
            getAllIngresses().then(response => {
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

    // getIngressesByNameAndNamespace
    getIngressesByNameAndNamespace({ commit }, dep) {
        return new Promise((resolve, reject) => {
            getIngressesByNameAndNamespace(dep).then(response => {
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

    // 通过名称和命名空间获取对应的 ingress yaml 文件
    getIngressYamlByNameAndNamespace({ commit }, ingressDetails) {

        return new Promise((resolve, reject) => {
            getIngressYamlByNameAndNamespace(ingressDetails).then(response => {
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

    //通过名称和命名空间删除一个service
    delIngressByNameAndNamespace({ commit }, ingressDetails) {
        return new Promise((resolve, reject) => {
            delIngressByNameAndNamespace(ingressDetails).then(response => {
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

    toDetails({ commit }, dep) {
        commit("TO_INGRESSES_DETIALS", dep);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
