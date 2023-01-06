<template>
  <!--搜索框-->
  <div class="filemng-header">
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input placeholder="用户id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--用户列表-->
  <div class="table">
    <el-table :data="list" style="width: 100%" height="450px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 150"
      />
      <el-table-column fixed="right" label="操作" min-width="75">
        <template #default="scoped">
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scoped.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";

import { delUser, getUser } from "@/request/api/manageUser";
import { ElMessageBox, ElMessage } from "element-plus";

export default defineComponent({
  name: "UserManagement",
  setup() {
    const list = ref([]);
    //表头
    const tableLabel = reactive([
      {
        prop: "id",
        label: "用户ID",
      },
      {
        prop: "userName",
        label: "用户名",
      },
      {
        prop: "nickName",
        label: "用户昵称",
      },
      {
        prop: "sexLabel",
        label: "用户性别",
        width: 80,
      },
      {
        prop: "email",
        label: "用户邮箱",
      },
      {
        prop: "phonenumber",
        label: "联系电话",
      },
      {
        prop: "status",
        label: "状态",
        width: 80,
      },
    ]);

    onMounted(() => {
      getUserList();
    });

    const getUserList = async () => {
      let res = await getUser();
      console.log(res);
      list.value = res.data.map((item) => {
        item.sexLabel = item.sex === "0" ? "女" : "男";
        console.log(item);
        return item;
      });
    };
    //删除用户
    const handleDelete = (row) => {
      console.log(row.id);
      ElMessageBox.confirm("确定删除吗？").then(async () => {
        await delUser({
          userId: row.id,
        });
        ElMessage({
          showClose: true,
          message: "删除成功",
          type: "success",
        });
        await getUserList();
      });
    };

    return {
      list,
      tableLabel,
      handleDelete,
    };
  },
});
</script>

<style scoped lang="scss">
.table {
  position: relative;
  height: 520px;
}

.filemng-header {
  display: flex;
  justify-content: space-between;
}
</style>
