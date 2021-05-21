<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-05-16 16:33:04
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-05-17 15:07:50
-->
<template>
  <div>
    <el-divider content-position="left"
      ><span style="font-weight: bold; font-size: 20px">{{
        image.repoDigests[0].split("@")[0]
      }}</span></el-divider
    >

    <!-- 镜像标签 -->
    <div v-if="image.repoTags.length != 0">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="font-size: 16px">镜像标签</span>
        </div>
        <div class="metadata-item">
          <li v-for="(tag, index) in tags" :key="index">
            <el-tag
              class="lebel-tag"
              effect="dark"
              size="medium"
              color="#bedcfa"
              >{{ tag.value }}</el-tag
            >
          </li>
        </div>
      </el-card>
      <br /><br />
    </div>

    <!-- 镜像详情 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">镜像信息</span>
      </div>
      <el-row>
        <el-col :span="2"> ID </el-col>
        <el-col :span="20">
          {{ image.id }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"> Size </el-col>
        <el-col :span="20">
          {{ (image.size / 1000 / 1000).toFixed(1) }} MB
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"> Created </el-col>
        <el-col :span="20">
          {{ image.created.substring(0, 19).replaceAll(/[TZ]/g, " ") }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2"> Build </el-col>
        <el-col :span="20">
          Docker {{ image.dockerVersion }} on {{ image.os }}, {{ image.arch }}
        </el-col>
      </el-row>
    </el-card>
    <br /><br />

    <!-- Dockerfile 详情 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">Dockerfile 详情</span>
      </div>
      <el-row v-if="image.config.cmd">
        <el-col :span="4"> CMD </el-col>
        <el-col :span="20">
          {{ image.config.cmd.join(" ") }}
        </el-col>
      </el-row>
      <el-row v-if="image.config.entrypoint">
        <el-col :span="4"> Entrypoint </el-col>
        <el-col :span="20">
          {{ image.config.entrypoint[0] }}
        </el-col>
      </el-row>
      <el-row v-if="image.config.exposedPorts">
        <el-col :span="4"> Expose </el-col>
        <el-col :span="20">
          {{ image.config.exposedPorts[0].port }}/{{
            image.config.exposedPorts[0].protocol
          }}
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4"> Env </el-col>
        <el-col :span="20">
          <el-row v-for="(e, index) in image.config.env" :key="index">
            <el-col :span="6">{{ e.split("=")[0] }}</el-col>
            <el-col :span="18">{{ e.split("=")[1] }}</el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <br /><br />

    <!-- Image layers -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">镜像历史信息</span>
      </div>
      <el-table
        :data="layers"
        style="width: 100%"
        stripe
        v-loading="loading"
        element-loading-text="获取数据中..."
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column label="大小" width="80"
          ><template slot-scope="scope">
            {{ (scope.row.Size / 1000 / 1000).toFixed(1) }} MB
          </template>
        </el-table-column>
        <el-table-column prop="CreatedBy" label="信息">
          <template slot-scope="scope">
            {{scope.row.CreatedBy.replaceAll(/\/bin\/sh -c #\(nop\)/g, "")}}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      layers: [],
      image: {},
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
    let id = this.getImageId();
    this.id = id;
    console.log(id);
    this.$store
      .dispatch("image/getImageById", id)
      .then((res) => {
        this.layers = JSON.parse(res.data.layers).sort(
          (a, b) => a.Created - b.Created
        );
        this.image = res.data.image;
        console.log(this.layers);
        console.log(this.image);
      })
      .catch((error) => {
        throw error;
      });
  },

  methods: {
    getImageDetailsById() {
      let id = this.getImageId();
      this.$store
        .dispatch("images/getImageById", id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          throw error;
        });
    },

    getImageId() {
      // 获取最后一个 / 的位置
      let index = this.$route.path.lastIndexOf("/");
      return this.$route.path.substring(index + 1, this.$route.path.length);
    },
  },
};
</script>

<style lang="scss" scoped>
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

.el-row {
  margin-bottom: 10px;
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
</style>