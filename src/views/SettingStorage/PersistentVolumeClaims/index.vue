<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-19 16:07:25
-->

<!--<template>
  <h1>Persistent Volume Claims</h1>
</template>
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Persistent Volume Claims</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
          <!-- 搜索区域 -->
          <el-select
            v-model="value"
            filterable
            clearable
            size="large"
            style="width: 100%"
            @change="selectChange"
            @clear="clearSelect"
            @focus="initNamespace"
            placeholder="请选择命名空间"
          >
            <el-option
              v-for="item in namespaces"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- 搜索按钮
            <el-button
              slot="append"
              size="large"
              icon="el-icon-plus"
              @click="getPods"
            ></el-button> -->
        </el-col>
        <!-- 添加按钮 -->
        <!-- <el-col :span="4">
          <el-button
            type="primary"
            size="large"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
          >
            添加 Pod
          </el-button>
        </el-col> -->
      </el-row>
      <el-table :data="persistentVolumeClaims" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[3].status == 'True'? 'load-success': scope.row.status.conditions[3].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column prop="metadata.name" label="名字" width="200">
          <template slot-scope="scope">
            <router-link :to="'/SettingStorage/persistentVolumeClaims/'+scope.row.metadata.name" @click.native="goToPersistentVolumeClaimsDetails(scope.row)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间" width="150"> </el-table-column>

        <el-table-column prop="status.phase" label="状态" width="100"> </el-table-column>
        <el-table-column prop="spec.volumeName" label="Volume" width="100"> </el-table-column>
        <el-table-column label="容量" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.status.capacity.storage.amount}} {{scope.row.status.capacity.storage.format}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="spec.accessModes[0]" label="访问模式" width="150"> </el-table-column>
        <el-table-column prop="spec.storageClassName" label="存储类" width="120"> </el-table-column>


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
        
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button style="margin-bottom:5px" type="primary" icon="el-icon-plus" size="small" @click="showClasterRolesAddDialog(scope.row)">增加</el-button>
              <br>
              <!-- 删除 -->
              <el-button style="margin-bottom:5px" type="warning" icon="el-icon-edit" size="small" @click="showClasterRolesEditDialog(scope.row)">编辑</el-button>
              <br>
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
  name: "PersistentVolumeClaims",

  data() {
    return {
      persistentVolumeClaims: [],
    };
  },

  created() {
    this.getPersistentVolumeClaims();
  },

  methods: {
    // 获取所有 pods
    getPersistentVolumeClaims() {
      this.$store
        .dispatch("persistentVolumeClaims/getAllPVC")
        .then((res) => {
          console.log(res.data);
          this.persistentVolumeClaims = res.data;
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