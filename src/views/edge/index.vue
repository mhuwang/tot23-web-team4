<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 19:37:28
 * @LastEditors: Bernie
 * @LastEditTime: 2021-07-19 18:13:42
-->
<template>
  <div>
    <!-- 边缘拓扑图 -->
    <el-card class="box-card">
      <div ref="chart" style="height: 700px; width: 100%"></div>
    </el-card>
    <br /><br />
    <!-- 节点信息 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">节点信息</span>
      </div>
      <el-table :data="nodes" style="width: 100%" stripe>
        <el-table-column width="40">
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
        </el-table-column>
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
            <!-- <router-link
              :to="'/summary/nodes/' + scope.row.metadata.name"
              @click.native="goToNodeDetails(scope.row.metadata.name)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link> -->
          </template>
          
        </el-table-column>
        <!-- <el-table-column label="标签">
          <template slot-scope="scope">
            <span>k8s-app: {{scope.row.metadata.labels['k8s-app']}}</span>
            <br>
            <span>pod-template-hash: {{scope.row.metadata.labels['pod-template-hash']}}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="status.conditions[0].status" label="准备就绪">
          <template slot-scope="scope">
            {{
              scope.row.status.conditions[0].status == "True"
                ? "就绪"
                : scope.row.status.conditions[0].status == "Unknown"
                ? "未知"
                : "失败"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="metadata.creationTimestamp" label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="showNodeEditDialog(scope.row.metadata.name)"
              >编辑</el-button
            >
      
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <br /><br />
    <!-- 设备列表 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px">设备列表</span>
      </div>
      <el-table :data="devices" style="width: 100%" stripe>
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
        <el-table-column label="设备名字">
           <template slot-scope="scope">
            <router-link
              :to="'/customize/details/object/' + scope.row.metadata.name"
              @click.native="goToObjectDetails(scope.row.metadata.name, scope.row.metadata.namespace)"
              class="link-type"
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.metadata.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column prop="metadata.namespace" label="命名空间">
        </el-table-column>
        <el-table-column prop="status.twins[0].desired.value" label="状态">
          <template slot-scope="scope">
            {{
              scope.row.value== "ON"
                ? "启动"
                : scope.row.value == "OFF"
                ? "失败"
                : "停止"
            }}
          </template>
        </el-table-column>
        <!-- 后期做连接映射 -->
        <el-table-column prop="" label="控制入口">
         <template slot-scope="">
            <a
              style="color: #409eff; text-decoration: underline"
              href="http://edgetest.mc.com/"
              target="_blank"
              >{{ "test" }}</a
            >
          </template>
        </el-table-column>
        <el-table-column prop="metadata.creationTimestamp" label="创建时间">
          <template slot-scope="scope">
            <span>{{
              scope.row.metadata.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 控制 -->
            <!-- <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click=""
              >控制</el-button
            >
            <br /> -->
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delObject(scope.row.metadata.name, scope.row.metadata.namespace)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- edgenode编辑框 -->
     <el-dialog
      title="编辑 Node"
      :visible.sync="editDialogVisible"
      width="70%"
      @closed="handleClose"
      @close="editDialogVisible = false"
      :append-to-body="true"
      :lock-scroll="true"
    >
      <el-tabs value="first" type="card">
        <el-tab-pane label="YAML" name="first">
          <codemirror
            :value="codeYaml"
            :options="cmOptionsYaml"
            @ready="onYamlCmReady"
            @input="onYamlCmCodeChange"
          />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <div class="foot-info">
          <i class="el-icon-warning"></i> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitYamlChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodes: [],
      devices: [],
      /* 公共部分 */
      editDialogVisible: false,
      codeYaml: "", // 编辑框的 yaml 数据
      cmOptionsYaml: {
        // yaml codemirror 配置项
        tabSize: 4,
        mode: "yaml",
        theme: "panda-syntax",
        lineNumbers: true,
        line: true,
      },
    };
  },

  // 初始化方法
  created: function () {
    this.getAllEdgeNodes();
    this.getAllDevices();
  },

  mounted: function () {
    this.initEchart();
  },

  methods: {
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

    /* 编辑部分 */

    // 打开 node 编辑框
    showNodeEditDialog(name) {
      this.$store
        .dispatch("nodes/getNodeYamlByName", name)
        .then((res) => {
          console.log(res);
          this.codeYaml = res.data;
          this.editDialogVisible = true; // 打开编辑对话框
        })
        .catch((error) => {
          throw error;
        });
    },

    // 提交修改
    commitYamlChange() {
      this.$confirm("确认修改？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.$store
            .dispatch("common/changeResourceByYaml", this.codeYaml)
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

    // 获取图表
    initEchart: function () {
      let self = this;
      this.$store
        .dispatch("edge/initEdgeGraph")
        .then((res) => {
          console.log(res);
          const chart = this.$refs.chart;
          if (chart) {
            const myChart = this.$echarts.init(chart);
            let option = {
              title: {
                text: "边缘节点拓扑图",
                top: "top",
                left: "center",
              },

              tooltip: {
                formatter: (params) => {
                  if (params.dataType == "node") {
                    if (params.name == "Pod") {
                      return (
                        "<strong>name:</strong> " +
                        params.data.value +
                        "<br/>" +
                        "<strong>namespace:</strong> " +
                        params.data.namespace
                      );
                    } else {
                      return "<strong>name:</strong> " + params.value;
                    }
                  } else {
                    let a = res.data.nodes.filter((node) => {
                      return node.id == params.data.source;
                    });
                    let b = res.data.nodes.filter((node) => {
                      return node.id == params.data.target;
                    });
                    return b[0].value + " > " + a[0].value;
                  }
                },
              },
              legend: [
                {
                  orient: "vertical",
                  left: "5%",
                  top: "10%",
                  data: res.data.categories.map((a) => a.name),
                },
              ],
              // animationDuration: 1500,
              // animationEasingUpdate: "quinticInOut",
              series: [
                {
                  type: "graph",
                  layout: "none",
                  data: res.data.nodes,
                  links: res.data.links,
                  categories: res.data.categories,
                  legendHoverLink: false,
                  zoom: 0.8,
                  roam: true,
                  center: [0, 0],
                  label: {
                    show: true,
                    position: "right",
                    formatter: function (params) {
                      switch (params.name) {
                        case "Pod":
                          return "容器";
                        case "Edge Node":
                          return "边缘节点";
                        case "Device":
                          return "设备";
                      }
                    },
                  },
                  lineStyle: {
                    color: "source",
                    curveness: 0.3,
                  },
                  emphasis: {
                    scale: true,
                    focus: "adjacency",
                    blurScope: "global",
                    lineStyle: {
                      width: 10,
                    },
                  },
                  animation: true,
                  labelLayout: {
                    hideOverlap: true,
                  },
                },
              ],
            };
            myChart.setOption(option);
            myChart.on("click", function (params) {
              if (params.dataType === "node") {
                // 点击节点
                if (params.name === "Edge Node") {
                  self.$store.dispatch("edge/toDetails", params.value);
                  self.$router.push("/edge/edgenodes/" + params.value);
                } else if (params.name === "Device") {
                  window.location.href = "http://edgetest.mc.com/";
                } else {
                  let podDetails = {
                    podName: params.value,
                    podNamespace: params.data.namespace,
                  };
                  self.$store.dispatch("pods/toDetails", podDetails);
                  self.$router.push("/workload/pods/" + params.value);
                }
              } else if (params.dataType === "edge") {
                // 点击连接线
                console.log("click edge");
              } else {
                console.log("click");
              }
            });
          }
        })
        .catch((error) => {
          throw error;
        });
    },

    // 获取 edge 节点信息
    getAllEdgeNodes: function () {
      this.$store
        .dispatch("edge/getAllEdgeNodes")
        .then((res) => {
          console.log(res);
          // 过滤掉 edge 节点
          this.nodes = res.data;
        })
        .catch((error) => {
          throw error;
        });
    },
    //获取所有设备
    getAllDevices() {
      this.$store
        .dispatch("edge/getAllDevices", "devices.devices.kubeedge.io")
        .then((res) => {
          console.log(res.data);
          this.devices = res.data.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    goToEdgeNodeDetails: function (edgenodeName) {
      this.$store.dispatch("edge/toDetails", edgenodeName);
    },
    // goToNodeDetails: function (nodeName) {
    //   this.$store.dispatch("nodes/toDetails", nodeName);
    // },


    goToObjectDetails: function (name,namespace) {
       let objectDetails = {
        crdName: "devices.devices.kubeedge.io",
        objectName: name,
        objectNamespace: namespace,
      };
      this.$store.dispatch("customize/toObjectDetails", objectDetails);
    },
    delObject: function (name,namespace) {
       let objectDetails = {
        crdName: "devices.devices.kubeedge.io",
        objectName: name,
        objectNamespace: namespace,
      };
      this.$confirm("确认删除 CRD？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store
          .dispatch("customize/delObject", objectDetails)
          .then((res) => {
            if(res.code == 1200) {
              this.getObjectList();
            } else {
              this.$message.error("删除失败");
            }
          })
          .catch((error) => {
            throw error;
          });
      }).catch(()=>{

      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>