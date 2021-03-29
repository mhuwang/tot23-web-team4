<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-19 16:08:50

 -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Services</span>
      </div>
      <el-table :data="services" style="width: 100%" stripe>
        <el-table-column width="40">
          <!-- <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[1].status == 'True'? 'load-success': scope.row.status.conditions[1].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template> -->
        </el-table-column>
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link :to="'/ExploreBalancing/services/'+scope.row.metadata.name" @click.native="goToServicesDetails(scope.row)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="apiVersion" label="版本"> </el-table-column> -->
        <el-table-column prop="metadata.namespace" label="命名空间"> </el-table-column>
        <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>service-template-hash: {{scope.row.metadata.labels['service-template-hash']}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        <!-- <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" width="140" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button style="margin-bottom:5px" type="primary" icon="el-icon-plus" size="small" @click="showServicesAddDialog(scope.row)">增加</el-button>
              <br>
              <!-- 编辑 -->
              <el-button style="margin-bottom:5px" type="warning" icon="el-icon-edit" size="small" @click="editServicesEditDialog(scope.row)">编辑</el-button>
              <br>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delServices(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Services",

  data() {
    return {
      services: [],
    };
  },

  created() {
    this.getServices();
  },

  methods: {
    // 获取所有 Services
    getServices() {
      this.$store
        .dispatch("services/getAllServices")
        .then((res) => {
          console.log(res.data);
          this.services = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>