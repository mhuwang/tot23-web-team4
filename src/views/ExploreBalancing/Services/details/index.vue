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
        service details
    </h1>
</template>

<script>
// export default {
//   data() {
//     return {
//       service: {},
//       serviceName: "",
//       serviceNamespace: "",
//     };
//   },

//   // 生命周期方法
//   mounted: function () {

//     /* name */
//     // 为空，直接存储
//     if (sessionStorage.getItem("serviceName") == null) {
//       sessionStorage.setItem("serviceName", this.$store.state.services.service.serviceName);
//       this.serviceName = this.$store.state.services.service.serviceName;
//     }
//     // 不为空，且当前 serviceName 有值，同时和之前的不一样，更新 serviceName
//     else if (
//       this.$store.state.services.service.serviceName != "" &&
//       sessionStorage.getItem("serviceName") != this.$store.state.services.service.serviceName
//     ) {
//       sessionStorage.setItem("serviceName", this.$store.state.services.service.serviceName);
//       this.serviceName = this.$store.state.services.service.serviceName;
//     }

    
//     /* namespace */
//     // 为空，直接存储
//     if (sessionStorage.getItem("serviceNamespace") == null) {
//       sessionStorage.setItem("serviceNamespace", this.$store.state.services.service.serviceNamespace);
//       this.serviceNamespace = this.$store.state.services.service.serviceNamespace;
//     }
//     // 不为空，且当前 serviceNamespace 有值，同时和之前的不一样，更新 serviceNamespace
//     else if (
//       this.$store.state.services.service.serviceNamespace != "" &&
//       sessionStorage.getItem("serviceNamespace") != this.$store.state.services.service.serviceNamespace
//     ) {
//       sessionStorage.setItem("serviceNamespace", this.$store.state.services.service.serviceNamespace);
//       this.serviceNamespace = this.$store.state.services.service.serviceNamespace;
//     }

    
//     // 获取数据
//     let ing = {
//       name: sessionStorage.getItem("serviceName"),
//       namespace: sessionStorage.getItem("serviceNamespace"),
//     };
//     this.$store
//       .dispatch("services/getservicesByNameAndNamespace", ing)
//       .then((res) => {
//         console.log(res);
//         this.service = res.data;
//       })
//       .catch((error) => {
//         throw error;
//       });
//   },

//   computed: {
//     // 元数据下的标签
//     labels() {
//       let labelArr = [];
//       for (let pro in this.service.metadata.labels) {
//         labelArr.push({
//           key: pro,
//           value: this.service.metadata.labels[pro],
//         });
//       }
//       return labelArr;
//     },

//     // 元数据下的注释
//     annotations() {
//       let annoArr = [];
//       for (let anno in this.service.metadata.annotations) {
//         annoArr.push({
//           key: anno,
//           value: this.service.metadata.annotations[anno],
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