<template>
  <!--公司领导界面-->
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img
            src="http://gaga-images.paixin.com/photos2/2021/0504/6090bddc947f3.jpeg?imageView2/2/w/632/h/389"
            alt=""
          />
          <div class="leaderinfo">
            <p class="name">Name</p>
          </div>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData" height="200">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
          :style="{ color: item.color }"
        >
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px" height="450px">
          <el-table :data="tableData2">
            <el-table-column
              v-for="(val, key) in tableLabel2"
              :key="key"
              :prop="key"
              :label="val"
            ></el-table-column>
          </el-table>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px" height="450px">
          <el-table :data="tableData3">
            <el-table-column
              v-for="(val, key) in tableLabel3"
              :key="key"
              :prop="key"
              :label="val"
            ></el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import axios from "axios";
import { getCourse } from "@/request/api/getCourse";

export default defineComponent({
  setup() {
    let tableData = ref([]);
    let tableData2 = ref([]);
    let tableData3 = ref([]);
    const tableLabel = {
      id: "课程id",
      courseName: "课程名称",
      teacherId: "讲师id",
      courseType: "课程类型",
    };
    const tableLabel2 = {
      courseName: "课程名称",
      courseType: "课程类型",
    };
    const tableLabel3 = {
      id: "课程id",
      count: "课程观看次数",
    };
    const getCourseList = async () => {
      let res = await getCourse();
      // console.log(res.data);
      tableData.value = res.data;
      tableData2.value = res.data;
    };
    const getTableList = async () => {
      await axios
        .get(
          "https://www.fastmock.site/mock/265f0b35e863b59589b4d729dd7ed690/test/home/getCountData"
        )
        .then((res) => {
          console.log(res.data.data);
          tableData3.value = res.data.data;
        });
    };

    //首页count数据
    const countData = [
      {
        name: "总计课程类型",
        value: 1,
        color: "#2ec7c9",
      },
      {
        name: "总计视频观看次数",
        value: 15,
        color: "#ffb980",
      },
    ];

    onMounted(() => {
      getCourseList();
      getTableList();
    });

    return {
      tableData,
      tableData2,
      tableData3,
      tableLabel,
      tableLabel2,
      tableLabel3,
      countData,
    };
  },
});
</script>

<style lang="less">
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 45%;
    margin-bottom: 20px;
    padding: 10px;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .num {
      font-size: 30px;
      margin-bottom: 10px;
    }

    .txt {
      font-size: 14px;
      text-align: center;
      color: #999;
    }
  }
}
</style>
