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
          <el-form-item label="添加资源">
            <span><strong>容器组</strong></span>
          </el-form-item>
          <el-form-item label="命名空间">
            <el-select
              v-model="form.namespace"
              filterable
              clearable
              size="large"
              style="width: 100%"
              @change="selectChange"
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
          <el-form-item label="容器组">
            <el-select
              v-model="form.namespace"
              filterable
              clearable
              size="large"
              style="width: 100%"
              @change="selectChange"
              @focus="initNamespace"
              placeholder="请选择容器组"
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
          <!-- <el-form-item label="活动性质">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="特殊资源">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动形式">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
            <el-button>取消</el-button>
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
      namespaces: [],
      form: {
        name: "",
        namespace: "",
        datatime: "",
        amount: 1,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },

  created: function () {
    this.namespace = this.$store.state.namespaces.namespaces;
  },

  mounted: function () {},

  methods: {
    // 提交任务
    onSubmit: function () {
      console.log("submit");
    },

    /* 命名空间 */
    initNamespace() {
      if (this.namespaces.length == 0) {
        this.namespaces = this.$store.state.namespaces.namespaces.slice(
          1,
          this.$store.state.namespaces.namespaces.length
        );
      }
    },
    // 选择框变化事件
    selectChange(value) {
      this.loading = true;
      this.form.namespace = value;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>