/*
* @Description: my project
* @version: 1.0
* @Author: zqy
* @Date: 2021-04-01 13:57:37
* @LastEditors: Rex Joush
* @LastEditTime: 2021-04-01 13:57:37
*/
<template>
  <div>
    <el-divider content-position="left">
      <span style="font-weight: bold; font-size: 20px">
        {{ cronJob.metadata.name }}
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
          <span>{{ cronJob.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ cronJob.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            cronJob.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ cronJob.metadata.uid }}</span>
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
        <br />
        <div :annotation="this.annotation" v-if="annotations.length > 0" class="metadata-item">
          <p>注释</p>
          <li v-for="(anno, index) in annotations" :key="index">
            <el-tag
              class="lebel-tag"
              id="anno_hover"
              effect="dark"
              size="medium"
              color="#bedcfa"
              style="color: #409eff"
              v-if="anno.value.length > 50"
              @click="showAnnoDetails(anno.key)"
            >
              {{ anno.key }}
            </el-tag>
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              v-else
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
          <p>调度</p>
          <span>{{ cronJob.spec.schedule }}</span>
        </div>
        <div class="metadata-item">
          <p>运行中的Jobs</p>
          <span>{{ cronJob.status.active.length }}</span>
        </div>
        <div class="metadata-item">
          <p>暂停</p>
          <span>{{ cronJob.spec.suspend }}</span>
        </div>
        <div class="metadata-item">
          <p>上次调度</p>
          <span>{{
            cronJob.status.lastScheduleTime.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>并发策略</p>
          <span>{{ cronJob.spec.concurrencyPolicy }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- 运行中的Jobs -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">运行中的Jobs</span>
      </div>
      <List item-layout="horizontal" :split="false"> </List>
    </el-card>
    <br /><br />

    <!-- 非工作的Jobs -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">非工作的Jobs</span>
      </div>
      <List item-layout="horizontal" :split="false"> </List>
    </el-card>
    <br /><br />

    <!-- 活动 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">活动</span>
      </div>
      <List item-layout="horizontal" :split="false"> </List>
    </el-card>
    <br /><br />

    <!-- anno 详情 -->
    <el-dialog
      :title="annoKey"
      :visible.sync="annoDialogVisible"
      width="50%"
      @close="annoHandleClose"
      :modal="false"
      :show-close="true"
    >
      <highlightjs javascript :code="annoDetails" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="annoDialogVisible=false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["name"],
  data() {
    return {
      cronJob: {},
      cronJobName: "",
      cronJobNamespace: "",
      annoKey: "",
      annoDialogVisible: false,
      annoDetails: "",
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
    // console.log('CronJobDetailes.name and namespace =', nameAndNamespace, "="),
    this.$store
      .dispatch("cronJobs/getCronJobByNameAndNamespace", nameAndNamespace)
      .then((res) => {
        console.log(res);
        this.cronJob = res.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据中持续的时间
    duration() {},

    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.cronJob.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.cronJob.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.cronJob.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.cronJob.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  },

  methods: {
    showAnnoDetails(key) {
      this.annoDialogVisible = true;
      // console.log(this.cronJob.metadata);
      this.annoKey = key;
      this.annoDetails = this.beautify(this.cronJob.metadata.annotations[key], {
        indent_size: 2,
        space_in_empty_paren: true,
      });
    },
    annoHandleClose() {
      // console.log(this.annoKey, "inhandleClose");
      this.annoKey = "";
      this.annoDialogVisible = false;
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
#anno_hover:hover {
  cursor: pointer;
}
</style>