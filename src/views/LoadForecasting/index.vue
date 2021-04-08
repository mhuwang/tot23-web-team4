<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 19:37:31
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-07 17:22:25
-->
<template>
  <div>
    <h1>负载预测</h1>
    <el-button @click="click"> 获取 </el-button>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data(){
    return {
      code: ''
    }
  },
  methods: {
    click: function () {
      let podDetails = {
        podName: 'crontab-job-1617094860-dqw74',
        podNamespace: 'default',
      };
      this.$store.dispatch("pods/getPodByNameAndNamespace", podDetails).then((res)=>{
        request({
          url: 'http://www.json2yaml.com/api/j2y',
          method: 'post',
          params: {
            p: JSON.stringify(res.data.pod)
          }
        }).then((res)=>{
          console.log(res);
        })
      }).catch((error)=>{

      })
      
    },
  },
};
</script>

<style lang="less" scoped>
</style>