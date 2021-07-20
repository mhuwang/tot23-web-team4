<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-05-11 20:19:00
 * @LastEditors: Bernie
 * @LastEditTime: 2021-07-18 15:15:57
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有镜像</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 搜索区域 -->
          <el-input
            placeholder="请输入搜索内容"
            v-model="query"
            clearable
            @clear="getAllImages"
          >
            <!-- 搜索按钮  -->
            <el-button
              slot="append"
              size="large"
              icon="el-icon-search"
              @click="getAllImages"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="currentImages"
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
      >
        <el-table-column label="id">
          <template slot-scope="scope">
            <router-link
              :to="'/image/' + scope.row.id"
              @click.native="goToImageDetails(scope.row.id)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.id.substring(7, 19)
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="tags" label="标签"> </el-table-column>
        <el-table-column prop="size" label="大小"
          ><template slot-scope="scope">
            {{ (scope.row.size / 1000 / 1000).toFixed(1) }} MB
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delImage(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="6"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  <!-- <div>
    <iframe id="mainframe" width="96%" style="min-height: 1260px;" scrolling="no" frameborder="0" noresize="noresize" name="mainframe" src="http://172.18.7.22:180/"> </iframe>
  </div> -->
  </div>
 
</template>

<script>
export default {
  data() {
    return {
      query: "",
      images: [],
      total: 0,
      currentImages: [],
      loading: true,
    };
  },

  created() {
    this.getAllImages();
  },

  methods: {
    // 获取所有镜像
    getAllImages: function () {
      this.$store
        .dispatch("image/getAllImages")
        .then((res) => {
          console.log(res);
          this.images = res.data;
          this.total = res.data.length;
          this.currentImages = res.data.slice(0, 6);
          this.loading = false;
        })
        .catch((error) => {
          throw error;
        });
    },

    // 删除镜像
    delImage: function (imageId) {
      this.$confirm("删除镜像?", "删除")
        .then((res) => {
          this.$store
            .dispatch("image/delImage", imageId)
            .then((res) => {})
            .catch((error) => {});
        })
        .catch((error) => {
          console.log("cancel");
        });
    },

    // 处理分页
    handleCurrentChange: function (page) {
      this.currentImages = this.images.slice((page - 1) * 6, page * 6);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 95%;
}
.el-table {
  margin-bottom: 15px;
  background: #f0f9eb;
}
</style>