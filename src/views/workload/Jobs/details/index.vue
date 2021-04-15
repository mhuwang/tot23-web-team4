<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-14 22:17:12
-->

<template>
  <div>
    <!-- {{name}}
    {{namespace}} -->
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{ job.metadata.name }}
      </span></el-divider
    >
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{ job.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ job.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            job.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ job.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div :labels="this.labels" v-if="labels.length > 0" class="metadata-item">
          <p>标签</p>
          <li v-for="label in labels" :key="label">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div :annotation="this.annotations" v-if="annotations.length > 0" class="metadata-item">
          <p>注释</p>
          <li v-for="anno in annotations" :key="anno">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ anno.key }}: {{ anno.value }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- 资源信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">资源信息</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>共需完成</p>
          <span>{{ job.spec.completions }}</span>
        </div>
        <div class="metadata-item">
          <p>可并行Pod</p>
          <span>{{ job.spec.parallelism }}</span>
        </div>
        <br />
        <div class="metadata-item">
          <p>镜像</p>
          <li
            v-for="container in job.spec.template.spec.containers"
            :key="container"
            style="list-style: none"
          >
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ container.image }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- Pod 状态 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">Pod 状态</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div :runningPods="this.runningPods" v-if="runningPods > 0" class="metadata-item">
          <p>运行</p>
          <span >{{ runningPods }}</span>
        </div>
        <div v-if="job.status.succeeded" class="metadata-item">
          <p>成功</p>
          <span>{{ job.status.succeeded }}</span>
        </div>
        <div :pendingPods="this.pendingPods" v-if="pendingPods > 0" class="metadata-item">
          <p>启动中</p>
          <span >{{ pendingPods   }}</span>
        </div>
        <div class="metadata-item">
          <p>期望</p>
          <span>{{ job.spec.completions }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- Pods 列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">Pods 列表</span>
      </div>
      <el-table
        :data="pods"
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
      >
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.phase == 'Running' || scope.row.phase == 'Succeeded'
                  ? 'load-success'
                  : 'load-failed'
              "
          /></template>
        </el-table-column>
        <el-table-column prop="name" label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/workload/pods/' + scope.row.name"
              @click.native="
                goToPodsDetails(scope.row.name, scope.row.namespace)
              "
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="namespace" label="命名空间"> </el-table-column>
        <el-table-column prop="phase" label="状态"> </el-table-column>
        <el-table-column align="center" prop="restartCount" label="重启次数">
        </el-table-column>
        <el-table-column align="center" label="CPU 利用率" width="140">
          <template slot-scope="scope">
            <!-- {{ scope.row.cpuUsage }} -->
            <div v-if="scope.row.cpuUsage != -1">
              <div class="usage-cpu-tag-zero" v-if="scope.row.cpuUsage == 0">
                0 m
              </div>
              <div class="usage-cpu-tag-success" v-else>
                {{ (scope.row.cpuUsage / 1000 / 1000).toFixed(2) }} m
              </div>
            </div>

            <div class="usage-cpu-tag-failed" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内存利用率" width="140">
          <template slot-scope="scope">
            <!-- {{scope.row.memoryUsage == -1}} -->
            <div v-if="scope.row.memoryUsage != -1">
              <div
                class="usage-memory-tag-zero"
                v-if="scope.row.memoryUsage == 0"
              >
                0 MiB
              </div>
              <div class="usage-memory-tag-success" v-else>
                {{ (scope.row.memoryUsage / 1024).toFixed(2) }} MiB
              </div>
            </div>

            <div class="usage-memory-tag-failed" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column prop="nodeName" width="120" label="所属节点">
        </el-table-column>
        <el-table-column prop="podIP" width="120" label="主机ip地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom: 5px"
              size="small"
              @click="showPodEditDialog(scope.row.name, scope.row.namespace)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delPod(scope.row.name, scope.row.namespace)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br /><br />

    <!-- 活动 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">活动</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["name", "namespace"],
  data() {
    return {
      pods: {},
      job: {},
      jobName: "",
      jobNamespace: "",
    };
  },
  // 生命周期方法
  mounted: function () {
    /* name */
    // // 为空，直接存储
    // if (sessionStorage.getItem("deploymentName") == null) {
    //   sessionStorage.setItem("deploymentName", this.$store.state.deployments.deployment.deploymentName);
    //   this.deploymentName = this.$store.state.deployments.deployment.deploymentName;
    // }
    // // 不为空，且当前 deploymentName 有值，同时和之前的不一样，更新 deploymentName
    // else if (
    //   this.$store.state.deployments.deployment.deploymentName != "" &&
    //   sessionStorage.getItem("deploymentName") != this.$store.state.deployments.deployment.deploymentName
    // ) {
    //   sessionStorage.setItem("deploymentName", this.$store.state.deployments.deployment.deploymentName);
    //   this.deploymentName = this.$store.state.deployments.deployment.deploymentName;
    // }

    // /* namespace */
    // // 为空，直接存储
    // if (sessionStorage.getItem("deploymentNamespace") == null) {
    //   sessionStorage.setItem("deploymentNamespace", this.$store.state.deployments.deployment.deploymentNamespace);
    //   this.deploymentNamespace = this.$store.state.deployments.deployment.deploymentNamespace;
    // }
    // // 不为空，且当前 deploymentNamespace 有值，同时和之前的不一样，更新 deploymentNamespace
    // else if (
    //   this.$store.state.deployments.deployment.deploymentNamespace != "" &&
    //   sessionStorage.getItem("deploymentNamespace") != this.$store.state.deployments.deployment.deploymentNamespace
    // ) {
    //   sessionStorage.setItem("deploymentNamespace", this.$store.state.deployments.deployment.deploymentNamespace);
    //   this.deploymentNamespace = this.$store.state.deployments.deployment.deploymentNamespace;
    // }

    // 获取数据
    let nameAndNamespace = {
      // name: sessionStorage.getItem("deploymentName"),
      // namespace: sessionStorage.getItem("deploymentNamespace"),
      name: this.name.split(",")[0],
      namespace: this.name.split(",")[1],
    };
    this.$store
      .dispatch("jobs/getJobPodsByNameAndNamespace", nameAndNamespace)
      .then((res) => {
        console.log(res);
        this.job = res.dataJob;
        this.pods = res.dataPods;
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.job.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.job.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.job.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.job.metadata.annotations[anno],
        });
      }
      return annoArr;
    },

    //正在运行的Pods数量
    runningPods() {
      let amount = 0;
      for (let i in this.pods) {
        switch (this.pods[i].phase) {
          case "Running":
            amount += 1;
            console.log(this.pods[i].phase, i, this.pods.length);
            break;
        }
      }
      return amount;
    },

    //正在启动中的Pods数量
    pendingPods() {
      let amount = 0;
      console.log(this.pods);
      for (let i = 0; i < this.pods.length; i++) {
        switch (this.pods[i].phase) {
          case "Pending":
            amount += 1;
            console.log(this.pods[i].phase, i, this.pods.length);
            break;
        }
      }
      return amount;
    },
  },
};
</script>
<style lang="scss" scoped>
#cpu-usage,
#memory-usage {
  width: 100%;
  height: 250px;
}

.my-card {
  & p {
    display: inline-block;
    font-size: 18px;
    text-align: center;
  }

  & .my-list {
    text-align: center;
    margin: 0 auto;
    & .my-list-item {
      display: inline-block;
      padding: 0 20px;
    }
  }
}

// 元数据
.metadata-item {
  margin: 0 30px 0 0;
  display: inline-block;
  padding: 10px 10px;

  // 小标题
  & p {
    font-size: 14px;
    color: #909399;
  }

  // 小标题下的内容
  & span {
    font-size: 20px;
    color: #303133;
  }

  // 标签列表
  & li {
    display: inline-block;
    // 标签
    & .lebel-tag {
      margin-right: 15px;
      border-radius: 15px;
      margin-top: 5px;
      padding: 2px 8px;
      color: #333;
      border: none;
    }
  }
}
.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 15px;
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
}
</style>