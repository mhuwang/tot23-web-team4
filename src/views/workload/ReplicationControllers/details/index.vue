<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-15 22:46:38
-->

<template>
  <div>
    <!-- 标题 -->
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{ replicationController.metadata.name }}
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
          <span>{{ replicationController.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ replicationController.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            replicationController.metadata.creationTimestamp.replaceAll(
              /[TZ]/g,
              " "
            )
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ replicationController.metadata.uid }}</span>
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
      <div
        :labels="this.selectorLabel"
        v-if="labels.length > 0"
        class="metadata-item"
      >
        <p>选择标签</p>
        <li v-for="label in labels" :key="label">
          <el-tag class="lebel-tag" effect="dark" size="medium" color="#bedcfa"
            >{{ label.key }}: {{ label.value }}</el-tag
          >
        </li>
      </div>
      <br />
      <div class="metadata-item">
        <p>镜像</p>
        <li v-for="image in this.images" :key="image">
          <el-tag
            class="lebel-tag"
            effect="dark"
            size="medium"
            color="#bedcfa"
            >{{ image }}</el-tag
          >
        </li>
      </div>
    </el-card>
    <br /><br />

    <!-- Pods 状态 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">Pods 状态</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>启动中</p>
          <span>{{ this.pendingPods }}</span>
        </div>
        <div class="metadata-item">
          <p>运行中</p>
          <span>{{ this.runningPods }}</span>
        </div>
        <div class="metadata-item" v-if="replicationController.spec.replicas">
          <p>期望</p>
          <span>{{ replicationController.spec.replicas }}</span>
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
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom: 5px"
              size="small"
              @click="showPodEditDialog(scope.row.name, scope.row.namespace)"
              >编辑</el-button
            >
            <br />
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

    <!-- Services 列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">Services 列表</span>
      </div>
      <el-table
        :data="services"
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
      >
        <el-table-column prop="metadata.name" label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/ExploreBalancing/services/' + scope.row.metadata.name"
              @click.native="
                goToServicesDetails(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                )
              "
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
        <el-table-column prop="spec.type" label="类型"> </el-table-column>
        <el-table-column label="创建时间" width="300">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom: 5px"
              size="small"
              @click="
                showServiceEditDialog(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                )
              "
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="
                delService(
                  scope.row.metadata.name,
                  scope.row.metadata.namespace
                )
              "
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
      <el-table
        :data="services"
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
      >
        未找到资源
      </el-table>
    </el-card>
    <br /><br />

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
        <el-button @click="annoDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>

    <!-- Pod 编辑框 -->
    <el-dialog
      title="编辑 pod"
      :visible.sync="podEditDialogVisible"
      width="70%"
      @closed="handleClose"
      @close="podEditDialogVisible = false"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <el-tabs value="first" type="card">
        <el-tab-pane label="YAML" name="first">
          <codemirror
            :value="codeYaml"
            :options="cmOptionsYaml"
            @ready="onYamlCmReady"
            @input="onYamlCmCodeChange"
          />
        </el-tab-pane>
        <el-tab-pane label="JSON" name="second">
          <codemirror
            ref="cmYamlEditor"
            :value="codeJSON"
            :options="cmOptions"
            @ready="onJSONCmReady"
            @input="onJSONCmCodeChange"
          />
        </el-tab-pane>
      </el-tabs>

      <!-- <textarea style="width:100%" name="describe" id="pod" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="podEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitYamlChange">确 定</el-button>
      </span>
    </el-dialog>

    <!-- Service 编辑框 -->
    <el-dialog
      title="编辑 service"
      :visible.sync="serviceEditDialogVisible"
      width="70%"
      @closed="serviceHandleClose"
      @close="serviceEditDialogVisible = false"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <el-tabs value="first" type="card">
        <el-tab-pane label="YAML" name="first">
          <codemirror
            :value="codeYaml"
            :options="cmOptionsYaml"
            @ready="onYamlCmReady"
            @input="onYamlCmCodeChange"
          />
        </el-tab-pane>
      </el-tabs>

      <!-- <textarea style="width:100%" name="describe" id="service" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="serviceEditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitYamlChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/yaml/yaml.js";
// import theme style
import "codemirror/theme/panda-syntax.css";

