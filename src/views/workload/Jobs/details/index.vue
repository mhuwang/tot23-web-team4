<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-30 22:32:48
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
        <div class="metadata-item">
          <p>标签</p>
          <li v-for="label in this.labels" :key="label">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div class="metadata-item">
          <p>注释</p>
          <li v-for="anno in this.annotations" :key="anno">
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
        <div class="metadata-item">
          <p>运行</p>
          <span>{{ job.spec.completions }}</span>
        </div>
        <div class="metadata-item">
          <p>成功</p>
          <span>{{ job.status.succeeded }}</span>
        </div>
        <div class="metadata-item">
          <p>启动中</p>
          <span></span>
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
      pods列表
    </el-card>
    <br /><br />

    <!-- 活动 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">活动</span>
      </div>

      <!-- <el-table :data="jobs" style="width: 100%" stripe>
        <el-table-column label="信息" width="200">
          <template slot-scope="scope">
            <span> </span>
          </template>
        </el-table-column>
        <el-table-column label="资源" width="100">
          <template slot-scope="scope">
            <span> </span>
          </template>
        </el-table-column>
        <el-table-column label="子对象" width="100">
          <template slot-scope="scope">
            <span> </span>
          </template>
        </el-table-column>
        <el-table-column label="次数" width="100">
          <template slot-scope="scope">
            <span> </span>
          </template>
        </el-table-column>
        <el-table-column label="初次" width="100">
          <template slot-scope="scope">
            <span> </span>
          </template>
        </el-table-column>
        <el-table-column label="最后一次" width="100">
          <template slot-scope="scope">
            <span> </span>
          </template>
        </el-table-column>
      </el-table> -->
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["name", "namespace"],
  data() {
    return {
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
      .dispatch("jobs/getJobByNameAndNamespace", nameAndNamespace)
      .then((res) => {
        console.log(res);
        this.job = res.data;
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