<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-15 22:42:04
-->

<template>
  <div>
    <!-- 标题 -->
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{ deployment.metadata.name }}
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
          <span>{{ deployment.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ deployment.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            deployment.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ deployment.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div
          :labels="this.labels"
          v-if="labels.length > 0"
          class="metadata-item"
        >
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
        <div
          :annotations="this.annotations"
          v-if="annotations.length > 0"
          class="metadata-item"
        >
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
          <p>策略</p>
          <span>{{ deployment.spec.strategy.type }}</span>
        </div>
        <div class="metadata-item">
          <p>最小准备秒数</p>
          <span v-if="deployment.spec.minReadySeconds">{{
            deployment.spec.minReadySeconds
          }}</span>
          <span v-else>0</span>
        </div>
        <div class="metadata-item">
          <p>调整历史记录限制</p>
          <span>{{ deployment.spec.revisionHistoryLimit }}</span>
        </div>
      </List>
      <!-- 选择部分 -->
      <div class="metadata-item">
        <p>标签选择</p>
        <li v-for="matchLabel in this.matchLabels" :key="matchLabel">
          <el-tag class="lebel-tag" effect="dark" size="medium" color="#bedcfa"
            >{{ matchLabel.key }}:{{ matchLabel.value }}</el-tag
          >
        </li>
      </div>
    </el-card>
    <br /><br />

    <!-- 滚动更新策略 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">滚动更新策略</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>最多超出数</p>
          <span>{{ deployment.spec.strategy.rollingUpdate.maxSurge.strVal }}</span>
        </div>
        <div class="metadata-item">
          <p>最多不可用数</p>
          <span>{{deployment.spec.strategy.rollingUpdate.maxUnavailable.strVal}}</span>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- Pods 状态 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">Pods 状态</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item" v-if="deployment.status.updatedReplicas">
          <p>已更新</p>
          <span>{{ deployment.status.updatedReplicas }}</span>
        </div>
        <div class="metadata-item" v-if="deployment.status.replicas">
          <p>总计</p>
          <span>{{deployment.status.replicas}}</span>
        </div>
        <div class="metadata-item" v-if="deployment.status.availableReplicas">
          <p>可用</p>
          <span>{{ deployment.status.availableReplicas }}</span>
        </div>
        <div class="metadata-item" v-if="deployment.status.unavailableReplicas">
          <p>不可用</p>
          <span>{{deployment.status.unavailableReplicas}}</span>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- Deployment 状态 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Deployment 状态</span>
      </div>
      <el-table
        :data="deploymentStatus"
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
      >
        <el-table-column align="center" prop="type" label="类别" width="130"></el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="130"> </el-table-column>
        <el-table-column align="center" label="最后的检测时间" width="180">
          <template slot-scope="scope">
            {{scope.row.lastUpdateTime.replaceAll(/[TZ]/g, " ")}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="lastTransitionTime" label="最后的迁移时间" width="180">
          <template slot-scope="scope">
            {{scope.row.lastTransitionTime.replaceAll(/[TZ]/g, " ")}}
          </template>
        </el-table-column>
        <el-table-column prop="reason" align="center" label="原因" width="250"> </el-table-column>
        <el-table-column align="center" prop="message"  label="信息"></el-table-column>
      </el-table>
    </el-card>

    <!-- 新 Replica Set -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">新副本控制器</span>
      </div>
    </el-card>
    <br/><br/>

    <!-- 旧 Replica Set -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px"> 旧副本控制器</span>
      </div>
    </el-card>
    <br/><br/>

    <!-- Pod 水平自动伸缩 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px"> Pod 水平自动伸缩</span>
      </div>
    </el-card>
    <br/><br/>

    <!-- 活动 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px"> 活动</span>
      </div>
    </el-card>
    <br/><br/>

    <!-- anno 详情 -->
    <el-dialog
      :title="annoKey"
      :visible.sync="annoDialogVisible"
      width="50%"
      @close="annohandleClose"
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
  props: ["name", "namespace"],
  data() {
    return {
      deployment: {},
      deploymentStatus: {},
      deploymentName: "",
      deploymentNamespace: "",
      annoKey: "",
      annoDialogVisible: false,
      annoDetails: "",
      loading: true,
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
    let dep = {
      // name: sessionStorage.getItem("deploymentName"),
      // namespace: sessionStorage.getItem("deploymentNamespace"),
      name: this.name.split(",")[0],
      namespace: this.name.split(",")[1],
    };
    this.$store
      .dispatch("deployments/getDeploymentByNameAndNamespace", dep)
      .then((res) => {
        console.log(res);
        this.deployment = res.data;
        this.deploymentStatus = res.data.status.conditions;
        this.loading = false;
        console.log(this.deploymentStatus)
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.deployment.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.deployment.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.deployment.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.deployment.metadata.annotations[anno],
        });
      }
      return annoArr;
    },

    // Deplotment 的选择标签
    matchLabels() {
      let matchLabelsList = [];
      for (let i in this.deployment.spec.selector.matchLabels) {
        matchLabelsList.push({
          key: i,
          value: this.deployment.spec.selector.matchLabels[i],
        });
      }
      return matchLabelsList;
    },
  },

  methods: {
    // 注释长度大于50时显示注释细节
    showAnnoDetails: function (key) {
      this.annoDialogVisible = true;
      this.annoKey = key;
      this.annoDetails = this.beautify(
        this.deployment.metadata.annotations[key],
        {
          indent_size: 2,
          space_in_empty_paren: true,
        }
      );
      // console.log(this.deployment.metadata.annotations[key]);
    },
    // 注释框关闭时执行
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

// 底部命令提示信息
.foot-info {
  position: absolute;
  margin-bottom: 5px;
  padding: 5px 5px;
  background-color: #ccc;
  left: 0%;
  color: #606266;
  font-size: 15px;
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
.usage-cpu-tag-zero,
.usage-memory-tag-zero {
  color: white;
  text-align: center;
  background-color: #aaa;
  border-radius: 10px;
}
.usage-cpu-tag-failed,
.usage-memory-tag-failed {
  color: #333;
  text-align: center;
  border-radius: 10px;
}
#anno_hover:hover {
  cursor: pointer;
}
</style>