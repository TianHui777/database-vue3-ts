<template>

  <div class="login-box">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        status-icon
    >

      <h2>登录界面</h2>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" type="password"/>
      </el-form-item>

      <el-form-item>
        <el-button class="loginBtn" type="primary" @click="submitForm(ruleFormRef)"
        >登录
        </el-button>
        <el-button class="loginBtn" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {login} from "../request/api/login"
import {useRouter} from "vue-router";

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  pwd: '',
})

const rules = reactive<FormRules>({
  name: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 10, message: '用户名长度为3-10', trigger: 'blur'},
  ],
  pwd: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 3, max: 10, message: '用户名长度为3-10', trigger: 'blur'},
  ],

})


//登录路由
const router = useRouter()

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      login(ruleForm).then(res => {
        router.push('/')
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>


<style scoped lang="scss">
.login-box {
  width: 100%;
  height: 100%;
  padding: 1px;
  text-align: center;
}

.demo-ruleForm {
  width: 500px;
  margin: 200px auto;
  background-color: #fff;
  padding: 50px;
  border-radius: 20px;
}

.loginBtn {
  width: 48%;

}

h2 {
  margin-bottom: 20px;
}


</style>
