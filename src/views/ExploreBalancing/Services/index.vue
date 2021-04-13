<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-13 09:16:37

 -->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Services</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
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
              @click="getservices"
            ></el-button> -->
        </el-col>
        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button
            type="primary"
            size="large"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
          >
            添加 service
          </el-button>
        </el-col>
      </el-row>
      <el-table :data="services" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.phase == 'Running' || scope.row.phase == 'Succeeded'
                  ? 'load-success'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column> -->
        <!-- 修改前 -->
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.conditions[0].status == 'True'
                  ? 'load-success'
                  : scope.row.status.conditions[0].status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column> -->

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
        <!-- <el-table-column prop="apiVersion" label="版本"> </el-table-column> -->
        <el-table-column prop="metadata.namespace" label="命名空间">
        </el-table-column>
        <el-table-column prop="spec.type" label="类型">
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <spanservice-template-hash: {{scope.row.metadata.labels['service-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        <!-- <el-table-column prop="spec.nodeName" width="140" label="所属节点"> </el-table-column>
        <el-table-column prop="status.serviceIP" width="140" label="主机ip地址"> </el-table-column> -->
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
                showServiceEditDialog(scope.row.metadata.name, scope.row.metadata.namespace)
              "
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delService(scope.row.metadata.name, scope.row.metadata.namespace)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑框 -->
    <el-dialog
      title="编辑 service"
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

      <!-- <textarea style="width:100%" name="describe" id="service" cols="30" rows="10">
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

    <!-- 添加框 -->
    <el-dialog
      title="添加 Service"
      :visible.sync="addDialogVisible"
      width="70%"
      @closed="handleClose"
      @close="addDialogVisible = false"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <codemirror
        ref="cmYamlAdd"
        :value="addYaml"
        :options="cmOptionsYaml"
        @ready="onAddYamlCmReady"
        @input="onAddYamlCmCodeChange"
      />

      <!-- <textarea style="width:100%" name="describe" id="service" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitServiceAdd">确 定</el-button>
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
  name: "Services",

  data() {
    return {
      services: [], //service 列表
      namespaces: [], // 命名空间选择框
      value: "", // 选择框的值
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      addDialogVisible: false, // 添加框详情
      codeJSON: "", // 编辑框的 json 数据
      codeYaml: "", // 编辑框的 yaml 数据
      addYaml: "", // 添加框的 yaml 数据

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

  created() {
    this.getServices();
  },

  mounted() {
    this.getServices();
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
    // 添加的 yaml 框
    onAddYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onAddYamlCmCodeChange(newCode) {
      this.addYaml = newCode;
    },

    /* JSON */
    onJSONCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onJSONCmCodeChange(newCode) {
      //console.log("this is new code", newCode);
      this.codeJSON = newCode;
    },

    // 获取所有 Services
    getServices(namespace) {
      this.$store
        .dispatch("services/getAllServices", namespace)
        .then((res) => {
          console.log(res.data);
          this.services = res.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 前往 Service 详情页
    goToServicesDetails: function (name, namespace) {
      let serviceDetails = {
        serviceName: name,
        serviceNamespace: namespace,
      };
      this.$store.dispatch("services/toDetails", serviceDetails);
    },

    /* 添加部分，提交添加 */
    commitServiceAdd() {
      this.$confirm("添加 Service？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeServicesByYaml", this.addYaml)
            .then((res) => {
              switch (res.code) {
                case 1200:
                  this.$message.success("添加成功");
                  this.addDialogVisible = false;
                  break;
                case 1201:
                  this.$message.error("添加失败，请查看云平台相关错误信息");
                  this.addDialogVisible = false;
                  break;
                case 1202:
                  this.$message.error(
                    "添加失败，请查看 yaml 文件格式，命名空间必须指定"
                  );
                  break;
                default:
                  this.$message.info("提交成功");
                  break;
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },

    /* 编辑部分 */
    showServiceEditDialog(name, namespace) {
      let serviceDetails = {
        serviceName: name,
        serviceNamespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch("services/getServiceYamlByNameAndNamespace", serviceDetails)
        .then((res) => {
          // console.log(res);
          // let json = JSON.stringify(res.data);
          // this.codeJSON = this.beautify(json, {
          //   indent_size: 4,
          //   space_in_empty_paren: true,
          // }); 
          this.codeYaml = res.data;
          this.editDialogVisible = true; // 打开编辑对话框
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

    // 提交修改
    commitYamlChange() {
      this.$confirm("确认修改？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeServicesByYaml", this.codeYaml)
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

    // 关闭添加或者修改框
    handleClose: function () {
      this.addYaml = "";
      setTimeout(() => {
        this.codemorror.refresh();
      }, 1);
    },

    /* 删除 Service */
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

    /* 按命名空间查询 */

    // 当选择框聚焦时获取命名空间
    initNamespace() {
      if (this.namespaces.length == 0) {
        this.namespaces = this.$store.state.namespaces.namespaces;
      }
    },
    // 选择框变化事件
    selectChange(value) {
      this.loading = true;
      this.getServices(value);
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true;
      this.getServices();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
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
</style>

