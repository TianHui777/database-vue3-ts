<template>
  <!--管理员页面总体布局-->
  <div class="common-layout">
    <el-container class="lay-container">
      <admin-aside />
      <el-container>
        <admin-header />
        <!--tab标签-->
        <admin-tab />
        <!--右侧主页面-->
        <el-main class="right-main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AdminHeader from "@/components/adminLayout/AdminHeader.vue";
import AdminAside from "@/components/adminLayout/AdminAside.vue";
import AdminTab from "@/components/adminLayout/AdminTab.vue";
import { adminStore } from "@/stores/adminStore";

export default defineComponent({
  components: {
    AdminHeader,
    AdminAside,
    AdminTab,
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
