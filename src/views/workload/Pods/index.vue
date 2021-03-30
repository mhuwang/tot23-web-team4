<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-30 19:08:46
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Pod</span>
      </div>
      <el-table :data="pods" style="width: 100%" stripe>
        <el-table-column width="200">
          <template slot-scope="scope">
            <!-- {{scope.row.status}} -->
            <svg-icon :icon-class="scope.row.status.containerStatuses[0].ready == false ? 'load-failed': scope.row.status.containerStatuses[0].started == true?'load-success':'load-doubt'"/>
          </template>
        </el-table-column>
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link :to="'/workload/pods/'+scope.row.metadata.name" @click.native="goToPodsDetails(scope.row)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="命名空间">
          <template slot-scope="scope">
            {{scope.row.status}}
          </template>
        </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间"> </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" width="140" label="主机ip地址"> </el-table-column>
        <!-- <el-table-column label="启动时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.status.startTime.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-plus" size="small" @click="showClasterRolesAddDialog(scope.row)">增加</el-button>
              <!-- 删除 -->
              <el-button type="warning" icon="el-icon-edit" size="small" @click="showClasterRolesEditDialog(scope.row)">编辑</el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delClasterRoles(scope.row)">删除</el-button>
          </template>
        </el-table-column>
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