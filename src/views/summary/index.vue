<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-09 20:03:12
-->
<template>
  <div>
    <!-- <el-divider style="font-size:40px" content-position="left">集群信息</el-divider> -->
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
                scope.row.node.status.conditions[3].status == 'True'
                  ? 'load-success'
                  : scope.row.node.status.conditions[3].status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="名字" width="120">
          <template slot-scope="scope">
            <router-link
              :to="'/summary/nodes/' + scope.row.node.metadata.name"
              @click.native="goToNodeDetails(scope.row.node.metadata.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.node.metadata.name
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
        <el-table-column
          prop="node.status.conditions[3].status"
          width="100"
          label="准备就绪"
        >
        </el-table-column>
        <el-table-column prop="usage.cpu" label="CPU 利用率" width="200">
          <template slot-scope="scope">
            <el-progress
              class="my-progress"
              color="#fc8621"
              :text-inside="true"
              :stroke-width="20"
              :percentage="
                (
                  scope.row.usage.cpu /
                  1000 /
                  1000 /
                  scope.row.node.status.allocatable.cpu.amount /
                  10
                ).toFixed(2) * 1.0
              "
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="usage.memory" label="内存利用率" width="200">
          <template slot-scope="scope">
            <el-progress
              class="my-progress"
              color="#c24914"
              :text-inside="true"
              :stroke-width="20"
              :percentage="
                (
                  (scope.row.usage.memory /
                    scope.row.node.status.allocatable.memory.amount) *
                  100
                ).toFixed(2) * 1.0
              "
            ></el-progress>
          </template>
        </el-table-column>

        <el-table-column
          prop="node.metadata.creationTimestamp"
          label="创建时间"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.node.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否可调度" width="100">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- {{scope.row}} 每一行封存的数据 -->
            <el-switch
              v-model="!scope.row.node.spec.unschedulable"
              @change="userStateChange(scope.row.node)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNodeEditDialog(scope.row.node)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNode(scope.row.node)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br />
    <!-- 命名空间 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">命名空间</span>
      </div>
      <el-table :data="namespaces" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.phase == 'Active'
                  ? 'load-success'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/summary/namespaces/' + scope.row.metadata.name"
              @click.native="goToNamespacesDetails(scope.row)"
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
        <el-table-column prop="status.phase" label="运行阶段">
        </el-table-column>
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNamespaceEditDialog(scope.row)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNamespace(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br />
    <!-- 集群角色 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">集群角色</span>
      </div>
      <el-table :data="clusterRoles" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.phase == 'Active'? 'load-success': 'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/summary/clusterRoles/' + scope.row.metadata.name"
              @click.native="goToClusterRolesDetails(scope.row)"
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
        <!-- <el-table-column prop="status.phase" label="运行阶段"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showClusterRolesEditDialog(scope.row)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delClusterRoles(scope.row)"
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
  components: {},
  data() {
    return {
      nodes: [],
      namespaces: [],
      clusterRoles: [],
    };
  },

  // 初始化方法
  created: function () {
    this.getAllNodes();
    this.getAllNamespaces();
    this.getAllClusterRoles();
  },

  methods: {
    // 获取 node 节点详情页
    goToNodeDetails: function (nodeName) {
      this.$store.dispatch("nodes/toDetails", nodeName);
    },
    // 获取命名空间详情页
    goToNamespacesDetails: function (namespaceDetails) {
      this.$store.dispatch("namespaces/toDetails", namespaceDetails);
    },
    // 获取集群角色详情页
    goToNamespacesDetails: function (clusterRoles) {
      this.$store.dispatch("clusterRoles/toDetails", clusterRoles);
    },
    // 获取所有节点信息
    getAllNodes: function () {
      this.$store
        .dispatch("nodes/getAllNodes")
        .then((res) => {
          console.log(res);
          this.nodes = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 获取所有命名空间
    getAllNamespaces: function () {
      this.$store
        .dispatch("namespaces/getAllNamespaces")
        .then((res) => {
          console.log(res);
          this.namespaces = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 获取所有集群角色
    getAllClusterRoles: function () {
      this.$store
        .dispatch("clusterRoles/getAllClusterRoles")
        .then((res) => {
          console.log(res);
          this.clusterRoles = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-progress {
  color: #000;
  & .el-progress-bar__outer {
    background-color: red !important;
  }
  ::v-deep .el-progress-bar__inner {
    background-color: #e27802 !important;
  }
  ::v-deep .el-progress-bar__innerText {
    color: #1e212d !important;
  }
}

.el-card {
  width: 95%;
}
.el-table .warning-row {
  background: rgb(194, 99, 70);
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>