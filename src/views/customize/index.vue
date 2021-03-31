<!--
 * @Descripttion: 自定义资源页面
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-24 19:47:38
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 CRD</span>
      </div>
      <el-table :data="CRDs" style="width: 100%" stripe>
        <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon :icon-class="scope.row.status.conditions[3].status == 'True'? 'load-success': scope.row.status.conditions[3].status == 'Unknown'?'load-doubt':'load-failed'"/>
          </template>
        </el-table-column>
        <el-table-column prop="" label="名字"></el-table-column>
        <el-table-column prop="" label="Group"> </el-table-column>
        <el-table-column prop="" label="全名"></el-table-column> -->
        <el-table-column prop="spec.nodeName" width="140" label="Nmaespaceed"> </el-table-column>
        <el-table-column prop="status.podIP" width="140" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
        
        <!-- <template slot-scope="scope">
            
            <el-button type="primary" icon="el-icon-plus" size="small" @click="showClasterRolesAddDialog(scope.row)">增加</el-button>
            
            <el-button type="warning" icon="el-icon-edit" size="small" @click="showClasterRolesEditDialog(scope.row)">编辑</el-button>
            
            <el-button type="danger" icon="el-icon-delete" size="small" @click="delClasterRoles(scope.row)">删除</el-button>
        </template> -->
        
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CRDs",

  data() {
    return {
      CRDs: [],
    };
  },

  created() {
    this.getCRDs();
  },

  methods: {
    // 获取所有 CRD
    getCRDs() {
      this.$store
        .dispatch("customize/getCustomResourceDefinition")
        .then((res) => {
          console.log(res.data);
          this.getCRDs = res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>