export default {
  props: ["name", "namespace"],
  data() {
    return {
      replicationController: {},
      replicationControllerStatus: {},
      replicationControllerName: "",
      replicationControllerNamespace: "",
      annoKey: "",
      annoDialogVisible: false,
      annoDetails: "",
      loading: true,
      podEditDialogVisible: false,
      serviceEditDialogVisible: false,
      codeYaml: "",
      podAddYaml: "", // 添加框的 yaml 数据

      cmOptions: {
        // json codemirror 配置项
        tabSize: 4,
        mode: {
          name: "javascript",
          json: true,
        },
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
      cmOptionsYaml: {
        // yaml codemirror 配置项
        tabSize: 4,
        mode: "yaml",
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
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
      // name: sessionStorage.getItem("replicaSetName"),
      // namespace: sessionStorage.getItem("replicaSetNamespace"),
      name: this.name.split(",")[0],
      namespace: this.name.split(",")[1],
    };
    console.log(nameAndNamespace, "in details");
    this.$store
      .dispatch(
        "replicationControllers/getReplicationControllerResources",
        nameAndNamespace
      )
      .then((res) => {
        console.log(res);
        this.replicationController = res.dataReplicationController;
        this.pods = res.dataPods;
        this.services = res.dataServices;
        // this.replicationControllerStatus = res.data.status.conditions;
        this.loading = false;
        // console.log(this.replicationControllerStatus)
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.replicationController.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.replicationController.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.replicationController.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.replicationController.metadata.annotations[anno],
        });
      }
      return annoArr;
    },

    selectorLabel() {
      let labelArr = [];
      for (let pro in this.replicationController.spec.selector) {
        labelArr.push({
          key: pro,
          value: this.replicationController.spec.selector[pro],
        });
      }
      return labelArr;
    },

    // replicationController 的镜像
    images() {
      let imagesList = [];
      for (
        let i = 0;
        i < this.replicationController.spec.template.spec.containers.length;
        i++
      ) {
        imagesList.push(
          this.replicationController.spec.template.spec.containers[i].image
        );
      }
      return imagesList;
    },

    //运行中 Pods
    runningPods() {
      let amount = 0;
      for (let i in this.pods) {
        switch (this.pods[i].phase) {
          case "Running":
            amount += 1;
            break;
        }
      }
      return amount;
    },

    //启动中 Pods
    pendingPods() {
      let amount = 0;
      for (let i in this.pods) {
        switch (this.pods[i].phase) {
          case "Pending":
            amount += 1;
            break;
        }
      }
      return amount;
    },
  },

  methods: {
    // 注释长度大于50时显示注释细节
    showAnnoDetails: function (key) {
      this.annoDialogVisible = true;
      this.annoKey = key;
      this.annoDetails = this.beautify(
        this.replicationController.metadata.annotations[key],
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

    /* 编辑部分 Pod 和 Service*/
    showPodEditDialog(name, namespace) {
      let podDetails = {
        podName: name,
        podNamespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch("pods/getPodYamlByNameAndNamespace", podDetails)
        .then((res) => {
          // let json = JSON.stringify(res.data);
          // this.codeJSON = this.beautify(json, {
          //   indent_size: 4,
          //   space_in_empty_paren: true,
          // });
          console.log(res, "\n最初获取的Yaml\n");
          this.codeYaml = res.data;
          this.podEditDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });

      // json 格式
      this.$store
        .dispatch("pods/getPodByNameAndNamespace", podDetails)
        .then((res) => {
          // console.log(res);
          let json = JSON.stringify(res.data.pod);
          this.codeJSON = this.beautify(json, {
            indent_size: 4,
            space_in_empty_paren: true,
          });
        })
        .catch((error) => {
          throw error;
        });

      //this.editForm = res; // 查询结果写入表单
    },
    showServiceEditDialog(name, namespace) {
      let serviceDetails = {
        serviceName: name,
        serviceNamespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch("services/getServiceYamlByNameAndNamespace", serviceDetails)
        .then((res) => {
          this.codeYaml = res.data;
          this.serviceEditDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });
        
      // json 格式
      this.$store
        .dispatch("services/getServiceByNameAndNamespace", serviceDetails)
        .then((res) => {
          // console.log(res);
          let json = JSON.stringify(res.data.service);
          this.codeJSON = this.beautify(json, {
            indent_size: 4,
            space_in_empty_paren: true,
          });
        })
        .catch((error) => {
          throw error;
        });

      //this.editForm = res; // 查询结果写入表单
    },

    // 编辑器方法
    /* yaml */
    onYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },
    onYamlCmCodeChange(newCode) {
      this.codeYaml = newCode;
    },

    // 提交修改
    commitYamlChange() {
      console.log("提交修改的 yaml", this.codeYaml);
      this.$confirm("确认修改？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeResourceByYaml", this.codeYaml)
            .then((res) => {
              switch (res.code) {
                case 1200:
                  this.$message.success("修改成功");
                  break;
                case 1201:
                  this.$message.error("修改失败，请查看 yaml 文件格式");
                  break;
                case 1202:
                  this.$message.error("创建失败，请查看云平台相关错误信息");
                  break;
                default:
                  this.$message.info("提交成功");
                  break;
              }
              this.podEditDialogVisible = false;
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },

    // 关闭添加或者修改框
    podHandleClose: function () {
      this.podAddYaml = "";
      setTimeout(() => {
        this.codemorror.refresh();
      }, 1);
    },

    /* 删除 Pod 和 Service*/
    delPod: function (name, namespace) {
      this.$confirm("确认删除 pod？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let podDetails = {
            podName: name,
            podNamespace: namespace,
          };
          this.$store
            .dispatch("pods/delPodByNameAndNamespace", podDetails)
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success("删除成功");
                // this.getPods();
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {});
    },
    delService: function (name, namespace) {
      this.$confirm("确认删除 service？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let serviceDetails = {
            serviceName: name,
            serviceNamespace: namespace,
          };
          this.$store
            .dispatch("services/delServiceByNameAndNamespace", serviceDetails)
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success("删除成功");
                this.getServices();
              } else {
                this.$message.error("删除失败");
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {});
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