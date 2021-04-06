<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Bernie
 * @Date: 2021-04-4 13:57
 * @LastEditors: Rex Bernie
 * @LastEditTime: 
-->
<template>
  <div>
    <!-- {{name}}
    {{namespace}} -->
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">
        {{
        customResourceDefinition.metadata.name
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
          <span>{{ customResourceDefinition.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            customResourceDefinition.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ customResourceDefinition.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 如果没有标签就不显示   -->
      <List item-layout="horizontal" :split="false">
        <div v-if="labels.length != 0" class="metadata-item">
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
        <div v-if="labels.length != 0" class="metadata-item">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      customResourceDefinition: {},
      customResourceDefinitionName: "",
    };
  },
  // 生命周期方法
  mounted: function () {


    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("customResourceDefinitionName") == null) {
      sessionStorage.setItem("customResourceDefinitionName", this.$store.state.customize.customResourceDefinitionName);
      this.customResourceDefinitionName = this.$store.state.customize.customResourceDefinitionName;
    }
    // 不为空，且当前 customResourceDefinitionName 有值，同时和之前的不一样，更新 customResourceDefinitionName
    else if (
      this.$store.state.customize.customResourceDefinitionName != "" &&
      sessionStorage.getItem("customResourceDefinitionName") != this.$store.state.customize.customResourceDefinitionName
    ) {
      sessionStorage.setItem("customResourceDefinitionName", this.$store.state.customize.customResourceDefinitionName);
      this.customResourceDefinitionName = this.$store.state.customize.customResourceDefinitionName;
    }

    
    // /* namespace */
    // // 为空，直接存储
    // if (sessionStorage.getItem("deploymentNamespace") == null) {
    //   sessionStorage.setItem("deploymentNamespace", this.$store.state.deployments.deployment.deploymentNamespace);
    //   this.deploymentNamespace = this.$store.state.deployments.deployment.deploymentNamespace;
    // }
    // // 不为空，且当前 deploymentNamespace 有值，同时和之前的不一样，更新 deploymentNamespace
    // else if (
    //   this.$store.state.deployments.deployment.deploymentNamespace != "" &&
    //   sessionStorage.getItem("deploymentNamespace") != this.$store.state.deployments.deployment.deploymentNamespace
    // ) {
    //   sessionStorage.setItem("deploymentNamespace", this.$store.state.deployments.deployment.deploymentNamespace);
    //   this.deploymentNamespace = this.$store.state.deployments.deployment.deploymentNamespace;
    // }

    
    // 获取数据
    this.$store
      .dispatch("customize/getCustomResourceDefinitionByName", sessionStorage.getItem("customResourceDefinitionName"))
      .then((res) => {
        console.log(res);
        this.customResourceDefinition = res.data;
      })
      .catch((error) => {
        throw error;
      });
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.customResourceDefinition.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.customResourceDefinition.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.customResourceDefinition.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.customResourceDefinition.metadata.annotations[anno],
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