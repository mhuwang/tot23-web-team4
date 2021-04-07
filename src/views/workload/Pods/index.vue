<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-07 16:41:51
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 Pod</span>
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
      </el-row>
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

    <!-- 编辑框 -->
    <el-dialog
      title="编辑 pod"
      :visible.sync="editDialogVisible"
      width="70%"
      :before-close="handleClose"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <el-tabs value="first"  type="card">
        <el-tab-pane label="YAML" name="first">
          <codemirror
            ref="cmJSONEditor"
            :value="codeYaml"
            :options="cmOptionsYaml"
            @ready="onYamlCmReady"
            @focus="onYamlCmFocus"
            @input="onYamlCmCodeChange"
          />
        </el-tab-pane>
        <el-tab-pane label="JSON" name="second">
          <codemirror
            ref="cmYamlEditor"
            :value="codeJSON"
            :options="cmOptions"
            @ready="onJSONCmReady"
            @focus="onJSONCmFocus"
            @input="onJSONCmCodeChange"
          />
        </el-tab-pane>
      </el-tabs>
      
      <!-- <textarea style="width:100%" name="describe" id="pod" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- <el-dialog title="编辑 pod" :visible.sync="editDialogVisible">
      <highlightjs json :code="code" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
// import language js
import 'codemirror/mode/javascript/javascript.js'
// import theme style
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/panda-syntax.css'

export default {  
  name: "Pods",

  data() {
    return {
      pods: [], // pod 列表
      namespaces: [], // 命名空间选择框
      value: "", // 选择框的值
      loading: true, // 获取数据中
      editDialogVisible: false, // 编辑详情框
      codeJSON: '',
      codeYaml: '',
      cmOptions: {
        tabSize: 4,
        mode: {
          name: 'javascript',
          json: true
        },
        theme: 'panda-syntax',
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      },
      cmOptionsYaml: {
        tabSize: 4,
        mode: 'text/yaml',
        theme: 'panda-syntax',
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      }
    };
  },

  mounted() {
    this.getPods("all");
  },

  computed: {
    codemirrorYaml() {
      return this.$refs.cmYamlEditor.codemirror
    },
    codemirrorJSON() {
      return this.$refs.cmJSONEditor.codemirror
    }
  },

  methods: {
    // 编辑器方法
    /* yaml */
    onYamlCmReady(cm) {
      console.log('the editor is readied!', cm);
      setTimeout(()=>{
        this.codemirrorYaml.refresh();
      }, 50)
    },
    onYamlCmFocus(cm) {
      console.log('the editor is focused!', cm)
    },
    onYamlCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    },
    /* JSON */
    onJSONCmReady(cm) {
      console.log('the editor is readied!', cm);
      setTimeout(()=>{
        this.codemirrorJSON.refresh();
      }, 50)
      
    },
    onJSONCmFocus(cm) {
      console.log('the editor is focused!', cm)
    },
    onJSONCmCodeChange(newCode) {
      console.log('this is new code', newCode)
      this.code = newCode
    },
    // 获取所有 pods
    getPods(namespace) {
      this.$store
        .dispatch("pods/getAllPods", namespace)
        .then((res) => {
          console.log(res);
          this.pods = res.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 前往 pods 详情页
    goToPodsDetails(name, namespace) {
      let podDetails = {
        podName: name,
        podNamespace: namespace,
      };
      this.$store.dispatch("pods/toDetails", podDetails);
    },

    /* 编辑部分 */
    showPodEditDialog(name, namespace) {
      let podDetails = {
        podName: name,
        podNamespace: namespace,
      };

      this.$store
        .dispatch("pods/getPodByNameAndNamespace", podDetails)
        .then((res) => {
          console.log(res);
          let json = JSON.stringify(res.data.pod);
          this.codeJSON = this.beautify(json, {
            indent_size: 4,
            space_in_empty_paren: true,
          });
          this.editDialogVisible = true; // 打开编辑对话框
          
        })
        .catch((error) => {
          throw error;
        });

      //this.editForm = res; // 查询结果写入表单
    },

    handleClose(){
      this.codeJSON = '';
      this.codeYaml = '';
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
      this.getPods(value);
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true;
      this.getPods("all");
    },
  },
};
</script>

<style lang="scss" scoped>
$cpu-usage-background: #aaa;

.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
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
</style>