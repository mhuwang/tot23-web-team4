<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-15 13:42:52
-->
<template>
  <div>
    <!-- <el-divider style="font-size:40px" content-position="left">集群信息</el-divider> -->
    <!-- 节点信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">节点信息</span>
      </div>
      <el-table :data="nodes" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status == 'True'
                  ? 'load-success'
                  : scope.row.status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="名字" width="120">
          <template slot-scope="scope">
            <router-link
              :to="'/summary/nodes/' + scope.row.name"
              @click.native="goToNodeDetails(scope.row.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status" width="100" label="准备就绪">
        </el-table-column>
        <el-table-column label="CPU 利用率" width="200">
          <template slot-scope="scope">
            <el-progress
              class="my-progress"
              color="#fc8621"
              :text-inside="true"
              :stroke-width="20"
              :percentage="scope.row.cpuUsage.toFixed(2) * 1"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column label="内存利用率" width="200">
          <template slot-scope="scope">
            <el-progress
              class="my-progress"
              color="#c24914"
              :text-inside="true"
              :stroke-width="20"
              :percentage="scope.row.memoryUsage.toFixed(2) * 1"
            ></el-progress>
          </template>
        </el-table-column>

        <el-table-column
          prop="node.metadata.creationTimestamp"
          label="创建时间"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.time.replaceAll(/[TZ]/g, " ") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否可调度" width="100">
          <!-- 作用域插槽 -->
          <template slot-scope="scope">
            <!-- {{scope.row}} 每一行封存的数据 -->
            <el-switch
              v-model="scope.row.schedule"
              @change="changeSchedule(scope.row.name)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNodeEditDialog(scope.row.name)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNode(scope.row.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br />
    <!-- 命名空间 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">命名空间</span>
      </div>
      <el-table :data="namespaces" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.phase == 'Active'
                  ? 'load-success'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column>
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/summary/namespaces/' + scope.row.metadata.name"
              @click.native="goToNamespacesDetails(scope.row)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status.phase" label="运行阶段">
        </el-table-column>
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="创建时间">
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
              @click="showNamespaceEditDialog(scope.row.metadata.name)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNamespace(scope.row.metadata.name)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br />
    <!-- 集群角色 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">集群角色</span>
      </div>
      <el-table :data="clusterRoles" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.phase == 'Active'? 'load-success': 'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/summary/clusterRoles/' + scope.row.metadata.name"
              @click.native="goToClusterRolesDetails(scope.row)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="status.phase" label="运行阶段"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column>
        <el-table-column prop="spec.nodeName" label="所属节点"> </el-table-column>
        <el-table-column prop="status.podIP" label="主机ip地址"> </el-table-column> -->
        <el-table-column label="创建时间">
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
              size="small"
              @click="showClusterRolesEditDialog(scope.row.metadata.name)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delClusterRoles(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑框 Node -->
    <el-dialog
      title="编辑 Node"
      :visible.sync="editDialogVisible"
      width="70%"
      @closed="handleClose"
      @close="editDialogVisible = false"
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

      <!-- <textarea style="width:100%" name="describe" id="pod" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitYamlChange">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑框 Namespace-->
    <el-dialog
      title="编辑 namespace"
      :visible.sync="editDialogVisible"
      width="70%"
      @closed="handleClose"
      @close="editDialogVisible = false"
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

      <!-- <textarea style="width:100%" name="describe" id="ingress" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="editDialogVisible = false">取 消</el-button>
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
  components: {},
  data() {
    return {
      nodes: [],
      namespaces: [],
      clusterRoles: [],
      editDialogVisible: false,
      codeYaml: "", // 编辑框的 yaml 数据

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

  // 初始化方法
  created: function () {
    this.getAllNodes();
    this.getAllNamespaces();
    this.getAllClusterRoles();
  },

  methods: {
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

    // 获取 node 节点详情页
    goToNodeDetails: function (nodeName) {
      this.$store.dispatch("nodes/toDetails", nodeName);
    },
    // 获取命名空间详情页
    goToNamespacesDetails: function (namespaceDetails) {
      this.$store.dispatch("namespaces/toDetails", namespaceDetails);
    },
    // 获取集群角色详情页
    goToNamespacesDetails: function (clusterRoles) {
      this.$store.dispatch("clusterRoles/toDetails", clusterRoles);
    },
    // 获取所有节点信息
    getAllNodes: function () {
      this.$store
        .dispatch("nodes/getAllNodes")
        .then((res) => {
          console.log(res);
          this.nodes = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 获取所有命名空间
    getAllNamespaces: function () {
      this.$store
        .dispatch("namespaces/getAllNamespaces")
        .then((res) => {
          console.log(res);
          this.namespaces = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 获取所有集群角色
    getAllClusterRoles: function () {
      this.$store
        .dispatch("clusterRoles/getAllClusterRoles")
        .then((res) => {
          console.log(res);
          this.clusterRoles = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* 编辑部分 */

    // 打开 node 编辑框
    showNodeEditDialog(name) {
      this.$store
        .dispatch("nodes/getNodeYamlByName", name)
        .then((res) => {
          console.log(res);
          this.codeYaml = res.data;
          this.editDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });
    },

    // 打开 namespace 编辑框
    showNamespaceEditDialog(name) {
      this.$store
        .dispatch("namespaces/getNamespaceYamlByName", name)
        .then((res) => {
          console.log(res);
          this.codeYaml = res.data;
          this.editDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });
    },

    // 提交修改
    commitYamlChange() {
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
              this.editDialogVisible = false;
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },

  /* 删除 namespace */
    delNamespace: function (name) {
      this.$confirm("确认删除 namespace", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("namespaces/deleteNamespaceByName", name)
          .then((res) => {
            if(res.code == 1200) {
              this.$message.success("删除成功");
              this.getNamespaces();
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((error) => {
            throw error;
          });
      }).catch(()=>{

      });
    },


    // 关闭添加或者修改框
    handleClose: function () {
      this.addYaml = "";
      setTimeout(() => {
        this.codemorror.refresh();
      }, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
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

.my-progress {
  color: #000;
  & .el-progress-bar__outer {
    background-color: red !important;
  }
  ::v-deep .el-progress-bar__inner {
    background-color: #e27802 !important;
  }
  ::v-deep .el-progress-bar__innerText {
    color: #1e212d !important;
  }
}

.el-card {
  width: 95%;
}
.el-table .warning-row {
  background: rgb(194, 99, 70);
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>