<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-04-02 13:11:07
 * @LastEditors: Bernie
 * @LastEditTime: 2021-04-10 16:52:11
-->

<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">{{
        node.metadata.name
      }}</span></el-divider
    >
    <!-- 分配信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">分配信息</span>
      </div>
      <div>
        <el-row>
          <!-- cpu 信息 -->
          <el-col :span="8">
            <Card class="my-card">
              <p slot="title">CPU</p>
              <List
                class="my-list"
                item-layout="horizontal"
                :split="false"
                size="large"
              >
                <ListItem class="my-list-item">
                  <i-circle
                    :size="150"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="6.3"
                    stroke-linecap="square"
                    stroke-color="#ffd880"
                  >
                    <div class="demo-Circle-custom">
                      <h2>6.3%</h2>
                      <span> Requests </span>
                      <p>Cores: {{ node.status.allocatable.cpu.amount }}</p>
                    </div>
                  </i-circle>
                </ListItem>
                <ListItem class="my-list-item">
                  <i-circle
                    :size="150"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="12.5"
                    stroke-linecap="square"
                    stroke-color="#ffd880"
                  >
                    <div class="demo-Circle-custom">
                      <h2>12.5%</h2>
                      <span> Limits </span>
                      <p>Cores: {{ node.status.allocatable.cpu.amount }}</p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- 内存信息 -->
          <el-col :span="8" :offset="1">
            <Card class="my-card">
              <p slot="title">内存</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem class="my-list-item">
                  <i-circle
                    :size="150"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="0.4"
                    stroke-linecap="square"
                    stroke-color="#95e1d3"
                  >
                    <div class="demo-Circle-custom">
                      <h2>0.4%</h2>
                      <span> Requests </span>
                      <p>
                        GiB:
                        {{
                          (
                            node.status.allocatable.memory.amount /
                            1024 /
                            1024
                          ).toFixed(2)
                        }}
                      </p>
                    </div>
                  </i-circle>
                </ListItem>
                <ListItem class="my-list-item">
                  <i-circle
                    :size="150"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="0.8"
                    stroke-linecap="square"
                    stroke-color="#95e1d3"
                  >
                    <div class="demo-Circle-custom">
                      <h2>0.8%</h2>
                      <span> Limits </span>
                      <p>
                        GiB:
                        {{
                          (
                            node.status.allocatable.memory.amount /
                            1024 /
                            1024
                          ).toFixed(2)
                        }}
                      </p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- pod 信息 -->
          <el-col :span="6" :offset="1">
            <Card class="my-card">
              <p slot="title">Pod</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem class="my-list-item">
                  <i-circle
                    :size="150"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="
                      (
                        (podsAmount / node.status.allocatable.pods.amount) *
                        100
                      ).toFixed(2)
                    "
                    stroke-linecap="square"
                    stroke-color="#b4aee8"
                  >
                    <div class="demo-Circle-custom">
                      <h2>
                        {{
                          (
                            (podsAmount / node.status.allocatable.pods.amount) *
                            100
                          ).toFixed(2)
                        }}
                        %
                      </h2>
                      <span> Requests </span>
                      <p>Pods: {{ podsAmount }}</p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br /><br />
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{ node.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            node.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ node.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>标签</p>
          <li v-for="label in this.labels">
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
          <li v-for="anno in this.annotations">
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
          <p>地址</p>
          <li v-for="address in this.addressess">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ address.key }}: {{ address.value }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br /><br />
    <!-- 系统信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">系统信息</span>
      </div>
      <!-- <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>机器 ID</p>
          <span>{{ node.status.nodeInfo.machineID }}</span>
        </div>
        <div class="metadata-item">
          <p>系统 UUID</p>
          <span>{{ node.status.nodeInfo.systemUUID }}</span>
        </div>
        <div class="metadata-item">
          <p>启动 ID</p>
          <span>{{ node.status.nodeInfo.bootID }}</span>
        </div>
      </List> -->
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>内核版本</p>
          <span>{{ node.status.nodeInfo.kernelVersion }}</span>
        </div>
        <div class="metadata-item">
          <p>操作系统镜像</p>
          <span>{{ node.status.nodeInfo.osImage }}</span>
        </div>
        <div class="metadata-item">
          <p>容器运行时版本</p>
          <span>{{ node.status.nodeInfo.containerRuntimeVersion }}</span>
        </div>
        <div class="metadata-item">
          <p>kubelet 版本</p>
          <span>{{ node.status.nodeInfo.kubeletVersion }}</span>
        </div>
        <!-- <div class="metadata-item">
          <p>kube-proxy 版本</p>
          <span>{{ node.status.nodeInfo.kubeProxyVersion }}</span>
        </div> -->
        <div class="metadata-item">
          <p>操作系统</p>
          <span>{{ node.status.nodeInfo.operatingSystem }}</span>
        </div>
        <div class="metadata-item">
          <p>架构</p>
          <span>{{ node.status.nodeInfo.architecture }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />
    <!-- 状态信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">状态</span>
      </div>
      <el-table :data="node.status.conditions" style="width: 100%" stripe>
        <el-table-column prop="type" label="类别"> </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>

        <el-table-column label="最后检测时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastHeartbeatTime.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后迁移时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastTransitionTime.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="原因"> </el-table-column>
        <el-table-column prop="message" label="信息"> </el-table-column>
      </el-table>
    </el-card>
    <br /><br />
    <!-- pod 信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Pod</span>
      </div>
      <!-- <el-row :gutter="20">
        <el-col :span="5">
          搜索区域
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
          搜索按钮
            <el-button
              slot="append"
              size="large"
              icon="el-icon-plus"
              @click="getPods"
            ></el-button> 
        </el-col>
        添加按钮
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
      </el-row> -->
      <el-table :data="pods" style="width: 100%" stripe>
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
        <el-table-column label="名字">
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
        <!-- <el-table-column align="center" label="CPU 利用率" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.usage">
              <div class="usage-cpu-tag-zero" v-if="scope.row.usage.cpu < 0.1">
                0 m
              </div>
              <div class="usage-cpu-tag-success" v-else>
                {{ (scope.row.usage.cpu / 1000 / 1000).toFixed(2) }} m
              </div>
            </div>

            <div class="usage-cpu-tag-failed" v-else>--</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="内存利用率" width="140">
          <template slot-scope="scope">
            <div v-if="scope.row.usage">
              <div
                class="usage-memory-tag-zero"
                v-if="scope.row.usage.memory == 0"
              >
                0 MiB
              </div>
              <div class="usage-memory-tag-success" v-else>
                {{ (scope.row.usage.memory / 1024).toFixed(2) }} MiB
              </div>
            </div>

            <div class="usage-memory-tag-failed" v-else>--</div>
          </template>
        </el-table-column> -->
        <el-table-column prop="nodeName" width="120" label="所属节点">
        </el-table-column>
        <el-table-column prop="podIP" width="120" label="主机ip地址">
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
              style="margin-bottom: 5px"
              size="small"
              @click="showClasterRolesEditDialog(scope.row.pod)"
              >编辑</el-button
            >
            <br />
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
  name: "NodeDetails",
  data() {
    return {
      trailWidth: 5,
      strokeWidth: 5,
      usage: [],
      pods: [],
      nodeName: "",
      node: {},
      podsAmount: 0,
    };
  },

  mounted: function () {
    // 为空，直接存储
    if (sessionStorage.getItem("nodeName") == null) {
      sessionStorage.setItem("nodeName", this.$store.state.edge.nodeName);
      this.nodeName = this.$store.state.edge.nodeName;
    }
    // 不为空，且当前 nodeName 有值，同时和之前的不一样，更新 nodeName
    else if (
      this.$store.state.edge.nodeName != "" &&
      sessionStorage.getItem("nodeName") != this.$store.state.edge.nodeName
    ) {
      sessionStorage.setItem("nodeName", this.$store.state.edge.nodeName);
      this.nodeName = this.$store.state.edge.nodeName;
    }
    this.$store
      .dispatch("edge/getNodeByName", sessionStorage.getItem("nodeName"))
      .then((res) => {
        this.node = res.data;
        // 获取近20分钟的 cpu 和内存使用率进行画图
      })
      .catch((error) => {
        throw error;
      });

    // 获取当前节点下的所有 pod 数据
    this.$store
      .dispatch("pods/getPodsByNode", sessionStorage.getItem("nodeName"))
      .then((res) => {
        console.log(res);
        this.pods = res.data;

        this.podsAmount = res.data.length;
      })
      .catch((error) => {
        throw error;
      });
  },
  created: function () {
    window.addEventListener("unload", this.saveNodeInfo);
    // console.log(sessionStorage.getItem("nodeName"));
    // if(sessionStorage.getItem("nodeName" == null)){
    //   console.log(this.$store.state.nodes.nodeName);
    //   console.log("aaa");
    // }
    //   console.log("bbb");
    // this.nodeName = this.$store.state.nodes.nodeName;
  },
  methods: {
    saveNodeInfo() {
      alert("RELOAD", this.nodeName);
      sessionStorage.setItem("nodeName");
    },
    // 前往 pods 详情页
    goToPodsDetails(name, namespace) {
      let podDetails = {
        podName: name,
        podNamespace: namespace,
      };
      this.$store.dispatch("pods/toDetails", podDetails);
    },
  },
  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.node.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.node.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.node.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.node.metadata.annotations[anno],
        });
      }
      return annoArr;
    },

    // 资源信息下的地址
    addressess() {
      let addrArr = [];
      // console.log(this.node.status.addresses[0].type);
      for (let addr in this.node.status.addresses) {
        addrArr.push({
          key: this.node.status.addresses[addr].type,
          value: this.node.status.addresses[addr].address,
        });
      }
      return addrArr;
    },
  },
};
</script>

<style lang="scss" scoped>
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
