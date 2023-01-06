<template>
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
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "AdminHome",
};
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
</style>
