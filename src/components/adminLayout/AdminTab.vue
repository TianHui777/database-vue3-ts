<template>
  <div class="tags">
    <el-tag
      :key="tag.name"
      v-for="(tag, index) in tags"
      :closable="tag.name !== 'adminHome'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { adminStore } from "@/stores/adminStore.ts";
import router from "@/router";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    let store = adminStore();
    const tags = store.tabList;
    const router = useRouter();
    const route = useRoute();

    // 点击tab标签跳转页面
    const changeMenu = (item) => {
      router.push({ name: item.name });
    };
    //tab删除
    const handleClose = (tag, index) => {
      let length = tags.length - 1;
      //处理tabList
      store.closeTab(tag);
      //处于首页界面不做跳转
      if (tag.name !== route.name) {
        return;
      }
      //处于tab页面，删除后跳转至tab前一个页面
      if (index === length) {
        router.push({
          name: tags[index - 1].name,
        });
      } else {
        router.push({
          name: tags[index].name,
        });
      }
    };

    return {
      tags,
      changeMenu,
      handleClose,
    };
  },
};
</script>

<style lang="scss">
.tags {
  padding: 20px;
  width: 100%;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
