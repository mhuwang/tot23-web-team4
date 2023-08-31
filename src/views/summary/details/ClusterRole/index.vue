<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">{{
        clusterRole.metadata.name
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
          <span>{{ clusterRole.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            clusterRole.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ clusterRole.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item" v-if="this.labels.length > 0">
          <p>标签</p>
          <li v-for="(label, index) in this.labels" :key="label">
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
          <li v-for="(anno, index) in this.annotations" :key="index">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ anno.key }} : {{ anno.value }}</el-tag
            >
          </li>
        </div>
      </List>
    </el-card>
    <br /><br />

    <!-- 活动 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">活动</span>
      </div>
      <el-table :data="rules" stripe>
        <!-- <el-table-column type="index"></el-table-column> -->
        <el-table-column
          :formatter="formatterResources"
          label="资源"
        ></el-table-column>
        <el-table-column align="center" :formatter="formatterNonResourceURLs" label="非资源 URL">
        </el-table-column>
        <el-table-column :formatter="formatterResourceNames" label="资源名">
          
        </el-table-column>
        <el-table-column :formatter="formatterVerbs" label="动作"> </el-table-column>
        <el-table-column :formatter="formatterApiGroups" label="API 组"> </el-table-column>
      </el-table>
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
  name: "clusterRoleDetails",

  data() {
    return {
      clusterRole: {},
      annoKey: "",
      annoDetails: "",
      annoDetailsVisible: false, // 注释的详情框
      rules: [], // 所有事件

    //   resourcesActicity: "", // 活动中的资源
    //   nonResourceURLs: "", // 活动中的非资源 URL
    //   resourceNames: "", // 活动中的资源名
    //   verbs: "", // 活动中的动作
    //   apiGroups: "", // 活动中的 api 组
    };
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.clusterRole.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.clusterRole.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.clusterRole.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.clusterRole.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  },

  mounted: function () {
    this.getClusterRoleDetails();
  },
  methods: {
    // 处理分页
    // handleCurrentChange(page) {
    //   console.log(page);
    //   this.currentEvents = this.events.slice((page - 1) * 10, page * 10);
    // },

    // 获取 clusterRole 详情
    getClusterRoleDetails() {
      this.$store
        .dispatch("clusterRoles/getClusterRoleDetails", this.getclusterRole())
        .then((res) => {
          console.log(res);
          this.clusterRole = res.data;
          this.rules = res.data.rules;
        })
        .catch((error) => {
          throw error;
        });
    },

    getclusterRole() {
      // 获取最后一个 / 的位置
      let index = this.$route.path.lastIndexOf("/");
      return this.$route.path.substring(index + 1, this.$route.path.length);
    },

    // 格式化活动的内容
    formatterResources(row, column) {
      return row.resources.join(", ");
    },
    formatterNonResourceURLs(row, column) {
        if (row.nonResourceURLs.length > 0){
            return row.nonResourceURLs.join(", ")
        } else {
            return "--"
        }
    },
    formatterResourceNames(row, column) {
        if (row.resourceNames.length > 0){
            return row.resourceNames.join(", ")
        } else {
            return "--"
        }
    },
    formatterVerbs(row, column) {
        if (row.verbs.length > 0){
            return row.verbs.join(", ")
        } else {
            return "--"
        }
    },
    formatterApiGroups(row, column) {
        if (row.apiGroups.length > 0){
            return row.apiGroups.join(", ")
        } else {
            return "--"
        }
    },

    // 显示注解的详情
    // showAnnoDetails(key) {
    //   this.annoDetailsVisible = true;
    //   console.log(key);
    //   this.annoKey = key;
    //   this.annoDetails = this.beautify(
    //     this.clusterRole.metadata.annotations[key],
    //     { indent_size: 2, space_in_empty_paren: true }
    //   );
    // },
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
</style>