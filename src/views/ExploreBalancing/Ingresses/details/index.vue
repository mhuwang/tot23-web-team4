<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: Leo
 * @LastEditTime: 2021-04-13 14:50:52
-->

<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{ ingress.metadata.name }}
      </span></el-divider
    >
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{ ingress.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            ingress.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ ingress.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div v-if="labels.length > 0" class="metadata-item">
          <p>标签</p>
          <li v-for="(label, index) in this.labels" :key="index">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div v-if="annotations.length > 0" class="metadata-item">
          <p>注释</p>
          <li v-for="(anno, index) in this.annotations" :key="index">
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
    <br />
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
  props: ["name", "namespace"],
  data() {
    return {
      ingress: {},
      ingressName: "",
      ingressNamespace: "",
      annoKey: "",
      annoDetails: "",
      annoDetailsVisible: false, // 注释的详情框
    };
  },

  // 生命周期方法
  mounted: function () {
    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("ingressName") == null) {
      sessionStorage.setItem(
        "ingressName",
        this.$store.state.ingresses.ingress.ingressName
      );
      this.ingressName = this.$store.state.ingresses.ingress.ingressName;
    }
    // 不为空，且当前 ingressName 有值，同时和之前的不一样，更新 ingressName
    else if (
      this.$store.state.ingresses.ingress.ingressName != "" &&
      sessionStorage.getItem("ingressName") !=
        this.$store.state.ingresses.ingress.ingressName
    ) {
      sessionStorage.setItem(
        "ingressName",
        this.$store.state.ingresses.ingress.ingressName
      );
      this.ingressName = this.$store.state.ingresses.ingress.ingressName;
    }

    /* namespace */
    // 为空，直接存储
    if (sessionStorage.getItem("ingressNamespace") == null) {
      sessionStorage.setItem(
        "ingressNamespace",
        this.$store.state.ingresses.ingress.ingressNamespace
      );
      this.ingressNamespace = this.$store.state.ingresses.ingress.ingressNamespace;
    }
    // 不为空，且当前 ingressNamespace 有值，同时和之前的不一样，更新 ingressNamespace
    else if (
      this.$store.state.ingresses.ingress.ingressNamespace != "" &&
      sessionStorage.getItem("ingressNamespace") !=
        this.$store.state.ingresses.ingress.ingressNamespace
    ) {
      sessionStorage.setItem(
        "ingressNamespace",
        this.$store.state.ingresses.ingress.ingressNamespace
      );
      this.ingressNamespace = this.$store.state.ingresses.ingress.ingressNamespace;
    }

    // 获取数据
    let ing = {
      name: sessionStorage.getItem("ingressName"),
      namespace: sessionStorage.getItem("ingressNamespace"),
    };
    this.$store
      .dispatch("ingresses/getIngressesByNameAndNamespace", ing)
      .then((res) => {
        console.log(res);
        this.ingress = res.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.ingress.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.ingress.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.ingress.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.ingress.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  },
  methods: {
    // 显示注解的详情
    showAnnoDetails(key) {
      this.annoDetailsVisible = true;
      // console.log(key);
      this.annoKey = key;
      this.annoDetails = this.beautify(this.ingress.metadata.annotations[key], {
        indent_size: 2,
        space_in_empty_paren: true,
      });
    },
  },
  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.ingress.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.ingress.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.ingress.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.ingress.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  },
};
</script>
<style lang="scss" scoped>
#cpu-usage,
#memory-usage {
  width: 100%;
  height: 250px;
}

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

#anno_hover:hover {
  cursor: pointer;
}
</style>