
<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{
        persistentVolumeClaim.metadata.name
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
          <span>{{ persistentVolumeClaim.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>命名空间</p>
          <span>{{ persistentVolumeClaim.metadata.namespace }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            persistentVolumeClaim.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ persistentVolumeClaim.metadata.uid }}</span>
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
              >{{ anno.key }}: {{ anno.value }}</el-tag
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
        <!-- <div class="metadata-item">
          <p>节点</p>
          <span>{{ persistentVolumeClaim.spec.nodeName }}</span>
        </div> -->
        <div class="metadata-item">
          <p>状态</p>
          <span>{{ persistentVolumeClaim.status.phase }}</span>
        </div>
        <div class="metadata-item">
          <p>容量</p>
          <span>{{ persistentVolumeClaim.status.capacity.storage.amount }} {{persistentVolumeClaim.status.capacity.storage.format}}</span>
          <!-- <template slot-scope="scope">
            <span>{{scope.row.status.capacity.storage.amount}} {{scope.row.status.capacity.storage.format}}</span>
          </template> -->
        </div>
        <div class="metadata-item">
          <p>访问模式</p>
          <span>{{ persistentVolumeClaim.spec.accessModes[0] }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />

  </div>
</template>

<script>
export default {
  data() {
    return {
      persistentVolumeClaim: {},
      persistentVolumeClaimName: "",
      persistentVolumeClaimNamespace: "",
    };
  },

  // 生命周期方法
  mounted: function () {

    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("persistentVolumeClaimName") == null) {
      sessionStorage.setItem("persistentVolumeClaimName", this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimName);
      this.persistentVolumeClaimName = this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimName;
    }
    // 不为空，且当前 persistentVolumeClaimName 有值，同时和之前的不一样，更新 persistentVolumeClaimName
    else if (
      this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimName != "" &&
      sessionStorage.getItem("persistentVolumeClaimName") != this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimName
    ) {
      sessionStorage.setItem("persistentVolumeClaimName", this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimName);
      this.persistentVolumeClaimName = this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimName;
    }

    
    /* namespace */
    // 为空，直接存储
    if (sessionStorage.getItem("persistentVolumeClaimNamespace") == null) {
      sessionStorage.setItem("persistentVolumeClaimNamespace", this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimNamespace);
      this.persistentVolumeClaimNamespace = this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimNamespace;
    }
    // 不为空，且当前 persistentVolumeClaimNamespace 有值，同时和之前的不一样，更新 persistentVolumeClaimNamespace
    else if (
      this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimNamespace != "" &&
      sessionStorage.getItem("persistentVolumeClaimNamespace") != this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimNamespace
    ) {
      sessionStorage.setItem("persistentVolumeClaimNamespace", this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimNamespace);
      this.persistentVolumeClaimNamespace = this.$store.state.persistentVolumeClaims.persistentVolumeClaim.persistentVolumeClaimNamespace;
    }

    
    // 获取数据
    let per = {
      name: sessionStorage.getItem("persistentVolumeClaimName"),
      namespace: sessionStorage.getItem("persistentVolumeClaimNamespace"),
    };
    //console.log("6666",per.persistentVolumeClaimName)
    this.$store
      .dispatch("persistentVolumeClaims/getPVCByNameAndNamespace", per)
      .then((res) => {
        console.log(res);
        this.persistentVolumeClaim = res.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.persistentVolumeClaim.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.persistentVolumeClaim.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.persistentVolumeClaim.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.persistentVolumeClaim.metadata.annotations[anno],
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
</style>