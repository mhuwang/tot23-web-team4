<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 
 * @LastEditors: Anna
 * @LastEditTime: 2021-04-26 12:58:39
-->
<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{ configMap.metadata.name }}
      </span></el-divider
    >
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名称</p>
          <span>{{ configMap.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ configMap.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            configMap.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ configMap.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>标签</p>
          <li v-for="label in this.labels" :key="label">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div v-if="this.annotations.length > 0" class="metadata-item">
          <p>注释</p>
          <li v-for="(anno, index) in this.annotations" :key="index">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              id="anno_hover"
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
    <br /><br />
    <!-- 数据  -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div v-if="configMap.data != undefined">
          所有数据&nbsp;&nbsp;<i
            :class="!caShow ? 'el-icon-zoom-in' : 'el-icon-zoom-out'"
            @click="showCa"
          ></i>
          <highlightjs
            v-show="caShow"
            style="width: 100%"
            language="plaintext"
            :code="crtData"
          />
        </div>
        <span v-else>没有要显示的数据</span>
      </List>
    </el-card>
    <br /><br />
  </div>
</template>

<script>
export default {
  props: ["name", "namespace"],
  data() {
    return {
      configMap: {},
      configMapName: "",
      configMapNamespace: "",
      caShow: false,
      annoKey: "",
      annoDetails: "",
      annoDetailsVisible: false, // 注释的详情框
    };
  },

  methods: {
    showCa: function () {
      this.caShow = !this.caShow;
    },
    // 显示注解的详情
    showAnnoDetails(key) {
      this.annoDetailsVisible = true;
      // console.log(key);
      this.annoKey = key;
      this.annoDetails = this.beautify(
        this.configMap.metadata.annotations[key],
        {
          indent_size: 2,
          space_in_empty_paren: true,
        }
      );
    },
  },

  // 生命周期方法
  mounted: function () {
    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("configMapName") == null) {
      sessionStorage.setItem(
        "configMapName",
        this.$store.state.configMaps.configMap.configMapName
      );
      this.configMapName = this.$store.state.configMaps.configMap.configMapName;
    }
    //不为空，且当前 configMapName 有值，同时和之前的不一样，更新 configMapName
    else if (
      this.$store.state.configMaps.configMap.configMapName != "" &&
      sessionStorage.getItem("configMapName") !=
        this.$store.state.configMaps.configMap.configMapName
    ) {
      sessionStorage.setItem(
        "configMapName",
        this.$store.state.configMaps.configMap.configMapName
      );
      this.configMapName = this.$store.state.configMaps.configMap.configMapName;
    }

    /* namespace */
    // 为空，直接存储
    if (sessionStorage.getItem("configMapNamespace") == null) {
      sessionStorage.setItem(
        "configMapNamespace",
        this.$store.state.configMaps.configMap.configMapNamespace
      );
      this.configMapNamespace = this.$store.state.configMaps.configMap.configMapNamespace;
    }
    // 不为空，且当前 configMapNamespace 有值，同时和之前的不一样，更新 configMapNamespace
    else if (
      this.$store.state.configMaps.configMap.configMapNamespace != "" &&
      sessionStorage.getItem("configMapNamespace") !=
        this.$store.state.configMaps.configMap.configMapNamespace
    ) {
      sessionStorage.setItem(
        "configMapNamespace",
        this.$store.state.configMaps.configMap.configMapNamespace
      );
      this.configMapNamespace = this.$store.state.configMaps.configMap.configMapNamespace;
    }

    // 获取数据
    let con = {
      name: sessionStorage.getItem("configMapName"),
      namespace: sessionStorage.getItem("configMapNamespace"),
    };
    //console.log("3333",con.name);
    this.$store
      .dispatch("configMaps/getConfigMapByNameAndNamespace", con)
      .then((res) => {
        console.log(res, "\n", typeof res.data.data);
        this.configMap = res.data;
        console.log(this.configMap.data);
      })
      .catch((error) => {
        throw error;
      });
    //console.log(configMap.data)
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.configMap.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.configMap.metadata.labels[pro],
        });
      }
      return labelArr;
    },
    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.configMap.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.configMap.metadata.annotations[anno],
        });
      }
      return annoArr;
    },

    // crt data
    crtData(){
      let crtArr = "";
      for(let crt in this.configMap.data){
        crtArr += crt + ": " + this.configMap.data[crt] + "\n";
      }
      return crtArr
    }
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