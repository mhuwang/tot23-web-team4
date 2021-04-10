<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-19 16:08:02
-->
<!--<template>
  <h1>Jobs</h1>
</template>-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Job</span>
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
      <el-table :data="jobs" style="width: 100%" stripe>
        <el-table-column width="40">
          <!-- <template slot-scope="scope"> -->
          <!-- <svg-icon :icon-class="scope.row.status.conditions[3].status == 'True'? 'load-success': scope.row.status.conditions[3].status == 'Unknown'?'load-doubt':'load-failed'"/> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'Job 详情',
                params: {
                  name:
                    scope.row.metadata.name +
                    ',' +
                    scope.row.metadata.namespace,
                },
              }"
              @click.native="goToJobsDetails(scope.row)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间">
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
        <!-- <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column> -->
        <!-- <el-table-column prop="status.podIP" width="140" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="Pods" width="200">
          <!-- <template slot-scope="scope">
            <span>
              {{}}
            </span>
          </template> -->
        </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.status.startTime.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="镜像" width="200">
          <template slot-scope="scope">
            <li v-for="image in images(scope.row)" :key="image" style = "list-style:none">
            <li style = "list-style:none; display:inline-block;">
              <el-tag
                class="lebel-tag"
                effect="dark"
                size="medium"
                color="#bedcfa"
                >{{ image }}</el-tag
              >
            </li>
          </template>
        </el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-plus"
              size="small"
              @click="showClasterRolesAddDialog(scope.row)"
              >增加</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              style="margin-bottom: 5px"
              type="warning"
              icon="el-icon-edit"
              size="small"
              @click="showClasterRolesEditDialog(scope.row)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              style="margin-bottom: 5px"
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delClasterRoles(scope.row)"
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
  name: "Jobs",

  data() {
    return {
      jobs: [],
    };
  },

  created() {
    this.getJobs();
  },

  // computed: {
  //   // Job中的镜像
  //   iimages(job) {
  //     // console.log(job.spec.template.spec.containers[0].image)
  //     let imageList = [];
  //     for (let container in job.spec.template.spec.containers) {
  //       imageList.push(job.spec.template.spec.containers[container].image);
  //     }
  //     return imageList;
  //   },
  // },

  methods: {
    // 获取所有 Jobs
    getJobs() {
      this.$store
        .dispatch("jobs/getAllJobs")
        .then((res) => {
          console.log(res.data);
          this.jobs = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Job中的镜像
    images(job) {
      // console.log(job.spec.template.spec.containers[0].image)
      let imageList = [];
      for (let container in job.spec.template.spec.containers) {
        imageList.push(job.spec.template.spec.containers[container].image);
      }
      return imageList;
    },
  },
};
</script>


<style lang="scss" scoped>
// 标签
.lebel-tag {
  margin-right: 15px;
  border-radius: 15px;
  margin-top: 5px;
  padding: 2px 8px;
  color: #333;
  border: none;
}
</style>