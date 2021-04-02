<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-01 15:16:44
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Pod</span>
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
        <el-col :span="4">
          <el-button
            type="primary"
            size="large"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
          >
            添加 Pod
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="pods" style="width: 100%;" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.pod.status.phase == 'Running' || scope.row.pod.status.phase == 'Succeeded'
                  ? 'load-success' : 'load-failed'
              "/></template>
        </el-table-column>
        <el-table-column prop="pod.metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/workload/pods/' + scope.row.pod.metadata.name"
              @click.native="goToPodsDetails(scope.row.pod)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.pod.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="pod.metadata.namespace" label="命名空间">
        </el-table-column>
        <el-table-column prop="pod.status.phase" label="状态">
        </el-table-column>
        <el-table-column align="center" prop="pod.status.containerStatuses[0].restartCount" label="重启次数">
        </el-table-column>
        <el-table-column align="center" label="CPU 利用率" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.usage">
                
                <div class="usage-cpu-tag-zero" v-if="scope.row.usage.cpu < 0.1">
                  0 m
                </div>
                <div class="usage-cpu-tag-success" v-else>
                  {{(scope.row.usage.cpu / 1000 / 1000).toFixed(2)}} m
                </div>
            </div>
                        
            <div class="usage-cpu-tag-failed" v-else>
              --
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内存利用率" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.usage">
                
                <div class="usage-memory-tag-zero" v-if="scope.row.usage.memory == 0">
                  0 MiB
                </div>
                <div class="usage-memory-tag-success" v-else>
                  {{(scope.row.usage.memory / 1024).toFixed(2)}} MiB
                </div>
            </div>
                        
            <div class="usage-memory-tag-failed" v-else>
              --
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="pod.spec.nodeName" width="120" label="所属节点">
        </el-table-column>
        <el-table-column prop="pod.status.podIP" width="120" label="主机ip地址">
        </el-table-column>
        <!-- <el-table-column label="启动时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.status.startTime.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom:5px"
              size="small"
              @click="showClasterRolesEditDialog(scope.row.pod)"
              >编辑</el-button
            >
            <br>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delClasterRoles(scope.row.pod)"
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
  name: "Pods",

  data() {
    return {
      pods: [], // pod 列表
      namespaces: [], // 命名空间选择框
      value: "", // 选择框的值
    };
  },

  mounted() {
    this.getPods("all");
  },

  computed: {
    
  },

  methods: {
    // 获取所有 pods
    getPods(namespace) {
      this.$store
        .dispatch("pods/getAllPods", namespace)
        .then((res) => {
          console.log(res);
          this.pods = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 当选择框聚焦时获取命名空间
    initNamespace() {
      if (this.namespaces.length == 0) {
        this.namespaces = this.$store.state.namespaces.namespaces;
      }
    },
    // 选择框变化事件
    selectChange(value) {
      this.getPods(value);
    },
    // 选择框清空事件
    clearSelect() {
      this.getPods("all");
    },
  },
};
</script>

<style lang="scss" scoped>

$cpu-usage-background: #aaa;

.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
}
.usage-cpu-tag-success {
  color: white;
  text-align: center;
  background-color: #387c6d;
  border-radius: 10px;
}
.usage-memory-tag-success {
  color: white;
  text-align: center;
  background-color: #28527a;
  border-radius: 10px;
}
.usage-cpu-tag-zero, .usage-memory-tag-zero {
  color: white;
  text-align: center;
  background-color: #aaa;
  border-radius: 10px;
}
.usage-cpu-tag-failed, .usage-memory-tag-failed {
  color: #333;
  text-align: center;
  border-radius: 10px;
}
</style>