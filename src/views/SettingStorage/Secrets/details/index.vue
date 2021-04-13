<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Anna667
 * @Date: 
 * @LastEditors: Anna667
 * @LastEditTime: 
-->
<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{
        secret.metadata.name
      }}
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
          <span>{{ secret.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ secret.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            secret.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ secret.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 -->
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>标签</p>
          <li v-for="label in this.labels" :key=label>
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ label.key }}: {{ label.value }}</el-tag
            >
          </li>
        </div>
        <div class="metadata-item">
          <p>注释</p>
          <li v-for="anno in this.annotations" :key='anno'>
            <el-tag
              class="lebel-tag"
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
    <br /><br />
    <!-- 数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <!-- <div class="metadata-item"> -->
          ca.crt&nbsp;&nbsp;<i :class="!caShow1? 'el-icon-zoom-in' : 'el-icon-zoom-out'" @click="showCa1"></i>
          <highlightjs v-show="caShow1" style="width:100%" language='plaintext' :code="secret.data['ca.crt']" />
        <!-- </div> -->
        <!-- <div class="metadata-item">
          namespace&nbsp;&nbsp;<i :class="!caShow2? 'el-icon-zoom-in' : 'el-icon-zoom-out'" @click="showCa2"></i>
          <highlightjs v-show="caShow2" style="width:100%" language='plaintext' :code="secret.metadata.namespace" />
        </div>
        <div class="metadata-item">
          token&nbsp;&nbsp;<i :class="!caShow3? 'el-icon-zoom-in' : 'el-icon-zoom-out'" @click="showCa3"></i>
          <highlightjs v-show="caShow3" style="width:100%" language='plaintext' :code="secret.data['token']" />
        </div> -->
      </List>
      <List item-layout="horizontal" :split="false">
        namespace&nbsp;&nbsp;<i :class="!caShow2? 'el-icon-zoom-in' : 'el-icon-zoom-out'" @click="showCa2"></i>
        <highlightjs v-show="caShow2" style="width:100%" language='plaintext' :code="secret.metadata.namespace" />
      </List>
      <List item-layout="horizontal" :split="false">
        token&nbsp;&nbsp;<i :class="!caShow3? 'el-icon-zoom-in' : 'el-icon-zoom-out'" @click="showCa3"></i>
        <highlightjs v-show="caShow3" style="width:100%" language='plaintext' :code="secret.data['token']" />
      </List>
    </el-card>
    <br /><br />

  </div>
</template>

<script>
export default {
  props: ['name','namespace'],
  data() {
    return {
      secret: {},
      secretName: "",
      secretNamespace: "",
      caShow1: false,
      caShow2: false,
      caShow3: false,
      annoKey: "",
      annoDetails: "",
      annoDetailsVisible: false, // 注释的详情框
    };
  },

  methods: {
    showCa1: function(){
      this.caShow1 = !this.caShow1;
    },
    showCa2: function(){
      this.caShow2 = !this.caShow2;
    },
    showCa3: function(){
      this.caShow3 = !this.caShow3;
    }
  },

  // 生命周期方法
  mounted: function () {

    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("secretName") == null) {
      sessionStorage.setItem("secretName", this.$store.state.secrets.secret.secretName);
      this.secretName = this.$store.state.secrets.secret.secretName;
    }
    // 不为空，且当前 secretName 有值，同时和之前的不一样，更新 secretName
    else if (
      this.$store.state.secrets.secret.secretName != "" &&
      sessionStorage.getItem("secretName") != this.$store.state.secrets.secret.secretName
    ) {
      sessionStorage.setItem("secretName", this.$store.state.secrets.secret.secretName);
      this.secretName = this.$store.state.secrets.secret.secretName;
    }

    
    /* namespace */
    // 为空，直接存储
    if (sessionStorage.getItem("secretNamespace") == null) {
      sessionStorage.setItem("secretNamespace", this.$store.state.secrets.secret.secretNamespace);
      this.secretNamespace = this.$store.state.secrets.secret.secretNamespace;
    }
    // 不为空，且当前 secretNamespace 有值，同时和之前的不一样，更新 secretNamespace
    else if (
      this.$store.state.secrets.secret.secretNamespace != "" &&
      sessionStorage.getItem("secretNamespace") != this.$store.state.secrets.secret.secretNamespace
    ) {
      sessionStorage.setItem("secretNamespace", this.$store.state.secrets.secret.secretNamespace);
      this.secretNamespace = this.$store.state.secrets.secret.secretNamespace;
    }

    
    // 获取数据
    let ser = {
      name: sessionStorage.getItem("secretName"),
      namespace: sessionStorage.getItem("secretNamespace"),
    };
    this.$store
      .dispatch("secrets/getSecretByNameAndNamespace", ser)
      .then((res) => {
        //console.log("3333",ser.name);
        //console.log('444444446666666')
        console.log(res.data);
        this.secret = res.data;
      })
      .catch((error) => {
        throw error;
      });
  },
  methods: {
    // 显示注解的详情
    showAnnoDetails(key) {
      this.annoDetailsVisible = true;
      // console.log(key);
      this.annoKey = key;
      this.annoDetails = this.beautify(this.secret.metadata.annotations[key], {
        indent_size: 2,
        space_in_empty_paren: true,
      });
    },
  },
  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.secret.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.secret.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.secret.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.secret.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  }
  
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