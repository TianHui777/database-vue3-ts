<template>
  <!--搜索框-->
  <div class="filemng-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="课程ID" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!--课程列表-->
  <div class="table">
    <el-table :data="list" style="width: 100%" height="450px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 200"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default="scoped">
          <el-button size="small" @click="handleEdit(scoped.row)"
            >编辑
          </el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--章节列表-->
  <div class="table">
    <el-table :data="list2" style="width: 100%" height="450px">
      <el-table-column
        v-for="item in tableLabel2"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 250"
      />
      <el-table-column fixed="right" label="操作" min-width="180">
        <template #default>
          <el-button size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!--上传/编辑对话框-->
  <el-dialog
    v-model="dialogVisible"
    :title="action === 'add' ? '新增课程' : '编辑课程'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formData" ref="userForm">
      <el-form-item label="课程ID" prop="courseId">
        <el-input v-model="formData.id" placeholder="请输入课程ID" />
      </el-form-item>
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="formData.courseName" placeholder="请输入课程名称" />
      </el-form-item>
      <el-form-item label="课程类型" prop="courseType">
        <el-input v-model="formData.courseType" placeholder="请输入课程类型" />
      </el-form-item>
      <el-form-item label="讲师ID" prop="teacherId">
        <el-input v-model="formData.teacherId" placeholder="请输入讲师ID" />
      </el-form-item>
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
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import {
  getChapterByCourseId,
  getCourse,
  getCourseById,
} from "@/request/api/getCourse";
import { ElMessageBox } from "element-plus";

export default {
  name: "InfoManagement",
  setup() {
    const { proxy } = getCurrentInstance();
    //课程表
    const list = ref([]);
    //章节表
    const list2 = ref([]);
    //表头配置
    const tableLabel = reactive([
      {
        prop: "id",
        label: "课程ID",
      },
      {
        prop: "courseName",
        label: "课程名称",
      },
      {
        prop: "teacherId",
        label: "讲师ID",
      },
      {
        prop: "courseType",
        label: "课程类型",
      },
    ]);
    const tableLabel2 = reactive([
      {
        prop: "courseId",
        label: "课程ID",
      },
      {
        prop: "chapterName",
        label: "章节名称",
      },
      {
        prop: "description",
        label: "章节描述",
      },
    ]);
    onMounted(() => {
      getCourseList();
    });

    const config = reactive({
      courseId: "",
    });

    //获取课程列表
    const getCourseList = async () => {
      let res = await getCourse();
      // console.log(res.data);
      list.value = res.data || [];
    };
    //通过搜索课程ID获取课程列表
    const getCourseListById = async (config) => {
      // console.log(config.courseId);
      // console.log(isNaN(config.courseId));
      if (isNaN(config.courseId)) {
        await getCourseList();
      } else {
        let res = await getCourseById(config);
        // console.log([res.data]);
        list.value = [res.data];
      }
    };
    //通过搜索课程ID获取章节列表
    const getChapterListByCourseId = async (config) => {
      if (isNaN(config.courseId)) {
        list2.value = [];
      } else {
        let res = await getChapterByCourseId(config);
        console.log(res.data);
        list2.value = res.data;
      }
    };
    //搜索框数据
    const formInline = reactive({
      keyword: "",
    });
    //将搜索框中的keyword传给后端
    const handleSearch = () => {
      config.courseId = parseInt(formInline.keyword);
      // console.log(config);
      getCourseListById(config);
      getChapterListByCourseId(config);
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
      id: "",
      courseName: "",
      teacherId: "",
      courseType: "",
    });
    //提交数据
    const onSubmit = async () => {
      // let res = await changeCourseInfo(formData);
      // if (res) {
      //   dialogVisible.value = false;
      //   this.$refs.userForm.resetFields();
      //   getCourseList(config);
      // }

      dialogVisible.value = false;
      this.$refs.userForm.resetFields();
    };
    //区分编辑和新增
    const action = ref("add");
    //新增课程信息模态框显示
    const handleAdd = () => {
      action.value = "add";
      dialogVisible.value = true;
    };
    //编辑课程信息模态框显示
    const handleEdit = (row) => {
      console.log(row);
      action.value = "edit";
      dialogVisible.value = true;
      //浅拷贝
      proxy.$nextTick(() => {
        Object.assign(formData, row);
      });
    };

    return {
      list,
      list2,
      tableLabel,
      tableLabel2,
      formInline,
      handleSearch,
      dialogVisible,
      handleClose,
      onSubmit,
      formData,
      action,
      handleAdd,
      handleEdit,
    };
  },
};
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
