<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-17 13:11:48
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>创建资源</span>
      </div>
      <el-button
        type="primary"
        size="large"
        icon="el-icon-plus"
        @click="addDialogVisible = true"
      >
        创建资源
      </el-button>
    </el-card>

    <!-- 添加框 -->
    <el-dialog
      title="创建资源"
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

      <!-- <textarea style="width:100%" name="describe" id="pod" cols="30" rows="10">
        {{code}}
      </textarea> -->
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitPodAdd">确 定</el-button>
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
  data(){
    return{
      addDialogVisible: false, // 添加框详情
      addYaml: "", // 添加框的 yaml 数据

      cmOptionsYaml: {
        // yaml codemirror 配置项
        tabSize: 4,
        mode: "yaml",
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
    }
  },
  
  methods: {
    // 添加的 yaml 框
    onAddYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onAddYamlCmCodeChange(newCode) {
      this.addYaml = newCode;
    },

    
    /* 添加部分，提交添加 */
    commitPodAdd() {
      this.$confirm("创建资源？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeResourceByYaml", this.addYaml)
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
  }
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

.box-card {
  width: 100%;
  display: inline-block;
}
</style>