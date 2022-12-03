<template>
  <!--搜索框-->
  <div class="filemng-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="章节id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--课程资料列表-->
  <div class="table">
    <el-table :data="tableData" style="width: 100%" height="500px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 125"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default>
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <!--    <el-pagination-->
    <!--      small-->
    <!--      background-->
    <!--      layout="prev, pager, next"-->
    <!--      :total="config.total"-->
    <!--      @current-change="changePage"-->
    <!--      class="pager mt-4"-->
    <!--    />-->
  </div>
  <!--上传课程资料对话框-->
  <!--  <el-dialog-->
  <!--    v-model="dialogVisible"-->
  <!--    title="上传资料"-->
  <!--    width="30%"-->
  <!--    :before-close="handleClose"-->
  <!--  >-->
  <!--    <span>This is a message</span>-->
  <!--    <template #footer>-->
  <!--      <span class="dialog-footer">-->
  <!--        <el-button @click="dialogVisible = false">取消</el-button>-->
  <!--        <el-button type="primary" @click="dialogVisible = false">-->
  <!--          确定-->
  <!--        </el-button>-->
  <!--      </span>-->
  <!--    </template>-->
  <!--  </el-dialog>-->
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import { MessageBox } from "@element-plus/icons-vue";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    //课程资料表
    //const list = ref([]);
    //写个死的
    const tableData = [
      {
        courseName: "示例",
        chapterId: "示例",
        chapterName: "示例",
        fileType: "示例",
        fileUrl: "示例",
      },
    ];
    //表头配置
    const tableLabel = reactive([
      {
        prop: "courseName",
        label: "课程名称",
      },
      {
        prop: "chapterId",
        label: "章节ID",
      },
      {
        prop: "chapterName",
        label: "章节名称",
      },
      {
        prop: "fileType",
        label: "文件类型",
      },
      {
        prop: "fileUrl",
        label: "文件url",
        width: 320,
      },
    ]);
    //坑位 获取资料数据
    // onMounted(() => {
    //   getFileData(config);
    // });
    //分页
    // const config = reactive({
    //   total: 0,
    //   page: 1,
    //   chapterId: "",
    // });
    // const getFileData = async (config) => {
    //   let res = await proxy.$api.getFileData(config);
    //   config.total = res.count;
    // };
    //换页
    // const changePage = (page) => {
    //   config.page = page;
    //   getFileData(config);
    // };
    const formInline = reactive({
      keyword: "",
    });

    //将搜索框中的keyword传给后端
    // const handleSearch = () => {
    //   config.chapterId = formInline.keyword;
    //   getFileData(config);
    // };

    //控制模态框的显示隐藏
    // const dialogVisible = ref(false);
    // const handleClose = (done) => {
    //   MessageBox.confirm("确定关闭？")
    //     .then(() => {
    //       done();
    //     })
    //     .catch(() => {});
    // };

    return {
      //list,
      tableData,
      tableLabel,
      // config,
      // changePage,
      formInline,
      //dialogVisible,
      //handleClose,
    };
  },
});
</script>

<style lang="scss">
.table {
  position: relative;
  height: 520px;
  //分页样式
  .pager {
    position: absolute;
    right: 0;
    bottom: -20px;
  }
}

.filemng-header {
  display: flex;
  justify-content: space-between;
}
</style>
