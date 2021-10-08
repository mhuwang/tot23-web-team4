<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-05-11 20:19:00
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-10-08 20:05:45
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有镜像</span>
      </div>
      <el-row :gutter="20">
        <!-- <el-col :span="6">
          <!-- 搜索区域 
          <el-input
            placeholder="请输入搜索内容"
            v-model="query"
            clearable
            @clear="getAllImages"
          >
            <!-- 搜索按钮  
            <el-button
              slot="append"
              size="large"
              icon="el-icon-search"
              @click="getAllImages"
            ></el-button>
          </el-input>
        </el-col> -->
        <el-col :span="6">
          <el-button type="primary" @click="uploadShow = true">
            点击上传镜像
          </el-button>
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
        <el-table-column prop="tags" label="标签" width="280">
          <template slot-scope="scope">
            <el-tag style="margin-top: 5px" v-for="tag in scope.row.tags">
              {{ tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="size" label="大小"
          ><template slot-scope="scope">
            {{ (scope.row.size / 1000 / 1000).toFixed(1) }} MB
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" width="160">
        </el-table-column>

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
    <el-dialog
      title="提示"
      :visible.sync="uploadShow"
      width="30%"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        ref="upload"
        name="image"
        action="http://localhost:8081/images/uploadImage"
        :on-success="uploadSuccessFunc"
        :on-error="uploadErrorFunc"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          请上传 docker 镜像文件,大小在500MB以下
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadShow = false">取 消</el-button>
        <el-button type="primary" @click="uploadShow = false">确 定</el-button>
      </span>
    </el-dialog>
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
      uploadShow: false, // 上传框
    };
  },

  computed: {
    tags() {
      let tagArr = [];
      for (let tag in this.image.repoTags) {
        tagArr.push({
          value: this.image.repoTags[tag],
        });
      }
      return tagArr;
    },
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
            .then((res) => {
              if (res.code == 1200) {
                this.$message.success(res.message);
                this.getAllImages();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          console.log("cancel");
        });
    },

    // 处理分页
    handleCurrentChange: function (page) {
      this.currentImages = this.images.slice((page - 1) * 6, page * 6);
    },

    // 上传镜像成功
    uploadSuccessFunc: function (response, file, fileList) {
      console.log("success");
      console.log("response", response);
      console.log("file", file);
      console.log("fileList", fileList);
      if (response.code == 1200) {
        this.$message.success(response.message);
        this.getAllImages();
      } else {
        this.$message.error(response.message);
      }
      this.getAllImages();
    },

    // 上传镜像失败
    uploadErrorFunc: function (err, file, fileList) {
      console.log("error");
      console.log("err", err);
      console.log("file", file);
      console.log("fileList", fileList);
    },

    // 添加镜像
    uploadFile: function (param) {
      // "http://localhost:8081/images/uploadImage"
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card {
  width: 95%;
}
.el-table {
  background: #f0f9eb;
  margin: 15px 0px;
  border-top: 1px solid #ccc; 
}
</style>