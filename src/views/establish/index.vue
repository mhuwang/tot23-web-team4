<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-21 15:57:56
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>热门服务</span>
      </div>
      <div>
        <el-row>
          <el-col span="6">
            <el-card
              class="box-card"
              style="width: 120px; height: 120px; background-color: #eee"
              shadow="hover"
            >
              <div>
                <el-avatar :size="50" :src="circleUrl"></el-avatar><br />
                <span>统一支付</span>
              </div>
            </el-card>
          </el-col>
          <el-col span="6">
            <el-card
              class="box-card"
              style="width: 200px; height: 200px; background-color: #ccc"
            >
              <div slot="header" class="clearfix">
                <span>统一支付</span>
              </div>
              <div>
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
            </el-card>
          </el-col>
          <el-col span="6">
            <el-card
              class="box-card"
              style="width: 200px; height: 200px; background-color: #ccc"
            >
              <div slot="header" class="clearfix">
                <span>统一支付</span>
              </div>
              <div>
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
            </el-card>
          </el-col>
          <el-col span="6">
            <el-card
              class="box-card"
              style="width: 200px; height: 200px; background-color: #ccc"
            >
              <div slot="header" class="clearfix">
                <span>统一支付</span>
              </div>
              <div>
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  display: inline-block;
}
</style>