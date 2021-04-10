/*
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-27 14:18:28
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-30 21:53:43
 */
import { getAllDeployments, getDeploymentByNameAndNamespace } from '@/api/workload/deployments'
import { getToken } from '@/utils/auth'


const state = {
    token: getToken(),
    deployment: {
        deploymentName: '',
        deploymentNamespace: '',
    }
}

const mutations = {
    // 跳转 deployment 详情页面
    TO_DEPLOYMENTS_DETIALS: (state, {deploymentName, deploymentNamespace}) => {
        // 赋值
        state.deployment.deploymentName = deploymentName;
        state.deployment.deploymentNamespace = deploymentNamespace;
    }
}

const actions = {
    // getAllDeployments
    getAllDeployments({ commit }) {
        return new Promise((resolve, reject) => {
            getAllDeployments().then(response => {
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
    // getDeploymentsByNameAndNamesapce
    getDeploymentByNameAndNamespace({ commit }, dep) {
        return new Promise((resolve, reject) => {
            getDeploymentByNameAndNamespace(dep).then(response => {
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
        commit("TO_DEPLOYMENTS_DETIALS", dep);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
