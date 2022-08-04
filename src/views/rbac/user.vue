<template>
  <div>
    <el-card class="search_box" shadow="always">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input v-model="search.name" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
          <el-button type="info" @click="reset">清空</el-button>
          <el-button type="warning" @click="add">添加</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="table_box" shadow="always">
      <el-table
        :data="user_list"
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          label="用户名"
        />
        <el-table-column
          prop="status_text"
          label="用户状态"
        />
        <el-table-column
          prop="created_at"
          label="创建时间"
        />
        <el-table-column
          prop="last_login_at"
          label="上次登录时间"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==1" type="danger" size="small" @click="disableUser(scope.row)">禁用</el-button>
            <el-button v-if="scope.row.status==2" type="primary" size="small" @click="enableUser(scope.row)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-drawer
      ref="drawer"
      :title="drawerTitle"
      :visible.sync="addDrawer"
      direction="rtl"
      :before-close="handleClose"
      custom-class="demo-drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="启用" :label-width="formLabelWidth">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              active-text="启用"
              inactive-color="#ccc"
              inactive-text="禁用"
            />
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" :loading="formLoading" @click="saveUser()">{{ formLoading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
import { getUserList, userAdd, userEnable, userDisable } from '@/api/rbac'
export default {

  data() {
    return {
      search: {
        name: ''
      },
      user_list: [],
      drawerTitle: '',
      addDrawer: false,
      formLabelWidth: '80px',
      formLoading: false,
      form: {
        name: '',
        email: '',
        password: '',
        status: true
      }
    }
  },
  created() {
    this.userList()
  },
  methods: {
    cancelForm() {
      this.formLoading = false
      this.addDrawer = false
    },
    handleClose() {
      if (this.formLoading) {
        return
      }
      this.addDrawer = false
      this.form = {
        name: '',
        email: '',
        password: '',
        status: true
      }
    },
    add() {
      this.addDrawer = true
      this.drawerTitle = '新增用户'
    },

    saveUser() {
      this.formLoading = true
      userAdd(this.form).then(response => {
        this.formLoading = false
        this.addDrawer = false
        this.userList()
        this.form = {
          name: '',
          email: '',
          password: '',
          status: true

        }
      })
    },

    onSearch() {
    },
    reset() {
      this.search = {
        name: ''
      }
    },
    disableUser(row) {
      this.$confirm('禁用该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userDisable({ id: row.id }).then(response => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
          this.userList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消禁用'
        })
      })
    },
    enableUser(row) {
      this.$confirm('启用该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userEnable({ id: row.id }).then(response => {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          this.userList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消启用'
        })
      })
    },
    userList() {
      getUserList(this.search).then(response => {
        this.user_list = response.data.list
      })
    }
  }
}

</script>

<style>
.search_box {
  margin:10px;
}
.table_box{
    margin:10px;
}
</style>
