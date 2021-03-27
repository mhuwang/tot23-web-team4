<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 13:47:50
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
            <svg-icon :icon-class="scope.row.status.conditions[3].status == 'True'? 'load-success': scope.row.status.conditions[3].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link :to="'/summary/nodes/'+scope.row.metadata.name" @click.native="goToNodeDetails(scope.row)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
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
        <el-table-column prop="status.conditions[3].status" label="准备就绪"> </el-table-column>
        <el-table-column prop="kind" label="CPU 利用率"> </el-table-column>
        <!-- <el-table-column prop="kind" label="CPU 最高需求"> </el-table-column>
        <el-table-column prop="kind" label="Memory 最低需求"> </el-table-column> -->
        <el-table-column prop="kind" label="内存利用率"> </el-table-column>
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.creationTimestamp" label="创建时间"> </el-table-column> -->
        
        <el-table-column prop="metadata.creationTimestamp" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否可调度">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
                <!-- {{scope.row}} 每一行封存的数据 -->
                <el-switch v-model="!scope.row.spec.unschedulable" @change="userStateChange(scope.row)"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" size="small" @click="showNodeEditDialog(scope.row)">编辑</el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delNode(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br/>
    <!-- 命名空间 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">命名空间</span>
      </div>
      <el-table :data="namespaces" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.phase == 'Active'? 'load-success': 'load-failed'"/>
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link :to="'/summary/namespaces/'+scope.row.metadata.name" @click.native="goToNamespacesDetails(scope.row)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
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
        <el-table-column prop="status.phase" label="运行阶段"> </el-table-column>
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" size="small" @click="showNamespaceEditDialog(scope.row)">编辑</el-button>
              <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="small" @click="delNamespace(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br/>
    <!-- 集群角色 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">集群角色</span>
      </div>
      <el-table :data="clasterRoles" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.phase == 'Active'? 'load-success': 'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link :to="'/summary/clusterRoles/'+scope.row.metadata.name" @click.native="goToClusterRolesDetails(scope.row)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
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
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
              <!-- 修改 -->
              <el-button type="primary" icon="el-icon-edit" size="small" @click="showClasterRolesEditDialog(scope.row)">编辑</el-button>
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
    goToNodeDetails: function(nodeDetails){
      this.$store.dispatch("nodes/toDetails", nodeDetails);
    },
    // 获取命名空间详情页
    goToNamespacesDetails: function(namespaceDetails){
      this.$store.dispatch("namespaces/toDetails", namespaceDetails);
    },
    // 获取集群角色详情页
    goToNamespacesDetails: function(clusterRoles){
      this.$store.dispatch("clusterRoles/toDetails", clusterRoles);
    },
    // 获取所有节点信息
    getAllNodes: function () {
      this.$store
        .dispatch("nodes/getAllNodes")
        .then((res) => {
          console.log(res);
          // 过滤掉 edge 节点
           this.nodes = res.data.filter( item => item.metadata.name.indexOf('edge') < 0 );
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
          this.namespaces = res.data
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 获取所有集群角色
    getAllNamespaces: function () {
      this.$store
        .dispatch("clusterRoles/getAllClusterRoles")
        .then((res) => {
          console.log(res);
          this.clusterRoles = res.data
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card{
  width: 95%;
}
.el-table .warning-row {
  background: rgb(194, 99, 70);
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>