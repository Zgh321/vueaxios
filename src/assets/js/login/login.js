import { reactive } from '@vue/composition-api'

/**
 *声明数据
 */
export function loginData() {
  let validateUsername = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('年龄不能为空'));
    } else {
      callback();
    }
  }
  let validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      callback();
    }
  }
  const ruleForm = reactive({
    password: '',
    username: '',
  })
  const rules = reactive({
    username: [
      { validator: validateUsername, trigger: 'blur', required: true }
    ],
    password: [
      { validator: validatePass, trigger: 'blur', required: true }
    ]
  })
  return {
    ruleForm,
    rules
  }
}
/**
 *声明方法
 */
export function loginFn (refs,root,ruleForm ) {
  const submitForm = ((formName) => {
    refs[formName].validate((valid) => {
      if (valid) {
        root.publicApi.login(ruleForm).then((res) => {
          if (res.meta.status === 200) {
            sessionStorage.setItem('vueAxios',JSON.stringify(res.data))
            root.$router.push({name:'homePage'})
          }
        })
      } else {
        return false
      }
    })
  })
  const resetForm =  ((formName) => {
    refs[formName].resetFields();
  })
  return {
    submitForm,
    resetForm
  }
}
