<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 19:37:31
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-17 13:59:06
-->
<template>
  <div>
    <br />
    <el-row>
      <el-col :span="8">
        <!-- 负载预测 -->
        <el-form ref="form" :model="form" label-width="80px">
          <!-- <el-form-item label="添加资源">
            <span><strong>容器组</strong></span>
          </el-form-item> -->
          <el-form-item label="部署">
            <el-select
              v-model="form.name"
              filterable
              clearable
              size="large"
              style="width: 100%"
              @focus="showDeploymentsInNamespace"
              placeholder="请选择部署"
            >
              <el-option
                v-for="item in deploymentsNameInNamespace"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="命名空间">
            <el-select
              v-model="form.namespace"
              filterable
              size="large"
              style="width: 100%"
              @change="whenNamespaceChange"
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
          </el-form-item>
          <el-form-item label="任务时间">
            <el-date-picker
              size="large"
              v-model="form.datatime"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="数量">
            <el-input-number
              v-model="form.amount"
              @change="handleChange"
              :min="1"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="动态伸缩">
            <el-switch
            v-model="suspend"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text=""
            inactive-text="          "
          >
          </el-switch>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="onSubmit">执行</el-button>
            <!-- <el-button v-if='!suspend' type="primary" @click="onSubmit">停止</el-button> -->
            <el-button @click="cancle">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import request from "@/utils/request";
export default {
  data() {
    return {
      /**命名空间部分 */
      namespaces: [], // 命名空间名称
      /**部署部分 */
      deploymentsName: [], // 所有命名空间下的所有部署名称
      deploymentsNameInNamespace: {}, // 特定命名空间下的部署名称
      /**动态伸缩部分 */
      suspend: false, // 启动按钮
      /**表单部分 */
      form: {
        name: "", // 选中的部署
        namespace: "default",// 选中的命名空间
        // 以下暂时没用
        // datatime: "",
        // amount: 1,
        // type: [],
        // resource: "",
        // desc: "",
      },
    };
  },

  created: function () {
    this.getAllDeploymentsName()
  },

  mounted: function () {},

  methods: {
    /**命名空间部分 */
    // 初始化
    initNamespace() {
      if (this.namespaces.length == 0) {
        this.namespaces = this.$store.state.namespaces.namespaces.slice(
          1,
          this.$store.state.namespaces.namespaces.length
        );
      }
      this.form.namespace = 'default'
    },
    // 选择框变化
    whenNamespaceChange() {
      this.form.name = ''
    },

    /**部署部分 */
    // 选择框焦距时选择特定命名空间下的部署
    showDeploymentsInNamespace() {
      this.deploymentsNameInNamespace = this.deploymentsName[this.form.namespace]
    },
    // 获取所有命名空间下的所有部署名称
    getAllDeploymentsName () {
      this.$store
        .dispatch('deployments/getAllDeploymentsName', '')
        .then((res) => {
          console.log(res)
          this.deploymentsName = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    /**按钮部分 */
    // 提交任务
    onSubmit: function () {
      if(this.form.name === '' || this.form.namespace === ''){
        this.$message.info('请选择部署')
        return;
      }
      const deploymentInfo = {
        name: this.form.name,
        namespace: this.form.namespace,
        suspend: this.suspend,
      };
      this.$store
        .dispatch(
          "loadForecasting/autoExpandShrinkDeployment",
          deploymentInfo
        )
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((error) => {
          throw error;
        });

      console.log("submit");
    },
    // 取消
    cancle() {
      this.form.name = ''
      this.form.namespace = 'default'
    }
  },
};
</script>

<style lang="scss" scoped>
</style>