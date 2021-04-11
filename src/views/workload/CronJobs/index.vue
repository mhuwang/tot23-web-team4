<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-10 17:17:40
-->

<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 CronJobs</span>
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
      <el-table :data="cronJobs" style="width: 100%" stripe>
        <el-table-column width="40">
          <!-- <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[1].status == 'True'? 'load-success': scope.row.status.conditions[1].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template> -->
        </el-table-column>
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link :to="{name: 'CronJob 详情', params: {name: scope.row.metadata.name + ',' + scope.row.metadata.namespace}}" @click.native="goToCronJobDetails(scope.row.metadata.name, scope.row.metadata.namespace)" class="link-type">
              <span style="color:#409EFF;text-decoration:underline">{{ scope.row.metadata.name }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="apiVersion" label="版本"> </el-table-column> -->
        <el-table-column prop="metadata.namespace" label="命名空间"> </el-table-column>
        <el-table-column prop="spec.schedule" label="调度"> </el-table-column>
        <el-table-column label="暂停"> 
            <template slot-scope = "scope">
              <el-switch
                v-model="scope.row.spec.suspend"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="运行"
                inactive-text='暂停'
                @change="changeCronJobSuSpend()">
              </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="运行中">
            <template slot-scope = "scope">
              {{scope.row.status.active.length}}
            </template>
        </el-table-column>
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
        <el-table-column label="最后调度时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.status.lastScheduleTime.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button style="margin-bottom:5px" type="primary" icon="el-icon-plus" size="small" @click="showCronJobsAddDialog(scope.row)">增加</el-button>
            <br>
            <!-- 编辑 -->
            <el-button style="margin-bottom:5px" type="warning" icon="el-icon-edit" size="small" @click="editCronJobsEditDialog(scope.row)">编辑</el-button>
            <br>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size="small" @click="delCronJobs(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CronJobs",

  data() {
    return {
      cronJobSuSpend: true,
      cronJobs: [],
    };
  },

  created() {
    this.getCronJobs();
  },

  methods: {
    // 详情页
    goToCronJobDetails: function (cronJobName, cronJobNamespace) {
      // console.log("deployments index namespace", deploymentNamespace);
      // this.$store
      //   .dispatch("cronJobs/toDetails", {cronJobName, cronJobNamespace});
    },
    // 获取所有 CronJobs
    getCronJobs() {
      this.$store
        .dispatch("cronJobs/getAllCronJobs")
        .then((res) => {
          console.log(res.data);
          this.cronJobs = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(this.cronJobs.metadata.spec.schedule)
    },
    changeCronJobSuSpend() {
        // this.$store.dispatch("cronJobs/changeCronJobSuSpend")
        // .then((res) => {
        //   this.cronJobSuSpend = res.data;
        // }).catch((error) => {
        //   console.log(error);
        // })
    },
    delCronJobs(job) {
      let nameAndNamespace = {
        name: job.metadata.name,
        namespace: job.metadata.namespace
      }
      // console.log(nameAndNamespace, "++++====")
      this.$store.dispatch("cronJobs/deleteCronJobByNameAndNamespace", nameAndNamespace).then((res) =>{
          console.log(res.data);
          //if 成功刷新页面
          //...
          // this.cronJobs = res.data;
      }).catch((error) =>{
        console.log(error);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
