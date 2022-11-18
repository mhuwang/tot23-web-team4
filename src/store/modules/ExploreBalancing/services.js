/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:18:28
 * @LastEditors: Rex Joush
 * @LastEditTime: 2022-11-01 14:31:52
 */
import {
  getAllServices,
  getServicesByNameAndNamespace,
  getServiceYamlByNameAndNamespace,
  delServiceByNameAndNamespace
} from '@/api/ExploreBalancing/services'
import { getToken } from '@/utils/auth'

const state = {
    token: getToken(),
    service: {
        serviceName: '',
        serviceNamespace: '',
    }
}

const mutations = {
    // 跳转 service 详情页面
    TO_SERVICES_DETIALS: (state, { serviceName, serviceNamespace }) => {
        // 赋值
        state.service.serviceName = serviceName;
        state.service.serviceNamespace = serviceNamespace;
    }
}

const actions = {
    // getAllServices
    getAllServices({ commit }, namespace) {
        return new Promise((resolve, reject) => {
            getAllServices(namespace).then(response => {
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

    // getServicesByNameAndNamesapce
    getServicesByNameAndNamespace({ commit }, dep) {
        return new Promise((resolve, reject) => {
            getServicesByNameAndNamespace(dep).then(response => {
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


    // 通过名称和命名空间获取对应的 service yaml 文件
    getServiceYamlByNameAndNamespace({ commit }, serviceDetails) {

        return new Promise((resolve, reject) => {
            getServiceYamlByNameAndNamespace(serviceDetails).then(response => {
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
    delServiceByNameAndNamespace({ commit }, serviceDetails) {
        return new Promise((resolve, reject) => {
            delServiceByNameAndNamespace(serviceDetails).then(response => {
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
    toDetails({ commit }, dep) {
        commit("TO_SERVICES_DETIALS", dep);
    },
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
