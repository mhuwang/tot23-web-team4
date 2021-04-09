<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-04-07 10:49:10
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>热门服务</span>
      </div>
      <highlightjs java :code="code" />
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      code: "public static InputStream byPath(String path) throws FileNotFoundException { \n" +
        "    File file = new File(path);\n" + 
        "    FileInputStream fileInputStream = new FileInputStream(file);\n" + 
        "    InputStream yamlInputStream = fileInputStream;\n" + 
        "    return yamlInputStream;\n" + 
      " }",
    }
  }
};
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  display: inline-block;
}
</style>