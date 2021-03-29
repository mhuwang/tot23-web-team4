<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-25 22:13:37
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-28 22:04:29
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
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="6.3"
                    stroke-linecap="square"
                    stroke-color="#ffd880"
                  >
                    <div class="demo-Circle-custom">
                      <h2>6.3%</h2>
                      <span> Requests </span>
                      <p>Cores: 0.25</p>
                    </div>
                  </i-circle>
                </ListItem>
                <ListItem class="my-list-item">
                  <i-circle
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="12.5"
                    stroke-linecap="square"
                    stroke-color="#ffd880"
                  >
                    <div class="demo-Circle-custom">
                      <h2>12.5%</h2>
                      <span> Limits </span>
                      <p>Cores: 0.5</p>
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
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="0.4"
                    stroke-linecap="square"
                    stroke-color="#95e1d3"
                  >
                    <div class="demo-Circle-custom">
                      <h2>0.4%</h2>
                      <span> Requests </span>
                      <p>MiB: 64</p>
                    </div>
                  </i-circle>
                </ListItem>
                <ListItem class="my-list-item">
                  <i-circle
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="0.8"
                    stroke-linecap="square"
                    stroke-color="#95e1d3"
                  >
                    <div class="demo-Circle-custom">
                      <h2>0.8%</h2>
                      <span> Limits </span>
                      <p>MiB: 128</p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- pod 信息 -->
          <el-col :span="4" :offset="1">
            <Card class="my-card">
              <p slot="title">Pod</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem class="my-list-item">
                  <i-circle
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="6.3"
                    stroke-linecap="square"
                    stroke-color="#b4aee8"
                  >
                    <div class="demo-Circle-custom">
                      <h2>6.3%</h2>
                      <span> Requests </span>
                      <p>Cores: 0.25</p>
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
      <List item-layout="horizontal" :split="false">
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
      </List>
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
        <div class="metadata-item">
          <p>kube-proxy 版本</p>
          <span>{{ node.status.nodeInfo.kubeProxyVersion }}</span>
        </div>
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
  </div>
</template>

<script>
export default {
  name: "NodeDetails",
  data() {
    return {
      trailWidth: 5,
      strokeWidth: 5,
    };
  },
  computed: {
    node() {
      get: {
        return this.$store.state.nodes.nodeDetails;
      }
    },

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
    annotations(){
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
    addressess(){
      let addrArr = [];
      // console.log(this.node.status.addresses[0].type);
      for (let addr in this.node.status.addresses) {
        
        addrArr.push({
          key: this.node.status.addresses[addr].type,
          value: this.node.status.addresses[addr].address,
        });
      }
      return addrArr;
    }
  },
  mounted: function () {
    window.addEventListener("unload", this.saveNodeInfo);
  },
  created: function () {
    if (this.$store.state.nodes.nodeDetails.name == undefined) {
      this.node = sessionStorage.getItem("nodeDetails");
    }
  },
  methods: {
    saveNodeInfo() {
      sessionStorage.setItem(
        "nodeDetails",
        this.$store.state.nodes.nodeDetails
      );
    },
  },
};
</script>

<style lang="scss" scoped>
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