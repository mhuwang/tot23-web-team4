<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-20 17:35:40
-->
<template>
  <div>
    <!-- <h1>个人信息</h1>
        <img src="../../assets/NationalMuseumofChina.png" alt> -->
    <el-button type="primary" icon="el-icon-search" @click="getUser"
      >点击</el-button
    >
    <h1 class="haa">{{ message }}</h1>

    <el-table :data="tableData" style="width: 100%" border stripe size="medium">
      <el-table-column prop="id" label="id"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="role" label="角色"> </el-table-column>
      <el-table-column prop="state" label="状态"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      message: "",
      tableData: [],
    };
  },
  // 方法
  methods: {
    // 就在这发起请求就行
    getUser() {
      this.$store
        .dispatch("user/getUsers","")
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    test() {},
  },
};
</script>

<style lang="scss" scoped>
.haa {
  font-size: 50px;
  color: aqua;
  position: relative;
  left: 100px;
}
</style>