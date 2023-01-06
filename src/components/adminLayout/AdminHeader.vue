<template>
  <el-header>
    <!--Header左侧-->
    <div class="l-content">
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
          <img
            src="http://gaga-images.paixin.com/photos2/2021/0504/6090bddc947f3.jpeg?imageView2/2/w/632/h/389"
            class="userImg"
          />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleLogOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { adminStore } from "@/stores/adminStore.ts";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let store = adminStore();
    const router = useRouter();
    //面包屑
    const current = computed(() => {
      return store.currentMenu;
    });
    //登出
    const handleLogOut = () => {
      router.push({
        name: "login",
      });
    };
    return {
      current,
      handleLogOut,
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
