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
        {{ customResourceDefinition.metadata.name }}
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
          <span>{{ customResourceDefinition.metadata.name }}</span>
        </div>
        <div class="metadata-item">
          <p>创建时间</p>
          <span>{{
            customResourceDefinition.metadata.creationTimestamp.replaceAll(
              /[TZ]/g,
              " "
            )
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
    <!-- 资源信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">资源信息</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>版本</p>
          <span>{{ customResourceDefinition.spec.versions[0].name }}</span>
        </div>
        <div class="metadata-item">
          <p>范围</p>
          <span>{{ customResourceDefinition.spec.scope }}</span>
        </div>
        <div class="metadata-item">
          <p>Group</p>
          <span>{{ customResourceDefinition.spec.group }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />
    <!-- 允许的名称 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">允许的名称</span>
      </div>
      <List item-layout="horizontal" :split="false">
        <div class="metadata-item">
          <p>复数</p>
          <span>{{ customResourceDefinition.spec.names.plural }}</span>
        </div>
        <div class="metadata-item">
          <p>单数</p>
          <span>{{ customResourceDefinition.spec.names.singular }}</span>
        </div>
        <div class="metadata-item">
          <p>种类</p>
          <span>{{ customResourceDefinition.spec.names.kind }}</span>
        </div>
        <div class="metadata-item">
          <p>列出种类</p>
          <span>{{ customResourceDefinition.spec.names.listKind }}</span>
        </div>
        <div class="metadata-item">
          <p>短名称</p>
          <span>{{ customResourceDefinition.spec.names.shortNames[0] }}</span>
        </div>
      </List>
    </el-card>
    <br /><br />
    <!-- Objects -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">Objects</span>
      </div>
      <el-table :data="objects" style="width: 100%" stripe>
        <!-- <el-table-column width="40">
          <template slot-scope="scope">
            <svg-icon
              :icon-class="
                scope.row.status.conditions[0].status == 'True'
                  ? 'load-success'
                  : scope.row.status.conditions[0].status == 'Unknown'
                  ? 'load-doubt'
                  : 'load-failed'
              "
            />
          </template>
        </el-table-column> -->
        <el-table-column label="名字">
          <template slot-scope="scope">
            <router-link
              :to="'/edge/edgenodes/' + scope.row.metadata.name"
              @click.native="goToEdgeNodeDetails(scope.row.metadata.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="metadata.namespace" label="命名空间">
        </el-table-column>
        <!-- <el-table-column
          prop="status.twins[0].desired.value"
          label="状态"
        >
        </el-table-column> -->
        <el-table-column prop="metadata.creationTimestamp" label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="是否可调度" width="100">
          作用域插槽
          <template slot-scope="scope">
            {{scope.row}} 每一行封存的数据
            <el-switch
              v-model="!scope.row.spec.unschedulable"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNodeEditDialog(scope.row)"
              >编辑</el-button
            >
            <br />
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delNode(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br /><br />

    <!-- 状态-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 16px">状态</span>
      </div>
      <el-table
        :data="customResourceDefinition.status.conditions"
        style="width: 100%"
        stripe
      >
        <el-table-column prop="type" label="类别"> </el-table-column>
        <el-table-column prop="status" label="状态" width="120">
        </el-table-column>
        <el-table-column label="最后迁移时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastTransitionTime.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="原因"> </el-table-column>
        <el-table-column prop="message" label="信息"> </el-table-column>
      </el-table>
    </el-card>
    <br /><br />

    <br /><br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      customResourceDefinition: {},
      customResourceDefinitionName: "",
      objects: [],
    };
  },
  // 生命周期方法
  mounted: function () {
    /* name */
    // 为空，直接存储
    if (sessionStorage.getItem("customResourceDefinitionName") == null) {
      sessionStorage.setItem(
        "customResourceDefinitionName",
        this.$store.state.customize.customResourceDefinitionName
      );
      this.customResourceDefinitionName = this.$store.state.customize.customResourceDefinitionName;
    }
    // 不为空，且当前 customResourceDefinitionName 有值，同时和之前的不一样，更新 customResourceDefinitionName
    else if (
      this.$store.state.customize.customResourceDefinitionName != "" &&
      sessionStorage.getItem("customResourceDefinitionName") !=
        this.$store.state.customize.customResourceDefinitionName
    ) {
      sessionStorage.setItem(
        "customResourceDefinitionName",
        this.$store.state.customize.customResourceDefinitionName
      );
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

    // 获取该CRD
    this.$store
      .dispatch(
        "customize/getCustomResourceDefinitionByName",
        sessionStorage.getItem("customResourceDefinitionName")
      )
      .then((res) => {
        console.log(res);
        this.customResourceDefinition = res.data;
      })
      .catch((error) => {
        throw error;
      });
    //通过CRD名字获取对象列表
    this.$store
      .dispatch(
        "customize/getCustomResourceDefinitionObjectListbyName",
        sessionStorage.getItem("customResourceDefinitionName")
      )
      .then((res) => {
        console.log(res);
        this.objects = res.data.items;
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