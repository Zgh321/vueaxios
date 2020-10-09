<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {loginData, loginFn} from '@/assets/js/login/login'
  export default {
    name: 'login',
    setup(props, { refs, root }) {
      //声明的数据
      let { ruleForm, rules } = loginData()
      //登录方法
      let {submitForm, resetForm } = loginFn(refs,root,ruleForm)
      return {
        ruleForm,
        rules,
        submitForm,
        resetForm
      }
    },
  }

</script>

<style scoped>
  .el-form{
    width: 50%;
  }
</style>
