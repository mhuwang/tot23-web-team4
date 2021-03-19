<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-19 16:09:25
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px">集群状态</span>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <!-- <Echarts :option="this.option"/> -->
        </el-col>
        <el-col :span="12"> </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      option: {
        title: {
          text: "某站点用户访问来源",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left',
        // },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>