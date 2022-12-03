import { defineStore } from "pinia";

export const adminStore = defineStore("adminStore", {
  state: () => ({
    //菜单收起
    isCollapse: true,
    currentMenu: null,
    tabList: [
      {
        path: "/admin",
        name: "adminHome",
        label: "首页",
        // icon: "home",
      },
    ],
  }),
  getters: {},
  actions: {
    updateIsCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    selectMenu(val) {
      // val.name == "adminHome"
      //   ? (this.currentMenu = null)
      //   : (this.currentMenu = val);

      if (val.name == "adminHome") {
        this.currentMenu = null;
      } else {
        this.currentMenu = val;
        const result = this.tabList.findIndex((item) => item.name === val.name);
        result == -1 ? this.tabList.push(val) : "";
      }
    },
    closeTab(val) {
      const res = this.tabList.findIndex((item) => item.name === val.name);
      this.tabList.splice(res, 1);
    },
  },
});
