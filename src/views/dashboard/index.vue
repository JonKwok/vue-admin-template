<template>
  <div class="dashboard-container">
    <el-card class="search_box" shadow="always" style="margin:10px;">
      欢迎您，当前时间：{{ current_time }}
    </el-card>
    <el-card class="search_box" shadow="always" style="margin:10px;">
      <el-descriptions class="margin-top" title="用户信息" :column="3">
        <template slot="extra">
          <el-button type="primary" size="small">操作</el-button>
        </template>
        <el-descriptions-item label="用户名" />
        <el-descriptions-item label="角色">
          <el-tag size="small">管理员</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

  </div>
</template>

<script>

export default {
  data() {
    return {
      current_time: new Date()
    }
  },
  mounted() {
    const _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>
