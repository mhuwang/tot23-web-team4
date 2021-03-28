<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-25 22:13:37
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-28 19:07:12
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
              <List
                class="my-list"
                item-layout="horizontal"
                :split="false"
                size="large"
              >
                <ListItem class="my-list-item">
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
                </ListItem>
                <ListItem class="my-list-item">
                  <i-circle
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="12.5"
                    stroke-linecap="square"
                    stroke-color="#ffd880"
                  >
                    <div class="demo-Circle-custom">
                      <h2>12.5%</h2>
                      <span> Limits </span>
                      <p>Cores: 0.5</p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- 内存信息 -->
          <el-col :span="8" :offset="1">
            <Card class="my-card">
              <p slot="title">内存</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem class="my-list-item">
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
                </ListItem>
                <ListItem class="my-list-item">
                  <i-circle
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="0.8"
                    stroke-linecap="square"
                    stroke-color="#95e1d3"
                  >
                    <div class="demo-Circle-custom">
                      <h2>0.8%</h2>
                      <span> Limits </span>
                      <p>MiB: 128</p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
          <!-- pod 信息 -->
          <el-col :span="4" :offset="1">
            <Card class="my-card">
              <p slot="title">Pod</p>
              <List class="my-list" item-layout="vertical" :split="false">
                <ListItem class="my-list-item">
                  <i-circle
                    :size="200"
                    :trail-width="trailWidth"
                    :stroke-width="strokeWidth"
                    :percent="6.3"
                    stroke-linecap="square"
                    stroke-color="#b4aee8"
                  >
                    <div class="demo-Circle-custom">
                      <h2>6.3%</h2>
                      <span> Requests </span>
                      <p>Cores: 0.25</p>
                    </div>
                  </i-circle>
                </ListItem>
              </List>
            </Card>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br /><br />
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{node.metadata.name}}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{node.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{node.metadata.uid}}</span>
        </div>
      </List>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{node.metadata.name}}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{node.metadata.creationTimestamp.replaceAll(/[TZ]/g,' ')}}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{node.metadata.uid}}</span>
        </div>
      </List>
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
      data: [
        {
          title: "This is title 1",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
        {
          title: "This is title 2",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
        {
          title: "This is title 3",
          description:
            "This is description, this is description, this is description.",
          avatar:
            "https://dev-file.iviewui.com/userinfoPDvn9gKWYihR24SpgC319vXY8qniCqj4/avatar",
          content:
            "This is the content, this is the content, this is the content, this is the content.",
        },
      ],
    };
  },
  computed: {
    node(){
      get: {
        return this.$store.state.nodes.nodeDetails;
      }
      set:(node)=>{
        node = sessionStorage.getItem("nodeDetails");
      }
    }
  },
  mounted: function () {

      window.addEventListener('unload', this.saveNodeInfo)
     
  },
  created: function() {
    
    if(this.$store.state.nodes.nodeDetails.name == undefined){
      
      this.node = sessionStorage.getItem("nodeDetails");
    }
  },
  methods: {
    saveNodeInfo(){
      sessionStorage.setItem("nodeDetails", this.$store.state.nodes.nodeDetails);
    }
  },
};
</script>

<style lang="scss" scoped>
.my-card {
  & p {
    display: inline-block;
    font-size: 18px;
    text-align: center;
  }

  & .my-list {
    text-align: center;
    margin: 0 auto;
    & .my-list-item {
      display: inline-block;
      padding: 0 20px;
    }
  }
}
.metadata-item {
  margin: 0 30px 0 0;
  display: inline-block;
  padding: 10px 10px;
  & p {
    font-size: 14px;
    color: #909399;
  }

  & span {
    font-size: 20px;
    color: #303133;
  }
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
}
</style>