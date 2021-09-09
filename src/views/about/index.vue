<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-21 16:00:59
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px">关于</span>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- <img src="../../assets/logo.png" alt > -->
          <el-image
            :src="require('../../assets/logo.png')"
            fit="scale-down"
          ></el-image>
        </el-col>
        <el-col :span="8" style="margin-left: 15px">
          <el-row>
            <el-col>
              <span style="font-size: 30px"> 智慧国博项目组 </span>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px">
            <el-col>
              <span style="font-size: 15px">
                基于中国国家博物馆的专用私有云管理平台
              </span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px">
        © Copyright {{ new Date().getFullYear() }} | North West University |
        西北大学云平台开发组
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      url: "./logo.png",
    };
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: inline;
  align-items: center;
  justify-content: center;
}
</style>