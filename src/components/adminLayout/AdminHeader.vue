<template>
  <el-header>
    <!--Header左侧-->
    <div class="l-content">
      <!--菜单图标-->
      <el-button size="small">
        <el-icon :size="20">
          <svg
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            data-v-029747aa=""
          >
            <path
              fill="currentColor"
              d="M160 448a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V160.064a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32V416a32 32 0 0 1-32 32H608zM160 896a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H160zm448 0a32 32 0 0 1-32-32V608a32 32 0 0 1 32-32h255.936a32 32 0 0 1 32 32v256a32 32 0 0 1-32 32H608z"
            ></path>
          </svg>
        </el-icon>
      </el-button>

      <!--面包屑-->
      <el-breadcrumb separator="/" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current"
          >{{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--Header右侧-->
    <div class="r-content">
      <!--下拉菜单-->
      <el-dropdown>
        <span class="el-dropdown-link">
          <!--用户头像-->
          <img src="" alt="" class="userImg" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { adminStore } from "@/stores/adminStore.ts";
import { computed } from "vue";

export default {
  setup() {
    let store = adminStore();
    //面包屑
    const current = computed(() => {
      return store.currentMenu;
    });
    return {
      current,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #8b8b8f;
}

.r-content {
  .userImg {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}

.l-content {
  display: flex;
  align-items: center;

  .el-button {
    margin-right: 20px;
  }

  h3 {
    color: white;
  }
}

.breadcrumb :deep(span) {
  color: white !important;
  cursor: pointer !important;
}
</style>
