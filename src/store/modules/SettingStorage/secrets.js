/*
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 2021-03-28 21:00:03
 * @LastEditors: Anna667
 * @LastEditTime: 2021-03-28 21:00:03
 */
import { getAllSecrets } from '@/api/SettingStorage/secrets'
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
    secret: {
        secretName: '',
        secretNamespace: '',
    }
}


const mutations = {
    // 跳转 secret 详情页面
    TO_SECRETS_DETIALS: (state, {secretName, secretNamespace}) => {
        // 赋值
        state.secret.secretName = secretName;
        state.secret.secretNamespace = secretNamespace;
    }

}

const actions = {
    // getAllSecrets
    getAllSecrets({ commit }) {
        return new Promise((resolve, reject) => {
            getAllSecrets().then(response => {
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
        commit("TO_DEPLOYMENTS_DETIALS", ser);
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
