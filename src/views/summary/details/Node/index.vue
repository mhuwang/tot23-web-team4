<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-25 22:13:37
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-27 11:21:13
-->
<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">{{
        node.metadata.name
      }}</span></el-divider
    >
    <!-- 分配信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">分配信息</span>
      </div>
      <div>
        <el-row>
          <!-- cpu 信息 -->
          <el-col :span="8">
            <Card class="my-card">
              <p slot="title">CPU</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem size="large">
                  <template slot="action">
                    <li>
                      <i-circle
                        :size="200"
                        :trail-width="trailWidth"
                        :stroke-width="strokeWidth"
                        :percent="6.3"
                        stroke-linecap="square"
                        stroke-color="#ffd880"
                      >
                        <div class="demo-Circle-custom">
                          <h2>6.3%</h2>
                          <span> Requests </span>
                          <p>Cores: 0.25</p>
                        </div>
                      </i-circle>
                    </li>
                    <li>
                      <i-circle
                        :size="200"
                        :trail-width="trailWidth"
                        :stroke-width="strokeWidth"
                        :percent="80"
                        stroke-linecap="square"
                        stroke-color="#ffd880"
                      >
                        <div class="demo-Circle-custom">
                          <h2>12.5%</h2>
                          <span> Limits </span>
                          <p>Cores: 0.5</p>
                        </div>
                      </i-circle>
                    </li>
                  </template>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- 内存信息 -->
          <el-col :span="8" :offset="1">
            <Card class="my-card">
              <p slot="title">内存</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem size="large">
                  <template slot="action">
                    <li>
                      <i-circle
                        :size="200"
                        :trail-width="trailWidth"
                        :stroke-width="strokeWidth"
                        :percent="0.4"
                        stroke-linecap="square"
                        stroke-color="#95e1d3"
                      >
                        <div class="demo-Circle-custom">
                          <h2>0.4%</h2>
                          <span> Requests </span>
                          <p>MiB: 64</p>
                        </div>
                      </i-circle>
                    </li>
                    <li>
                      <i-circle
                        :size="200"
                        :trail-width="trailWidth"
                        :stroke-width="strokeWidth"
                        :percent="80"
                        stroke-linecap="square"
                        stroke-color="#95e1d3"
                      >
                        <div class="demo-Circle-custom">
                          <h2>0.8%</h2>
                          <span> Limits </span>
                          <p>MiB: 128</p>
                        </div>
                      </i-circle>
                    </li>
                  </template>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- pod 信息 -->
          <el-col :span="4" :offset="1">
            <Card class="my-card">
              <p slot="title">Pod</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem size="large">
                  <template slot="action">
                    <li>
                      <i-circle
                        :size="200"
                        :trail-width="trailWidth"
                        :stroke-width="strokeWidth"
                        :percent="80"
                        stroke-linecap="square"
                        stroke-color="#b4aee8"
                      >
                        <div class="demo-Circle-custom">
                          <h2>6.3%</h2>
                          <span> Requests </span>
                          <p>Cores: 0.25</p>
                        </div>
                      </i-circle>
                    </li>
                  </template>
                </ListItem>
              </List>
            </Card>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br><br>
    <!-- 元数据 -->
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="font-size: 16px">元数据</span>
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "NodeDetails",
  data() {
    return {
      trailWidth: 5,
      strokeWidth: 5,
      node: {},
    };
  },
  created: function () {
    this.node = this.$store.state.nodes.nodeDetails;
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.my-card p,
.my-list {
  text-align: center;
}
.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 28px;
    font-weight: normal;
  }
  & p {
    color: #657180;
    font-size: 14px;
    margin: 10px 0 15px;
  }
  & span {
    display: block;
    padding-top: 15px;
    color: #657180;
    font-size: 14px;
    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
  & span i {
    font-style: normal;
    color: #3f414d;
  }
  .ivu-list-item-action > li:after {
    display: none;
  }
}
</style>