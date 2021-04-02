<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-30 19:58:14
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-30 22:32:48
-->

<template>
    <h1>
      Ingress Details
    </h1>
</template>

<script>
// export default {
//   data() {
//     return {
//       ingress: {},
//       ingress: "",
//       ingresstNamespace: "",
//     };
//   },

//   // 生命周期方法
//   mounted: function () {

//     /* name */
//     // 为空，直接存储
//     if (sessionStorage.getItem("ingressName") == null) {
//       sessionStorage.setItem("ingressName", this.$store.state.ingresses.ingress.ingressName);
//       this.ingressName = this.$store.state.ingresses.ingress.ingressName;
//     }
//     // 不为空，且当前 ingressName 有值，同时和之前的不一样，更新 ingressName
//     else if (
//       this.$store.state.ingresses.ingress.ingressName != "" &&
//       sessionStorage.getItem("ingressName") != this.$store.state.ingresses.ingress.ingressName
//     ) {
//       sessionStorage.setItem("ingressName", this.$store.state.ingresses.ingress.ingressName);
//       this.ingressName = this.$store.state.ingresses.ingress.ingressName;
//     }

    
//     /* namespace */
//     // 为空，直接存储
//     if (sessionStorage.getItem("deploymentNamespace") == null) {
//       sessionStorage.setItem("deploymentNamespace", this.$store.state.deployments.deployment.deploymentNamespace);
//       this.deploymentNamespace = this.$store.state.deployments.deployment.deploymentNamespace;
//     }
//     // 不为空，且当前 deploymentNamespace 有值，同时和之前的不一样，更新 deploymentNamespace
//     else if (
//       this.$store.state.deployments.deployment.deploymentNamespace != "" &&
//       sessionStorage.getItem("deploymentNamespace") != this.$store.state.deployments.deployment.deploymentNamespace
//     ) {
//       sessionStorage.setItem("deploymentNamespace", this.$store.state.deployments.deployment.deploymentNamespace);
//       this.deploymentNamespace = this.$store.state.deployments.deployment.deploymentNamespace;
//     }

    
//     // 获取数据
//     let ing = {
//       name: sessionStorage.getItem("deploymentName"),
//       namespace: sessionStorage.getItem("deploymentNamespace"),
//     };
//     this.$store
//       .dispatch("deployments/getDeploymentsByNameAndNamespace", ing)
//       .then((res) => {
//         console.log(res);
//         this.deployment = res.data;
//       })
//       .catch((error) => {
//         throw error;
//       });
//   },

//   computed: {
//     // 元数据下的标签
//     labels() {
//       let labelArr = [];
//       for (let pro in this.deployment.metadata.labels) {
//         labelArr.push({
//           key: pro,
//           value: this.deployment.metadata.labels[pro],
//         });
//       }
//       return labelArr;
//     },

//     // 元数据下的注释
//     annotations() {
//       let annoArr = [];
//       for (let anno in this.deployment.metadata.annotations) {
//         annoArr.push({
//           key: anno,
//           value: this.deployment.metadata.annotations[anno],
//         });
//       }
//       return annoArr;
//     },
//   }
  
// };
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