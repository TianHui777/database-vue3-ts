<template>
  <!--管理员页面总体布局-->
  <div class="common-layout">
    <el-container class="lay-container">
      <el-container>
        <admin-header />
        <!--右侧主页面-->
        <el-main class="right-main">
          <leader-home />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AdminHeader from "@/components/adminLayout/AdminHeader.vue";
import { adminStore } from "@/stores/adminStore";
import LeaderHome from "@/components/leaderLayout/LeaderHome.vue";

export default defineComponent({
  components: {
    LeaderHome,
    AdminHeader,
  },
});
</script>

<style lang="scss" scoped>
.el-container {
  flex-wrap: wrap;
  align-items: flex-start;
  height: 100%;
}

.common-layout {
  .lay-container {
    flex-wrap: nowrap;

    .right-main {
      height: calc(100% - 124px) !important;
    }
  }

  height: 100%;

  & > .el-container {
    height: 100%;

    & > .el-aside {
      height: 100%;
      background: #304156;
    }
  }
}
</style>
