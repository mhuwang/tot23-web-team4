<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Anna
 * @Date: 2021-04-13 11:11:57
 * @LastEditors: Anna
 * @LastEditTime: 2021-04-26 13:30:13
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix"> 
        <span>所有 持久化存储卷</span>
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
      </el-row>
      <el-table 
        :data="persistentVolumeClaims" 
        style="width: 100%" 
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
        >
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[3].status == 'True'? 'load-success': scope.row.status.conditions[3].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template>
        </el-table-column> -->
        <el-table-column prop="metadata.name" label="名称" width="200">
          <template slot-scope="scope">
            <router-link 
            :to="'/SettingStorage/persistentVolumeClaims/'+scope.row.metadata.name" 
            @click.native="
            goToPersistentVolumeClaimsDetails(
              scope.row.metadata.name,
              scope.row.metadata.namespace
              )
            " 
            class="link-type"
          >
              <span style="color:#409EFF;text-decoration:underline">{{ 
                scope.row.metadata.name 
                }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间" width="150"> </el-table-column>
        <!-- prop="status.phase" -->
        <el-table-column  label="状态" width="100"> 
          <template slot-scope="scope">
            {{
              scope.row.status.phase == "Bound"
                ? "绑定"
                : scope.row.status.phase == "Available"
                ? "可用"
                : scope.row.status.phase == "Released"
                ? "释放"
                : "失败"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="spec.volumeName" label="卷" width="100"> </el-table-column>
        <el-table-column label="容量" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.status.capacity.storage.amount}} {{scope.row.status.capacity.storage.format}}</span>
          </template>
        </el-table-column>
        <!-- prop="spec.accessModes[0]" -->
        <el-table-column  label="访问模式" width="150"> 
          <template slot-scope="scope">
            {{
              scope.row.spec.accessModes[0] == "ReadWriteOnce"
                ? "仅允许单节点挂载读写"
                : scope.row.spec.accessModes[0] == "ReadOnlyMany"
                ? "允许多节点挂载且只读"
                : "允许多节点挂载读写"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="spec.storageClassName" label="存储类" width="120"> </el-table-column>


        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="apiVersion" label="apiVersion"> </el-table-column> -->
        <!-- <el-table-column prop="kind" label="kind"> </el-table-column> -->
        <!-- <el-table-column prop="metadata.uid" label="uid"> </el-table-column> -->
        
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              style="margin-bottom:5px"
              size="small"
              @click="showPVCEditDialog(
                scope.row.metadata.name,
                scope.row.metadata.namespace
                )
                "
              >编辑</el-button
            >
            <br>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delPVC(
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

    <!-- 编辑框 -->
    <el-dialog
      title="编辑 持久化存储卷"
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
  name: "PersistentVolumeClaims",

  data() {
    return {
      persistentVolumeClaims: [],
      namespaces: [], // 命名空间选择框
      value: "", // 选择框的值
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      codeJSON: "", // 编辑框的 json 数据
      codeYaml: "", // 编辑框的 yaml 数据

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

  mounted() {
    this.getPersistentVolumeClaims();
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
    

    // 前往  persistentVolumeClaims 详情页
    goToPersistentVolumeClaimsDetails: function (persistentVolumeClaimName, persistentVolumeClaimNamespace) {
      // console.log("persistentVolumeClaims index namespace", persistentVolumeClaimNamespace);
      let pvcsDetails = {
        persistentVolumeClaimName: persistentVolumeClaimName,
        persistentVolumeClaimNamespace: persistentVolumeClaimNamespace
      }
      this.$store
        .dispatch("persistentVolumeClaims/toDetails", pvcsDetails);
    },

    // 获取所有 persistentVolumeClaims
    getPersistentVolumeClaims(namespace) { 
      this.$store
        .dispatch("persistentVolumeClaims/getAllPVC", namespace)
        .then((res) => {
          console.log(res.data);
          this.persistentVolumeClaims = res.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /* 编辑部分 */
    showPVCEditDialog(name, namespace) {
      let pvcsDetails = {
        persistentVolumeClaimName: name,
        persistentVolumeClaimNamespace: namespace,
      };

      // 获取 yaml 格式
      this.$store
        .dispatch(
          "persistentVolumeClaims/getPVCYamlByNameAndNamespace",
          pvcsDetails
        )
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


    // 关闭修改框
    handleClose: function () {
      this.addYaml = "";
      setTimeout(() => {
        this.codemorror.refresh();
      }, 1);
    },

    /* 删除 PersistentVolumeClaim */
    delPVC: function (name, namespace) {
      this.$confirm("确认删除 持久化存储卷", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let pvcsDetails = {
            persistentVolumeClaimName: name,
            persistentVolumeClaimNamespace: namespace,
          };
          this.$store
            .dispatch(
              "persistentVolumeClaims/delPVCByNameAndNamespace",
              pvcsDetails
            )
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success("删除成功");
                this.getPersistentVolumeClaims();
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
      this.getPersistentVolumeClaims(value);
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true;
      this.getPersistentVolumeClaims();
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

.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
}
</style>