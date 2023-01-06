<template>
  <!--搜索框-->
  <div class="filemng-header">
    <el-button type="primary" @click="dialogVisible = true">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入课程ID">
        <el-input v-model="formInline.Course" placeholder="课程ID" />
      </el-form-item>
      <el-form-item label="请输入章节ID">
        <el-input v-model="formInline.Chapter" placeholder="章节ID" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--课程资料列表-->
  <div class="table">
    <el-table :data="list" style="width: 100%" height="450px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 180"
      />
    </el-table>
  </div>

  <!--上传对话框-->
  <el-dialog
    v-model="dialogVisible"
    title="上传资料"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formFile" ref="userForm">
      <el-form-item label="课程ID" prop="courseId">
        <el-input v-model="formData.courseId" placeholder="请输入课程ID" />
      </el-form-item>
      <el-form-item label="章节ID" prop="chapterId">
        <el-input v-model="formData.chapterId" placeholder="请输入章节ID" />
      </el-form-item>
      <el-upload
        v-model:file-list="formFile.file"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      >
        <el-button type="primary">上传文件</el-button>
      </el-upload>

      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="danger" @click="dialogVisible = false"
            >取消
          </el-button>
          <el-button type="success" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { getFile } from "@/request/api/getFile";
import { addFile } from "@/request/api/addFile";

export default defineComponent({
  name: "FileManagement",
  setup() {
    //课程资料表
    const list = ref([]);
    //表头配置
    const tableLabel = reactive([
      {
        prop: "id",
        label: "资料ID",
      },
      {
        prop: "courseId",
        label: "课程ID",
      },
      {
        prop: "chapterId",
        label: "章节ID",
      },
      {
        prop: "fileUrl",
        label: "资料URL",
      },
      {
        prop: "fileType",
        label: "资料类型",
      },
      {
        prop: "fileDescription",
        label: "资料描述",
      },
    ]);
    onMounted(() => {
      getFileList();
    });

    const config = reactive({
      courseId: "",
      chapterId: "",
    });

    const getFileList = async (config) => {
      let res = await getFile(config);
      console.log(res.data);
      list.value = res.data;
    };

    const formInline = reactive({
      Course: "",
      Chapter: "",
    });

    //将搜索框中的keyword传给后端
    const handleSearch = () => {
      config.courseId = parseInt(formInline.Course);
      config.chapterId = parseInt(formInline.Chapter);
      console.log(config);
      getFileList(config);
    };

    //控制模态框的显示隐藏
    const dialogVisible = ref(false);

    //关闭提示框
    const handleClose = (done) => {
      ElMessageBox.confirm("确定关闭吗？")
        .then(() => {
          done();
        })
        .catch(() => {
          // catch error
        });
    };

    //添加资料的form数据
    const formData = reactive({
      courseId: "",
      chapterId: "",
    });
    //添加资料的文件数据
    const formFile = reactive({
      file: "",
    });

    //上传文件
    const onSubmit = async () => {
      console.log(formFile);
      let res = await addFile(formData, formFile);
      console.log(res);
      if (res) {
        dialogVisible.value = false;
        this.$refs.userForm.resetFields();
        getFileList(config);
      }
    };

    return {
      list,
      tableLabel,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      formData,
      formFile,
      onSubmit,
    };
  },
});
</script>

<style lang="scss">
.table {
  position: relative;
  height: 520px;
}

.filemng-header {
  display: flex;
  justify-content: space-between;
}
</style>
