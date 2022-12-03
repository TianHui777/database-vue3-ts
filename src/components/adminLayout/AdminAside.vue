<template>
  <!--  左侧菜单栏-->
  <el-aside width="180px">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="white"
    >
      <h3>后台管理</h3>
      <!--包含子菜单的项-->
      <el-sub-menu
        :index="item.label"
        v-for="item in hasChildren()"
        :key="item.path"
      >
        <!--获取菜单项图标-->
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <!--获取菜单列表-->
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            @click="clickMenu(subItem)"
          >
            <component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <!--不包含子菜单的项-->
      <el-menu-item
        :index="item.path"
        v-for="item in noChildren()"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <!--获取菜单项图标-->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { useRouter } from "vue-router";
import { adminStore } from "@/stores/adminStore.ts";

export default {
  setup() {
    let store = adminStore();
    //菜单列表
    const list = [
      {
        path: "/",
        name: "courseManagement",
        label: "课程管理",
        icon: "",
        children: [
          {
            path: "/typeManagement",
            name: "typeManagement",
            label: "课程分类管理",
            icon: "",
            url: "",
          },
          {
            path: "/infoManagement",
            name: "infoManagement",
            label: "课程信息管理",
            icon: "",
            url: "",
          },
        ],
      },
      {
        path: "/fileManagement",
        name: "fileManagement",
        label: "课程资料管理",
        icon: "",
        url: "",
      },
    ];

    const router = useRouter();

    //判断有无子菜单
    const noChildren = () => {
      return list.filter((item) => !item.children);
    };

    const hasChildren = () => {
      return list.filter((item) => item.children);
    };

    //点击菜单跳转
    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
      //pinia管理菜单跳转
      store.selectMenu(item);
    };

    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;

  h3 {
    line-height: 48px;
    color: white;
    text-align: center;
  }
}

.icons {
  //图标大小
  width: 18px;
  height: 18px;
}
</style>
