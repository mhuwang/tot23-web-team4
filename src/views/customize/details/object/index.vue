<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Bernie
 * @Date: 2021-04-12 10:43:03
 * @LastEditors: Bernie
 * @LastEditTime: 2021-04-29 15:49:07
-->
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
        {{ objects.metadata.name }}
      </span>
    </el-divider>
    <!-- 元数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">元数据</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>名字</p>
          <span>{{ objects.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            objects.metadata.creationTimestamp.replaceAll(
              /[TZ]/g,
              " "
            )
          }}</span>
        </div>
        <div class="metadata-item">
          <p>UID</p>
          <span>{{ objects.metadata.uid }}</span>
        </div>
      </List>
      <!-- 元数据 标签 注释部分 如果没有标签就不显示   -->
      <List item-layout="horizontal" :split="false">
        <div v-if="labels.length != 0" class="metadata-item">
          <p>标签</p>
          <li v-for="label in this.labels" :key="label">
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
          <li v-for="anno in this.annotations" :key="anno">
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
   <!-- 数据-->
   <!-- <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea">
    </el-input> -->
    <el-card class="box-card">
    <el-tabs value="first" type="card">
        <el-tab-pane label="YAML" name="first">
          <codemirror
            :value="codeYaml"
            :options="cmOptionsYaml"
            @ready="onYamlCmReady"
            @input="onYamlCmCodeChange"
          />
          
        </el-tab-pane>
        <!-- <el-tab-pane label="JSON" name="second">
          <codemirror
            ref="cmYamlEditor"
            :value="codeJSON"
            :options="cmOptions"
            @ready="onJSONCmReady"
            @input="onJSONCmCodeChange"
          />
        </el-tab-pane> -->
    </el-tabs>
    <el-row>
      <el-button type="primary" @click="commitYamlChange()">确 定</el-button>
    </el-row>
    </el-card>
   <!--- 活动-->
   <br /><br />

    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">活动</span>
      </div>
      <el-table :data="currentEvents"> -->
        <!-- <el-table-column type="index"></el-table-column> -->
        <!-- <el-table-column prop="message" label="信息"> </el-table-column>
        <el-table-column prop="resource" label="资源"> </el-table-column>
        <el-table-column
          prop="childObject"
          :show-overflow-tooltip="true"
          label="子对象"
        >
        </el-table-column>
        <el-table-column prop="count" label="次数"> </el-table-column>
        <el-table-column prop="count" label="初次">
          <template slot-scope="scope">
            <span>{{ scope.row.firstTime.replaceAll(/[TZ]/g, " ") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后一次">
          <template slot-scope="scope">
            <span>{{ scope.row.lastTime.replaceAll(/[TZ]/g, " ") }}</span>
          </template></el-table-column
        >
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card> --> 


    
    <br /><br />

    <br /><br />
  </div>
</template>

<script>
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/yaml/yaml.js";
// import theme style
import "codemirror/theme/panda-syntax.css";

export default {
  data() {
    return {
      crdName: "",
      objectName: "",
      objectNamespace: "",
      objects: {},
      textarea: '',
      loading: true, // 获取数据中
      codeJSON: "", // 编辑框的 json 数据
      codeYaml: "", // 编辑框的 yaml 数据

      total: 0, // 总事件数
      events: [], // 所有事件
      currentEvents: [], // 当前页面的事件
    };
  },
  methods: {
    // 处理分页
    handleCurrentChange(page) {
      // console.log(page);
      this.currentEvents = this.events.slice((page - 1) * 10, page * 10);
    },
    // 编辑器方法
    /* yaml */
    onYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onYamlCmCodeChange(newCode) {
      this.codeYaml = newCode;
    },
    // 添加的 yaml 框
    onAddYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onAddYamlCmCodeChange(newCode) {
      this.addYaml = newCode;
    },

    /* JSON */
    onJSONCmReady(cm) {
      setTimeout(() => {
        cm.refresh();
      }, 50);
    },

    onJSONCmCodeChange(newCode) {
      //console.log("this is new code", newCode);
      this.codeJSON = newCode;
    },

    // 提交修改
    commitYamlChange() {
     let data = {
        codeyaml: this.codeYaml,
        crdname: sessionStorage.getItem("crdName"),
      };

      this.$confirm("确认修改？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeCrdObjectByYaml", data)
            .then((res) => {
              switch (res.code) {
                case 1200:
                  this.$message.success("修改成功");
                  break;
                case 1201:
                  this.$message.error("修改失败，请查看 yaml 文件格式");
                  break;
                case 1202:
                  this.$message.error("创建失败，请查看云平台相关错误信息");
                  break;
                default:
                  this.$message.info("提交成功");
                  break;
              }
              this.editDialogVisible = false;
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch(() => {
          console.log("cancel");
        });
    },
  },
  // 生命周期方法
  mounted: function () {
    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("objectName") == null) {
      sessionStorage.setItem(
        "objectName",
        this.$store.state.customize.objectDetails.objectName
      );
      this.objectName = this.$store.state.customize.objectDetails.objectName;
    }
    // 不为空，且当前 customResourceDefinitionName 有值，同时和之前的不一样，更新 customResourceDefinitionName
    else if (
      this.$store.state.customize.objectDetails.objectName != "" &&
      sessionStorage.getItem("objectName") !=
        this.$store.state.customize.objectDetails.objectName
    ) {
      sessionStorage.setItem(
        "objectName",
        this.$store.state.customize.objectDetails.objectName
      );
      this.objectName = this.$store.state.customize.objectDetails.objectName;
    }

    /* namespace */
    // 为空，直接存储
    if (sessionStorage.getItem("objectNamespace") == null) {
      sessionStorage.setItem("objectNamespace", this.$store.state.customize.objectDetails.objectNamespace);
      this.objectNamespace = this.$store.state.customize.objectDetails.objectNamespace;
    }
    // 不为空，且当前 deploymentNamespace 有值，同时和之前的不一样，更新 deploymentNamespace
    else if (
      this.$store.state.customize.objectDetails.objectNamespace != "" &&
      sessionStorage.getItem("objectNamespace") != this.$store.state.customize.objectDetails.objectNamespace
    ) {
      sessionStorage.setItem("objectNamespace", this.$store.state.customize.objectDetails.objectNamespace);
      this.objectNamespace = this.$store.state.customize.objectDetails.objectNamespace;
    }
    
    //crdName为空
    if (sessionStorage.getItem("crdName") == null) {
      sessionStorage.setItem("crdName", this.$store.state.customize.objectDetails.crdName);
      this.crdName = this.$store.state.customize.objectDetails.crdName;
    }
    // 不为空，且当前 crdName 有值，同时和之前的不一样，更新 crdName
    else if (
      this.$store.state.customize.objectDetails.crdName != "" &&
      sessionStorage.getItem("crdName") != this.$store.state.customize.objectDetails.crdName
    ) {
      sessionStorage.setItem("crdName", this.$store.state.customize.objectDetails.crdName);
      this.crdName = this.$store.state.customize.objectDetails.crdName;
    }


    let objectDetails= {
        crdName: sessionStorage.getItem("crdName"),
        objectName: sessionStorage.getItem("objectName"),
        objectNamespace: sessionStorage.getItem("objectNamespace"),
    };
    
    // 获取 objectyaml 格式
      this.$store
        .dispatch("customize/getObjectYamlByName", objectDetails)
        .then((res) => {
           console.log(res);
          // let json = JSON.stringify(res.data);
          // this.codeJSON = this.beautify(json, {
          //   indent_size: 4,
          //   space_in_empty_paren: true,
          // });
          this.codeYaml = res.data;
          this.editDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });

      // json 格式
      // this.$store
      //   .dispatch("customize/getCustomResourceDefinitionByName", name)
      //   .then((res) => {
      //     // console.log(res);
      //     let json = JSON.stringify(res.data.pod);
      //     this.codeJSON = this.beautify(json, {
      //       indent_size: 4,
      //       space_in_empty_paren: true,
      //     });
      //   })
      //   .catch((error) => {
      //     throw error;
      //   });
    
   // 获取该Object
    this.$store
      .dispatch(
        "customize/getObjectByNameAndNamespace",objectDetails)
      .then((res) => {
        console.log(res);
        this.objects = res.data.objectdefinition;
      })
      .catch((error) => {
        throw error;
      });
    
  },

  computed: {
    // 元数据下的标签
    labels() {
      let labelArr = [];
      for (let pro in this.objects.metadata.labels) {
        labelArr.push({
          key: pro,
          value: this.objects.metadata.labels[pro],
        });
      }
      return labelArr;
    },

    // 元数据下的注释
    annotations() {
      let annoArr = [];
      for (let anno in this.objects.metadata.annotations) {
        annoArr.push({
          key: anno,
          value: this.objects.metadata.annotations[anno],
        });
      }
      return annoArr;
    },
  },
};
</script>
<style lang="scss" scoped>
.usage-cpu-tag-success {
  color: white;
  text-align: center;
  background-color: #387c6d;
  border-radius: 10px;
}
.usage-memory-tag-success {
  color: white;
  text-align: center;
  background-color: #28527a;
  border-radius: 10px;
}
.usage-cpu-tag-zero,
.usage-memory-tag-zero {
  color: white;
  text-align: center;
  background-color: #aaa;
  border-radius: 10px;
}
.usage-cpu-tag-failed,
.usage-memory-tag-failed {
  color: #333;
  text-align: center;
  border-radius: 10px;
}

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