<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 2021-04-06 19:04:16
 * @LastEditors: Anna667
 * @LastEditTime: 2021-04-06 19:04:16
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Config Map</span>
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
      <el-table :data="configMaps" style="width: 100%" stripe>
         <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon 
              :icon-class="
                scope.row.phase == 'Running' || scope.row.phase == 'Succeeded'
                  ? 'load-success'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column>  -->
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link 
              :to="'/settingstorage/configmaps/' + scope.row.name"
              @click.native="
                goToConfigMapsDetails(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                  )
                " 
                class="link-type"
              >
                <span style="color:#409EFF;text-decoration:underline">{{ 
                  scope.row.metadata.name 
                }}</span>
            </router-link>
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom:5px"
              size="small"
              @click="showClasterRolesEditDialog(scope.row.confiMap)"
              >编辑</el-button
            >
            <br>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delClasterRoles(scope.row.congigMap)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>


<script>
export default {
  name: "ConfigMaps",

  data() {
    return {
      configMaps: [],
    };
  },

  created() {
    this.getConfigMaps();
  },

  methods: {
    // 详情页
    goToConfigMapsDetails: function (configMapName, configMapNamespace) {
     // console.log("configMaps index namespace", configMapNamespace);
      let configMapsDetails = {
        configMapName: configMapName,
        configMapNamespace: configMapNamespace
      }
      this.$store
        .dispatch("configMaps/toDetails", configMapsDetails);
    },
    // 当选择框聚焦时获取命名空间
    // initNamespace() {
    //   if (this.namespaces.length == 0) {
    //     this.namespaces = this.$store.state.namespaces.namespaces;
    //   }
    // },
    // 选择框变化事件
    // selectChange(value) {
    //   this.loading = true;
    //   this.getConfigMaps(value);
    // },
    // 选择框清空事件
    // clearSelect() {
    //   this.loading = true;
    //   this.getConfigMaps("all");
    // },

    // 获取所有 pods
    getConfigMaps(namespace) {  //namespace加还是不加？
      this.$store
        .dispatch("configMaps/getAllConfigMaps")
        .then((res) => {
          console.log(res);
          this.configMaps = res.data;
          this.loading = false;
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