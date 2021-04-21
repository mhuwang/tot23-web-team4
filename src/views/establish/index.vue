<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: zqy
 * @LastEditTime: 2021-04-21 20:55:15
-->
<template>
  <div>
    <el-card class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>创建资源</span>
      </div> -->
      <el-tabs tab-position="top" style="margin-bottom: 4000px">
        <!-- 从表单创建 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-document"></i>从表单创建</span>
          <!-- 必填信息 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="容器组 名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="容器镜像" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择命名空间">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="容器组 数量">
              <el-input-number
                v-model="amount"
                @change="handleChange"
                :min="1"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="服务" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选服务">
                <el-option label="无服务" value="None"></el-option>
                <el-option label="内部服务" value="Internal"></el-option>
                <el-option label="外部服务" value="External"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="!completeOption">
              <el-button type="primary" @click="submitForm('ruleForm')"
                >创 建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button
                round="true"
                @click="showCompleteOption(completeOption)"
                type="text"
                >显示高级选项</el-button
              >
            </el-form-item>
          </el-form>
          <!-- 高级信息 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            v-if="completeOption"
          >
            <el-form-item label="描述" prop="name">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4 }"
                placeholder="请输入内容"
                v-model="textarea2"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="标签" prop="region" >
              <div class="demo-input-size">
                <el-input
                  size="medium"
                  placeholder="键"
                  suffix-icon="el-icon-date"
                  v-model="input2"
                >
                </el-input>
                <el-input
                  size="medium"
                  placeholder="值"
                  suffix-icon="el-icon-date"
                  v-model="input2"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="CPU需求" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="最低需求"
                    v-model="ruleForm.date1"
                    style="width: 100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker
                    placeholder="最高需求"
                    v-model="ruleForm.date2"
                    style="width: 100%"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-form-item label="运行命令" prop="type">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="命令参数" prop="resource">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="环境变量" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >创 建</el-button
              >
              <el-button @click="resetForm('ruleForm')">重 置</el-button>
              <el-button
                round="true"
                @click="showCompleteOption(completeOption)"
                type="text"
                >收起高级选项</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 输入并创建 -->
        <el-tab-pane>
          <span slot="label"
            ><i class="el-icon-document-add"></i>输入并创建</span
          >
          <codemirror
            ref="cmYamlAdd"
            :value="addYaml"
            :options="cmOptionsYaml"
            @ready="onAddYamlCmReady"
            @input="onAddYamlCmCodeChange"
          />
          <span class="dialog-footer">
            <!-- <div class="foot-info">
                <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
                &ltspec.yaml>
              </div> -->
            <br />
            <el-button type="primary" @click="commitPodAdd">创 建</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </span>
        </el-tab-pane>

        <!-- 从文件创建 -->
        <el-tab-pane>
          <span slot="label"><i class="el-icon-folder"></i>从文件创建</span>
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传Yaml格式的文件，且不超过500kb
            </div>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/yaml/yaml.js";
// import theme style
import "codemirror/theme/panda-syntax.css";
export default {
  data() {
    return {
      textarea2: "",
      amount: 1,
      addDialogVisible: true, // 添加框详情
      addYaml: "", // 输入框的 yaml 数据

      cmOptionsYaml: {
        // yaml codemirror 配置项
        tabSize: 4,
        mode: "yaml",
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
      completeOption: false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入Pod名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择命名空间", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },
  methods: {
    showCompleteOption(completeOption) {
      console.log(completeOption);
      switch (completeOption) {
        case true:
          this.completeOption = false;
          console.log(1);
          break;
        case false:
          this.completeOption = true;
          console.log(2);
          break;
      }
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /* 从输入创建 */
    // 添加的 yaml 框
    onAddYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },
    onAddYamlCmCodeChange(newCode) {
      // console.log(newCode, "输入")
      this.addYaml = newCode;
    },
    //提交创建申请并返回结果
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

.box-card {
  width: 100%;
  display: inline-block;
}
</style>