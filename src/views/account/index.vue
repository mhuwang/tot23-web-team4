<!--
 * @Descripttion: 用户管理页面
 * @version: 1.0
 * @Author: Rex Joush
 * @Date: 2021-03-22 09:43:17
 * @LastEditors: Rex Joush
 * @LastEditTime: 2021-03-22 15:58:05
-->

<template>
  <div class="dashboard-container">
    <el-card>
      <el-row :gutter="25">
        <el-col :span="10">
          <!-- 搜索区域 -->
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUsers"
          >
            <!-- 搜索按钮 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUsers"
            ></el-button>
          </el-input>
        </el-col>
        <!-- 添加按钮 -->
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">
            添加用户
          </el-button>
        </el-col>
      </el-row>

      <!-- 用户列表部分 border 边框 stripe 隔行变色 -->
      <el-table
        :data="users"
        border
        stripe
        height="500"
        header-align="center"
        align="center"
      >
        <!-- 索引列 -->
        <!-- <el-table-column type="index" width="50"></el-table-column> -->
        <el-table-column label="id" prop="id" width="40"></el-table-column>
        <el-table-column label="用户名" prop="username" width="80"></el-table-column>
        <el-table-column label="密码" prop="password"></el-table-column>
        <el-table-column label="角色" prop="role"></el-table-column>
        <el-table-column label="部门" prop="department"></el-table-column>
        <el-table-column label="状态" prop="state">
            <!-- 作用域插槽 -->
            <template slot-scope="scope">
                <!-- {{scope.row}} 每一行封存的数据 -->
                <el-switch v-model="!scope.row.state" @change="userStateChange(scope.row)"></el-switch>
            </template>
        </el-table-column>
      </el-table>

      <!-- 分页 size-change 每页最大变化数 current-change 当前页面变化数 layout 功能组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageStart"
        :page-sizes="[10, 50, 100]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 新增用户区域 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClose">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <!-- 用户名 -->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <!-- 角色 -->
            <el-form-item label="邮箱" prop="role">
                <el-input v-model="addForm.role"></el-input>
            </el-form-item>
            <!-- 部门 -->
            <el-form-item label="邮箱" prop="department">
                <el-input v-model="addForm.department"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Accounts",
  data() {
    return {
      center: "center",
      // 查询的实体信息
      queryInfo: {
        query: "",
        pageStart: 1,
        pageSize: 10,
      },
      users: [], // 用户列表
      total: 0, // 总记录数
      addDialogVisible: false, // 添加框的显示按钮
      // 要添加的信息
        addForm: {
            username: "",
            password: "",
            role: "",
            department: "",
        },
        // 添加用户的表单验证
        addFormRules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入用户名密码', trigger: 'blur' },
                { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
            ],
            role: [
                { required: true, message: '请输入角色', trigger: 'blur' },
                { min: 5, max: 15, message: '选择角色', trigger: 'blur' }
            ],
            department: [
                { required: true, message: '请输入部门', trigger: 'blur' },
                { min: 5, max: 15, message: '请选择部门', trigger: 'blur' }
            ],
        },
    };
  },
  created: function () {
    this.getUsers();
  },
  methods: {
    // 获取所有用户
    getUsers() {
      // 获取查询信息
    //   const { data: res } = await this.$http.get("/user/getUsers", {
    //     params: this.queryInfo,
    //   });
    //   console.log(res);
    //   this.userList = res.data;
    //   this.total = res.amount;
      this.$store.dispatch("user/getUsers", this.queryInfo).then((res)=>{
          if (res.code === 1200){
            this.users = res.data.data,
            this.total = res.data.total
          }
          this.$message.success(res.message);
      }).catch((error)=>{
          console.log(error);
      })
    },

    // 分页的页面变化时，最大数
    handleSizeChange: function (newSize) {
      this.queryInfo.pageSize = newSize;
      this.getUsers();
    },

    // pageNumber 的触发动作
    handleCurrentChange: function (newPage) {
      this.queryInfo.pageStart = newPage;
      this.getUsers();
    }, 

    // 关闭窗口
    editDialogClose: function() {
        this.$refs.editFormRef.resetFields(); // 重置信息
    },

    // 更改用户状态
    async userStateChange(userInfo) {
        const {data: res} = await this.$http.put(`userState?id=${userInfo.id}&state=${userInfo.state}`);
        console.log(res);
        if (res != "success") {
            userInfo.id = !userInfo.id;
            return this.$message.error("操作失败！");
        }
        this.$message.success("操作成功！")
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-table {
  margin: 10px 0px;
  font-size: 17px;
}
</style>