<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-26 13:17:55
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-12 15:55:57
-->
<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">{{
        namespace.metadata.name
      }}</span></el-divider
    >
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{ namespace.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            namespace.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ namespace.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item" v-if="this.labels.length > 0">
          <p>标签</p>
          <li v-for="(label,index) in this.labels" :key="label">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div class="metadata-item" v-if="this.annotations.length > 0">
          <p>注释</p>
          <li v-for="(anno,index) in this.annotations" :key="index">
            <el-tag
              class="lebel-tag"
              id="anno_hover"
              effect="dark"
              size="medium"
              color="#bedcfa"
              style="color: #409eff"
              @click="showAnnoDetails(anno.key)"
              >{{ anno.key }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br /><br />
    <!-- 资源信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">资源信息</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>状态</p>
          <span>{{ namespace.status.phase }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />
    <!-- 活动 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">活动</span>
      </div>
      <el-table :data="currentEvents">
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column prop="message" label="信息"> </el-table-column>
        <el-table-column prop="resource" label="资源"> </el-table-column>
        <el-table-column
          prop="childObject"
          :show-overflow-tooltip="true"
          label="子对象"
        >
        </el-table-column>
        <el-table-column prop="count" label="次数"> </el-table-column>
        <el-table-column prop="count" label="初次">
          <template slot-scope="scope">
            <span>{{ scope.row.firstTime.replaceAll(/[TZ]/g, " ") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后一次">
          <template slot-scope="scope">
            <span>{{ scope.row.lastTime.replaceAll(/[TZ]/g, " ") }}</span>
          </template></el-table-column
        >
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 注释的详情框 -->
    <el-dialog
      :title="annoKey"
      :visible.sync="annoDetailsVisible"
      width="50%"
      :modal="false"
    >
      <highlightjs javascript :code="annoDetails" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="annoDetailsVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "NameSpaceDetails",

  data() {
    return {
      namespace: {},
      annoKey: "",
      annoDetails: "",
      annoDetailsVisible: false, // 注释的详情框

      total: 0, // 总事件数
      events: [], // 所有事件
      currentEvents: [], // 当前页面的事件
    };
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.namespace.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.namespace.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.namespace.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.namespace.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  },

  mounted: function () {
    this.getNamespaceDetails();
  },
  methods: {
    // 处理分页
    handleCurrentChange(page) {
      console.log(page);
      this.currentEvents = this.events.slice((page - 1) * 10, page * 10);
    },
    // 获取 namespace 详情
    getNamespaceDetails() {
      this.$store
        .dispatch("namespaces/getNamespaceDetails", this.getNameSpace())
        .then((res) => {
          console.log(res);
          this.namespace = res.data.namespace;
          this.events = res.data.events;
          this.total = res.data.events.length;
          this.currentEvents = res.data.events.slice(0, 10);
        })
        .catch((error) => {
          throw error;
        });
    },

    getNameSpace() {
      // 获取最后一个 / 的位置
      let index = this.$route.path.lastIndexOf("/");
      return this.$route.path.substring(index + 1, this.$route.path.length);
    },

    // 显示注解的详情
    showAnnoDetails(key) {
      this.annoDetailsVisible = true;
      console.log(key);
      this.annoKey = key;
      this.annoDetails = this.beautify(
        this.namespace.metadata.annotations[key],
        { indent_size: 2, space_in_empty_paren: true }
      );
    },
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

// 元数据
.metadata-item {
  margin: 0 30px 0 0;
  display: inline-block;
  padding: 10px 10px;

  // 小标题
  & p {
    font-size: 14px;
    color: #909399;
  }

  // 小标题下的内容
  & span {
    font-size: 20px;
    color: #303133;
  }

  // 标签列表
  & li {
    display: inline-block;
    // 标签
    & .lebel-tag {
      margin-right: 15px;
      border-radius: 15px;
      margin-top: 5px;
      padding: 2px 8px;
      color: #333;
      border: none;
    }
  }
}

#anno_hover:hover {
  cursor: pointer;
}

.el-pagination {
  margin-top: 20px;
}
</style>