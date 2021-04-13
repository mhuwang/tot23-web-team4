/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 
 * @LastEditors: Anna667
 * @LastEditTime: 
 */
import { getAllSecrets, getSecretByNameAndNamespace, getSecretYamlByNameAndNamespace, delSecretByNameAndNamespace} from '@/api/SettingStorage/secrets'
import { getToken } from '@/utils/auth'



const state = {
    token: getToken(),
    secret: {
        secretName: '',
        secretNamespace: '',
    }
}


const mutations = {
    // 跳转 secret 详情页面
    TO_SECRETS_DETIALS: (state,ser) => {
        // 赋值
        state.secret.secretName = ser.secretName;
        state.secret.secretNamespace = ser.secretNamespace;
    }

}

const actions = {
    // 获取所有 Secrets
    getAllSecrets({ commit }, namespace) {
        return new Promise((resolve, reject) => {
            getAllSecrets(namespace).then(response => {
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
    // 通过名称和命名空间获取对应的 secret 的详情，带利用率信息
    getSecretByNameAndNamespace({ commit }, ser) {

        return new Promise((resolve, reject) => {
            getSecretByNameAndNamespace(ser).then(response => {
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

    // 通过名称和命名空间获取对应的 secret yaml 文件
    getSecretYamlByNameAndNamespace({ commit }, secretsDetails) {
        console.log("actions", secretsDetails)
        return new Promise((resolve, reject) => {
            getSecretYamlByNameAndNamespace(secretsDetails).then(response => {
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

    // 通过名称和命名空间删除 secret
    delSecretByNameAndNamespace({ commit }, secretsDetails) {
        return new Promise((resolve, reject) => {
            delSecretByNameAndNamespace(secretsDetails).then(response => {
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
    toDetails({ commit }, ser) {
        //console.log("1111",ser.secretName);
        commit("TO_SECRETS_DETIALS", ser);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
