<template>
  <div class="all">
<!--    <div class="banner" style="margin-bottom: 20px;">-->
<!--      <el-carousel height="175px" direction="vertical" :autoplay="false">-->
<!--        <el-carousel-item v-for="item in myimg" :key="item">-->
<!--            <img :src="item.url" alt="" style="width:100%;height: 100%;"/>-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->
<!--    </div>-->
    <div class="choose">
      <el-button round v-for="item in classtype" :key="item">{{ item.ctype }}</el-button>
    </div>
    <div class="sift">
      <div class="left" >
        <el-button style="margin:0px 10px 15px 20px">
          <el-icon style="margin-right: 5px"><Collection /></el-icon>
          新建课程
        </el-button>
        <el-button style="margin:0px 10px 15px 20px">
          <el-icon style="margin-right: 5px"><Guide /></el-icon>
          新手指引
        </el-button>
      </div>
      <div class="right">
        <el-input
            v-model="input3"
            placeholder="请输入课程名进行搜索"
            class="input-with-select"
        >
          <template #prepend>
            <el-select v-model="select" placeholder="全部课程" style="width: 115px">
              <el-option label="国家一流" value="1" />
              <el-option label="省级一流" value="2" />
              <el-option label="开放课程" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
    <div class="displayclass" style="margin-top: 100px">
      <el-row>
        <el-col
            v-for="(o, index) in 10"
            :key="o"
            :span="4"
            :offset="index > 0 ? 2 : 0"
            style="margin:0px 10px 15px 20px"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
                src="https://ali-cdn.educoder.net/images/avatars/Subject/1792?t=1616592220"
                class="image"
            />
            <div style="padding: 14px">
              <span>课程名称</span>
              <div class="bottom">
                <p style="font-size: small;color: #99a9bf">
                  <el-icon style="margin-right: 5px"><UserFilled />
                  </el-icon>45人</p>
                <el-button round @click="enterClass()">进入课程</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Collection,Guide,Search,UserFilled} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'

const router=useRouter()
const enterClass = () => {
  router.push("/chapter")
}
const checked = ref(false)

const onChange = (status: boolean) => {
  checked.value = status
}
// const myimg=[
//   {url: require("@/assets/img/9.png")},
// ]
const classtype=[
  {ctype:'全部'},
  {ctype:'程序设计语言'},
  {ctype:'算法设计'},
  {ctype:'计算机基础'},
  {ctype:'计算机系统能力'},
  {ctype:'云计算与大数据'},
  {ctype:'人工智能'},
  {ctype:'电子信息'},
  {ctype:'Web开发'},
  {ctype:'软件工程'},
  {ctype:'网络安全'},
  {ctype:'物联网'},
]


</script>

<style scoped>
.all{
  overflow-x: hidden;
  background-color: rgba(240, 242, 245, 1);;
}
.sift{
  height: 30px;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
  margin-bottom: -40px;
}
.left{
  margin-left: 20px;
}
.right{
  margin-right: 40px;
}
.sift .right .input-with-select{
  height: 30px;
  width: 450px;
  border-radius: 30px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.choose{
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
  height:100px;
  padding: 0 30px 0;
  margin-bottom: 30px;
  position: relative;
  line-height: 3;
}
.all .choose .el-button.is-round{
  margin-right: 20px;
}
.displayclass{
  margin-left: 30px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}
</style>
