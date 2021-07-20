<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: Bernie
 * @LastEditTime: 2021-07-20 11:39:03
-->

<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{ service.metadata.name }}
      </span></el-divider
    >
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名称</p>
          <span>{{ service.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            service.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ service.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div v-if="labels.length > 0" class="metadata-item">
          <p>标签</p>
          <li v-for="(label, index) in this.labels" :key="index">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div v-if="annotations.length > 0" class="metadata-item">
          <p>注释</p>
          <li v-for="(anno, index) in this.annotations" :key="index">
            <el-tag
              class="lebel-tag"
              id="anno_hover"
              effect="dark"
              size="medium"
              color="#bedcfa"
              style="color: #409eff"
              @click="showAnnoDetails(anno.key)"
              >{{ anno.key }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br />
    <br />

    <!-- 资源信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">资源信息</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>类型</p>
          <span>{{ service.spec.type }}</span>
        </div>
        <div class="metadata-item">
          <p>集群 IP</p>
          <span>{{ service.spec.clusterIP }}</span>
        </div>
        <div class="metadata-item">
          <p>会话亲和力</p>
          <span>{{ service.spec.sessionAffinity }}</span>
        </div>
      </List>
      <!-- Selector 部分 -->
      <List item-layout="horizontal" :split="false">
        <div v-if="selectors.length > 0" class="metadata-item">
          <p>选择器</p>
          <li v-for="(select, index) in selectors" :key="index">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ select.key }}: {{ select.value }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br />
    <!-- Endpoint -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">端点</span>
      </div>
      <el-table
        v-if="endpoint.subsets.length > 0"
        :data="endpoint.subsets[0].addresses"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="ip" label="服务 ip" width="240">
        </el-table-column>
        <el-table-column label="端口信息(名称，端口，协议)" width="540">
          <template>
            &lt;{{ endpoint.subsets[0].ports[0].name }}&gt; ­&shy; &lt;{{
              endpoint.subsets[0].ports[0].port
            }}&gt; ­&shy; &lt;{{ endpoint.subsets[0].ports[0].protocol }}&gt;
          </template>
        </el-table-column>
        <el-table-column prop="nodeName" label="节点" width="300">
        </el-table-column>
        <el-table-column label="是否就绪" width="300"> 是 </el-table-column>
      </el-table>
      <p v-else style="font-size: 14px; color: #909399" align="center" >暂无数据</p>
    </el-card>
    <br /><br />

    <!-- Pods -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>容器组</span>
      </div>
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
        <el-table-column prop="name" label="名称">
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
              @click="delClasterRoles(scope.row.pod)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br /><br />
    <!-- Events -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">事件</span>
      </div>
      <el-table :data="event" style="width: 100%" stripe>
        <el-table-column prop="message" label="信息" width="480">
        </el-table-column>
        <el-table-column prop="source.component" label="资源" width="180">
        </el-table-column>
        <el-table-column prop="reason" label="子对象" width="180">
        </el-table-column>
        <el-table-column prop="count" label="发生次数" width="120">
        </el-table-column>
        <el-table-column label="第一次出现时间" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.firstTimestamp.replaceAll(/[TZ]/g, " ") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后一次出现时间" width="240">
          <template slot-scope="scope">
            <span>{{ scope.row.lastTimestamp.replaceAll(/[TZ]/g, " ") }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
       <!-- <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination> -->
    </el-card>

    <!-- 注释的详情框 -->
    <el-dialog
      :title="annoKey"
      :visible.sync="annoDetailsVisible"
      width="50%"
      :modal="false"
    >
      <highlightjs javascript :code="annoDetails" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="annoDetailsVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["name", "namespace"],
  data() {
    return {
      service: {},
      serviceName: "",
      serviceNamespace: "",
      endpoint: {},
      event: [],
      pods: [],
      podsAmount: 0,

      annoKey: "",
      annoDetails: "",
      annoDetailsVisible: false, // 注释的详情框
    };
  },

  // 生命周期方法
  mounted: function () {
    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("serviceName") == null) {
      sessionStorage.setItem(
        "serviceName",
        this.$store.state.services.service.serviceName
      );
      this.serviceName = this.$store.state.services.service.serviceName;
    }
    // 不为空，且当前 serviceName 有值，同时和之前的不一样，更新 serviceName
    else if (
      this.$store.state.services.service.serviceName != "" &&
      sessionStorage.getItem("serviceName") !=
        this.$store.state.services.service.serviceName
    ) {
      sessionStorage.setItem(
        "serviceName",
        this.$store.state.services.service.serviceName
      );
      this.serviceName = this.$store.state.services.service.serviceName;
    }

    /* namespace */
    // 为空，直接存储
    if (sessionStorage.getItem("serviceNamespace") == null) {
      sessionStorage.setItem(
        "serviceNamespace",
        this.$store.state.services.service.serviceNamespace
      );
      this.serviceNamespace = this.$store.state.services.service.serviceNamespace;
    }
    // 不为空，且当前 serviceNamespace 有值，同时和之前的不一样，更新 serviceNamespace
    else if (
      this.$store.state.services.service.serviceNamespace != "" &&
      sessionStorage.getItem("serviceNamespace") !=
        this.$store.state.services.service.serviceNamespace
    ) {
      sessionStorage.setItem(
        "serviceNamespace",
        this.$store.state.services.service.serviceNamespace
      );
      this.serviceNamespace = this.$store.state.services.service.serviceNamespace;
    }

    // 获取数据
    let svc = {
      name: sessionStorage.getItem("serviceName"),
      namespace: sessionStorage.getItem("serviceNamespace"),
      //   name: this.name.split(',')[0],
      //   namespace: this.name.split(',')[1],
    };

    let lab = {
      key: sessionStorage.getItem("labelKey"),
      value: sessionStorage.getItem("labelValue"),
    };
    this.$store
      .dispatch("services/getServicesByNameAndNamespace", svc)
      .then((res) => {
        console.log(res);
        this.service = res.data.service;
        this.endpoint = res.data.endpoints;
        this.pods = res.data.pods;
        this.event.push(res.data.event);
      })
      .catch((error) => {
        throw error;
      });
  },

  methods: {
    // // 处理分页
    // handleCurrentChange(page) {
    //   console.log(page);
    //   this.event = this.events.slice((page - 1) * 10, page * 10);
    // },

    // 显示注解的详情
    showAnnoDetails(key) {
      this.annoDetailsVisible = true;
      console.log(key);
      this.annoKey = key;
      this.annoDetails = this.beautify(this.service.metadata.annotations[key], {
        indent_size: 2,
        space_in_empty_paren: true,
      });
    },
    // 前往 pod 详情页
    goToPodsDetails: function (name, namespace) {
      console.log("aaa", name, namespace);
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
      for (let pro in this.service.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.service.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.service.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.service.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
    //spec下的selector
    selectors() {
      let selArr = [];
      for (let anno in this.service.spec.selector) {
        selArr.push({
          key: anno,
          value: this.service.spec.selector[anno],
        });
      }
      return selArr;
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