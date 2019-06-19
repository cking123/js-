<template>
  <el-row class="container" style="height: 100%">
    <v-header></v-header>
    <el-col :span="24" class="main">
      <el-row>
        <el-menu
          :default-active="$route.path"
          class="mar-l el-menu-vertical-demo el-col el-col-3"
          light
          router
        >
        
          <el-menu-item index="chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">图表分析</span>
          </el-menu-item>
        
        <el-badge :value="12" class="item" style=" margin-top: -10px;">
          <el-menu-item index="food">
            <i class="el-icon-food"></i>
            <span slot="title">美食管理</span>
          </el-menu-item>
        </el-badge>
          <el-menu-item index="order">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </el-menu-item>
          <el-menu-item index="user">
            <i class="el-icon-user"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="activity">
            <i class="el-icon-setting"></i>
            <span slot="title">活动管理</span>
          </el-menu-item>
          <el-menu-item index="log">
            <i class="el-icon-s-operation"></i>
            <span slot="title">操作日志</span>
          </el-menu-item>
        </el-menu>
        <section class="contentCon">
          <el-col :span="21" :offset="3" class="content-wrapper">
            <transition>
              <router-view></router-view>
            </transition>
          </el-col>
        </section>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import header from "@/views/header/header.vue";
export default {
  data() {
    return {
      user: {}
    };
  },

  beforeCreate() {
    if (this.$route.path === "/home") {
      this.$router.push({ path: "/home/chart" });
    }
  },
  components: {
    "v-header": header
  }
};
</script>
<style>
/* fa图标右侧需要流出空白 elementUI图标已自带样式 */
i.fa {
  vertical-align: baseline;
  margin-right: 10px;
}
body {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  background-color: #f2f2f2;
 
}
.menu,
.el-menu {
  height: 100%;
  background-color: #e6e6e6;
  position: fixed;
  float: left;
}

.container {
  padding-top: 80px;
  height: 100%;
}

.container .main {
  padding: 0;
}

.container ul li.el-menu-item {
  font-size: 100%;
}

.container .mar-l {
  padding: 0;
}

.container .content-wrapper {
  padding: 20px;
}

.el-badge__content.is-fixed{
  top: 15px;
  right: 21px;
}
</style>

