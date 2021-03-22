<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-22 22:04:35
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Pod</span>
      </div>
      <el-table :data="pods" style="width: 100%">
        <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column>
        <el-table-column prop="kind" label="kind"> </el-table-column>
        <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="metadata.name" label="name"> </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column>
        <el-table-column prop="status.startTime" label="启动时间"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Pods",

  data() {
    return {
      pods: [],
    };
  },

  created() {
    this.getPods();
  },

  methods: {
    // 获取所有 pods
    getPods() {
      this.$store
        .dispatch("pods/getAllPods")
        .then((res) => {
          console.log(res.data);
          this.pods = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>