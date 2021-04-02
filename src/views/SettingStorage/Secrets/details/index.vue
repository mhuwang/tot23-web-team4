
<template>
  <h1>Secrets Details</h1>
</template>

<script>
export default {
  data() {
    return {
      secret: {},
      secretName: "",
      secretNamespace: "",
    };
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
        console.log(res);
        this.secret = res.data;
      })
      .catch((error) => {
        throw error;
      });
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
          value: this.se.metadata.annotations[anno],
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