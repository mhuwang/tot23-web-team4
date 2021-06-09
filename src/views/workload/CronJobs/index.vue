<!--
 * @Description: your project
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-17 15:26:16
 * @LastEditors: zqy
 * @LastEditTime: 2021-05-10 19:47:47
-->

<template>
  <div>
    <!-- CronJobs 主体部分 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>所有 定时任务</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 搜索区域 -->
          <el-select
            v-model="value"
            filterable
            clearable
            size="large"
            style="width: 100%"
            placeholder="请选择命名空间"
            @change="selectChange"
            @clear="clearSelect"
            @focus="initNamespace"
          >
            <el-option
              v-for="item in namespaces"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <!-- 搜索按钮
            <el-button
              slot="append"
              size="large"
              icon="el-icon-plus"
              @click="getPods"
            ></el-button> -->
        </el-col>
        <!-- 添加按钮 -->
        <!-- <el-col :span="4">
          <el-button
            type="primary"
            size="large"
            icon="el-icon-plus"
            @click="addDialogVisible = true"
          >
            添加
          </el-button>
        </el-col> -->
      </el-row>
      <el-table :data="cronJobsInCurrentPage" style="width: 100%" stripe>
        <el-table-column width="40">
          <template>
            <svg-icon :icon-class="'load-success'" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称">
          <template slot-scope="scope">
            <router-link
              :to="{
                name: 'CronJob 详情',
                params: {
                  name: scope.row.name + ',' + scope.row.namespace,
                },
              }"
              class="link-type"
              @click.native="
                goToCronJobDetails(scope.row.name, scope.row.namespace)
              "
            >
              <span style="color: #409eff; text-decoration: underline">{{
                scope.row.name
              }}</span>
            </router-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="apiVersion" label="版本"> </el-table-column> -->
        <el-table-column prop="namespace" label="命名空间" />
        <el-table-column prop="schedule" label="调度" />
        <!-- <el-table-column label="暂停">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="运行"
              inactive-text="暂停"
              @change="changeCronJobSuSpend(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="运行中">
          <template slot-scope="scope">
            {{ scope.row.runningJobs }}
          </template>
        </el-table-column>
        <el-table-column label="最后调度时间" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.lastSchedulingTime.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template slot-scope="scope">
            <span>{{
              scope.row.creationTimestamp.replaceAll(/[TZ]/g, " ")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 -->
            <el-button
              style="margin-bottom: 5px"
              type="primary"
              icon="el-icon-edit"
              size="small"
              @click="
                showCronJobEditDialog(scope.row.name, scope.row.namespace)
              "
            >编辑</el-button>
            <br>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="delCronJob(scope.row.name, scope.row.namespace)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        layout=" prev, pager, next, jumper, ->, total, slot"
        :total="cronJobsAmount"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- CronJob 编辑框 -->
    <el-dialog
      title="编辑 CronJob"
      :visible.sync="editDialogVisible"
      width="70%"
      :append-to-body="true"
      :lock-scroll="true"
      @closed="handleClose"
      @close="editDialogVisible = false"
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
          <i class="el-icon-warning" /> 此操作相当于 kubectl apply -f
          &ltspec.yaml>
        </div>
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="commitYamlChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import language js
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/yaml/yaml.js'
// import theme style
import 'codemirror/theme/panda-syntax.css'

export default {
  name: 'CronJobs',

  data() {
    return {
      /** 基础信息 */
      cronJobs: [], // 所有CronJobs
      loading: true, // 获取数据中
      cronJobSuSpend: true, // CronJob 可调度情况
      /** 命名空间*/
      namespaces: [], // 命名空间
      value: '',
      /** 分页 */
      cronJobsAmount: 0, // CronJob 总数
      currentPage: 1, // 分页绑定当前页
      cronJobsInCurrentPage: [], // 页面中的 CronJobs
      pageSize: 6, // 一页显示数量
      /** 编辑 */
      codeYaml: '', // 编辑框的 yaml 数据
      addYaml: '', // 添加框的 yaml 数据
      editDialogVisible: false, // 编辑详情框
      addDialogVisible: false, // 添加框详情
      cmOptionsYaml: {
        // yaml codemirror 配置项
        tabSize: 4,
        mode: 'yaml',
        theme: 'panda-syntax',
        lineNumbers: true,
        line: true
      }
    }
  },

  created() {
    this.getCronJobs()
  },

  methods: {
    /** 基础 */
    // 详情页
    goToCronJobDetails: function(cronJobName, cronJobNamespace) {},
    // 获取所有 CronJobs
    getCronJobs(namespace) {
      this.$store
        .dispatch('cronJobs/getAllCronJobs', namespace)
        .then((res) => {
          console.log(res.data.message);
          this.cronJobs = res.data
          this.cronJobsAmount = this.cronJobs.length
          this.cronJobsInCurrentPage = this.cronJobs.slice(0, this.pageSize)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 修改 CronJob 的为暂停或者运行
    changeCronJobSuSpend(cronJob) {
      // this.$store.dispatch("cronJobs/changeCronJobSuSpend")
      // .then((res) => {
      //   this.cronJobSuSpend = res.data;
      // }).catch((error) => {
      //   console.log(error);
      // })
    },

    /** 按命名空间查询 */
    // 当选择框聚焦时获取命名空间
    initNamespace() {
      if (this.namespaces.length === 0) {
        this.namespaces = this.$store.state.namespaces.namespaces
      }
    },
    // 选择框变化事件
    selectChange(value) {
      // console.log("selectChange", value, "++++\n\n")
      this.loading = true
      this.getCronJobs(value)
    },
    // 选择框清空事件
    clearSelect() {
      this.loading = true
      this.getCronJobs()
    },

    /** 编辑 */
    // 编辑 CronJob
    showCronJobEditDialog(name, namespace) {
      const cronJobDetails = {
        name: name,
        namespace: namespace
      }
      // 获取 yaml 格式
      this.$store
        .dispatch('cronJobs/getCronJobYamlByNameAndNamespace', cronJobDetails)
        .then((res) => {
          console.log(res.data.message);
          this.codeYaml = res.data
          this.editDialogVisible = true // 打开编辑对话框
        })
        .catch((error) => {
          throw error
        })
    },
    // 编辑器方法
    onYamlCmReady(cm) {
      setTimeout(() => {
        cm.refresh()
      }, 50)
    },
    onYamlCmCodeChange(newCode) {
      this.codeYaml = newCode
    },
    // 点击确认按钮触发此修改 CronJob 事件
    commitYamlChange() {
      this.$confirm('确认修改？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      })
        .then(() => {
          this.$store
            .dispatch('cronJobs/changeCronJobByYamlString', this.codeYaml)
            .then((res) => {
              switch (res.code) {
                case 1200:
                  this.$message.success('修改成功')
                  break
                case 1201:
                  this.$message.error('修改失败，请查看 yaml 文件')
                  break
                case 1202:
                  this.$message.error('您的操作有误')
                  break
                default:
                  this.$message.info('提交成功')
                  break
              }
              this.editDialogVisible = false
            })
            .catch((error) => {
              throw error
            })
        })
        .catch(() => {
          console.log('cancel')
        })
    },
    // 关闭修改框
    handleClose: function() {
      this.addYaml = ''
      setTimeout(() => {
        this.codemorror.refresh()
      }, 1)
    },

    /** 删除*/
    // 删除 CronJob
    delCronJob(name, namespace) {
      this.$confirm('确认删除 CronJob？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const nameAndNamespace = {
            name: name,
            namespace: namespace
          }
          this.$store
            .dispatch(
              'cronJobs/deleteCronJobByNameAndNamespace',
              nameAndNamespace
            )
            .then((res) => {
              console.log(res.data.message)
              if (res.data.code === 1200) {
                this.$message.success('删除成功')
                this.getCronJobs()
              } else {
                this.$message.error('删除失败')
              }
              // console.log(res.data);
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch(() => {})
    },

    /** 分页*/
    // 分页事件
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.cronJobsInCurrentPage = this.cronJobs.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  }
}
</script>

<style lang="scss" scoped>
//el-table中资源表格和查找框的分割线
.el-table {
  margin: 15px 0px;
  border-top: 1px solid #ccc;
}

// 编辑窗底部命令提示信息
.foot-info {
  position: absolute;
  margin-bottom: 5px;
  padding: 5px 5px;
  background-color: #ccc;
  left: 0%;
  color: #606266;
  font-size: 15px;
}
</style>
