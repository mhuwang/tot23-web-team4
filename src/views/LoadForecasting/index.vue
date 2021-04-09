<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 19:37:31
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-09 10:37:04
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
      this.$confirm("确认修改？").then(()=>{
        console.log("确定");
      }).catch(()=>{
        console.log("cancel")
      })
      
    },
  },
};
</script>

<style lang="less" scoped>
</style>