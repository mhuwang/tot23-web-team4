<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: zqy
 * @LastEditTime: 2021-05-10 19:34:28
-->
<!--<template>-->
<!--  <h1>Daemon Sets</h1>-->
<!--</template>-->
<template>
  <div>
    <!-- 主体部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 守护进程集</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
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
              @click="getPods"
            ></el-button> -->
        </el-col>
        <!-- 添加按钮 -->
        <!-- <el-col :span="4">
          <el-button
            type="primary"
            size="large"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
          >
            添加 Pod
          </el-button>
        </el-col> -->
      </el-row>
      <el-table :data="daemonSetsInCurrentPage" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="scope.row.status == '0'
                    ? 'load-doubt'
                    : 'load-success'
              "
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'DaemonSet Details',
                params: {
                  name:
                    scope.row.name +
                    ',' +
                    scope.row.namespace,
                },
              }"
              @click.native="goToDaemonSetsDetails(scope.row)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="namespace" label="命名空间">
        </el-table-column>
        <el-table-column label="Pods">
          <template slot-scope="scope">
            <span>
              {{ scope.row.runningPods }}/{{
                scope.row.replicas
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="启动时间" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
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
              @click="
                showDaemonSetEditDialog(
                  scope.row.name,
                  scope.row.namespace
                )
              "
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              style="margin-bottom: 5px"
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="
                delDaemonSet(
                  scope.row.name,
                  scope.row.namespace
                )
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="daemonSetsAmount"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑框 -->
    <el-dialog
      title="编辑 DaemonSet"
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
        <!-- <el-tab-pane label="JSON" name="second">
          <codemirror
            ref="cmYamlEditor"
            :value="codeJSON"
            :options="cmOptions"
            @ready="onJSONCmReady"
            @input="onJSONCmCodeChange"
          />
        </el-tab-pane> -->
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
  </div>
</template>

<script>
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/yaml/yaml.js";
// import theme style
import "codemirror/theme/panda-syntax.css";

export default {
  name: "DaemonSets",

  data() {
    return {
      daemonSetsAmount: 0, //DaemonSets 总数
      currentPage: 1, //分页绑定当前页
      daemonSetsInCurrentPage: [], //页面中的 DaemonSets
      pageSize: 6, //一页显示数量
      namespaces: [],//命名空间
      daemonSets: [],//所有 DaemonSets
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      addDialogVisible: false, // 添加框详情
      // codeJSON: "", // 编辑框的 json 数据
      codeYaml: "", // 编辑框的 yaml 数据
      addYaml: "", // 添加框的 yaml 数据
      value: "",
      // cmOptions: {
      //   // json codemirror 配置项
      //   tabSize: 4,
      //   mode: {
      //     name: "javascript",
      //     json: true,
      //   },
      //   theme: "panda-syntax",
      //   lineNumbers: true,
      //   line: true,
      // },
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
    this.getDaemonSets();
  },

  methods: {
    // 获取所有 DaemonSets
    getDaemonSets(namespace = "") {
      this.$store
        .dispatch("daemonSets/getAllDaemonSets", namespace)
        .then((res) => {
          // console.log(res.data);
          this.daemonSets = res.data;
          this.daemonSetsAmount = this.daemonSets.length;
          this.daemonSetsInCurrentPage = this.daemonSets.slice(0, this.pageSize);
        })
        .catch((error) => {
          console.log(error);
        });
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
      // console.log("selectChange", value, "++++\n\n")
      this.loading = true;
      this.getDaemonSets(value);
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true;
      this.getDaemonSets();
    },

    //编辑 DaemonSet
    showDaemonSetEditDialog(name, namespace) {
      let daemonSetDetails = {
        name: name,
        namespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch(
          "daemonSets/getDaemonSetYamlByNameAndNamespace",
          daemonSetDetails
        )
        .then((res) => {
          this.codeYaml = res.data;
          // console.log("edit dialog init", this.codeYaml);
          this.editDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });

      // json 格式
      this.$store
        .dispatch("cronJobs/getCronJobByNameAndNamespace", cronJobDetails)
        .then((res) => {
          // console.log(res);
          let json = JSON.stringify(res.data.cronJob);
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

    //点击确认按钮触发此修改 DaemonSet 事件
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

    // 关闭修改框
    handleClose: function () {
      this.addYaml = "";
      setTimeout(() => {
        this.codemorror.refresh();
      }, 1);
    },

    //删除 DaemonSet
    delDaemonSet(name, namespace) {
      this.$confirm("确认删除 DaemonSet", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let nameAndNamespace = {
            name: name,
            namespace: namespace,
          };
          this.$store
            .dispatch(
              "daemonSets/deleteDaemonSetByNameAndNamespace",
              nameAndNamespace
            )
            .then((res) => {
              if (res.data) {
                this.$message.success("删除成功");
                this.getDaemonSets();
              } else {
                this.$message.error("删除失败");
              }
              console.log(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {});
    },

    //分页事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.daemonSetsInCurrentPage = this.daemonSets.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
};
</script>


<style lang="scss" scoped>
//el-table中资源表格和查找框的分割线
.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
}

// 编辑窗底部命令提示信息
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
