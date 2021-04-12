<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 19:37:28
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-02 13:43:09
-->
<template>
  <div>
    <!-- 节点信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">节点信息</span>
      </div>
      <el-table :data="nodes" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.conditions[0].status == 'True'
                  ? 'load-success'
                  : scope.row.status.conditions[0].status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/edge/edgenodes/' + scope.row.metadata.name"
              @click.native="goToEdgeNodeDetails(scope.row.metadata.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status.conditions[0].status" label="准备就绪">
        </el-table-column>
        <el-table-column prop="metadata.creationTimestamp" label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否可调度" width="100">
          作用域插槽
          <template slot-scope="scope">
            {{scope.row}} 每一行封存的数据
            <el-switch
              v-model="!scope.row.spec.unschedulable"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNodeEditDialog(scope.row)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNode(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br /><br />
    <!-- 设备列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">设备列表</span>
      </div>
      <el-table :data="devices" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.conditions[0].status == 'True'
                  ? 'load-success'
                  : scope.row.status.conditions[0].status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column> -->
        <el-table-column label="设备名字">
          <template slot-scope="scope">
            <!-- <router-link
              :to="'/edge/edgenodes/' + scope.row.metadata.name"
              @click.native="goToEdgeNodeDetails(scope.row.metadata.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link> -->
            <a
              style="color: #409eff; text-decoration: underline"
              href="http://172.18.7.17:8089"
              target="_blank"
              >{{ scope.row.metadata.name }}</a
            >
          </template>
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="metadata.namespace" label="命名空间">
        </el-table-column>
        <el-table-column prop="status.twins[0].desired.value" label="状态">
        </el-table-column>
        <el-table-column prop="metadata.creationTimestamp" label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否可调度" width="100">
          作用域插槽
          <template slot-scope="scope">
            {{scope.row}} 每一行封存的数据
            <el-switch
              v-model="!scope.row.spec.unschedulable"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNodeEditDialog(scope.row)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNode(scope.row)"
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
  data() {
    return {
      nodes: [],
      devices: [],
    };
  },

  // 初始化方法
  created: function () {
    this.getAllEdgeNodes();
    this.getAllDevices();
  },

  methods: {
    // 获取 edge 节点信息
    getAllEdgeNodes: function () {
      this.$store
        .dispatch("edge/getAllEdgeNodes")
        .then((res) => {
          console.log(res);
          // 过滤掉 edge 节点
          this.nodes = res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    //获取所有设备
    getAllDevices() {
      this.$store
        .dispatch("edge/getAllDevices", "devices.devices.kubeedge.io")
        .then((res) => {
          console.log(res.data);
          this.devices = res.data.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goToEdgeNodeDetails: function (edgenodeName) {
      this.$store.dispatch("edge/toDetails", edgenodeName);
    },
  },
};
</script>

<style lang="less" scoped>
</style>