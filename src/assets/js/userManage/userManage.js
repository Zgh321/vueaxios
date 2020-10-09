import { reactive, onMounted, ref } from '@vue/composition-api'

/**
 * 声明数据
 */
export function userData () {
  let validatePass = (rule, value, callback) => {
    if (value === '' || value === null || value === undefined) {
      callback(new Error('请输入密码'));
    } else {
      let reg = /^.{6,15}$/
      if (!reg.test(value)){
        callback(new Error('长度在 6 到 15 个字符'));
      } else {
        callback();
      }
    }
  };
  let validateMobile = (rule, value, callback) => {
    if (value === '' || value === null || value === undefined) {
      callback(new Error('请输入电话号码'));
    } else {
      let reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)){
        callback(new Error('手机号码有误'));
      } else {
        callback();
      }
    }
  }
  let validateEmail = (rule, value, callback) => {
    if (value === '' || value === null || value === undefined) {
      callback(new Error('请输入邮箱'));
    } else {
      let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!reg.test(value)){
        callback(new Error('输入邮箱不合法'));
      } else {
        callback();
      }
    }
  }
  //对象或者数组数据
  const resDataObj = reactive({
    searchObj:{
      content:'',
    },
    tableData: [],
    tableDataName:[
      { id:1, prop:'username', label:'姓名' },
      { id:2, prop:'email', label:'邮箱' },
      { id:3, prop:'mobile', label:'电话' },
      { id:4, prop:'role_name', label:'角色' },
    ],
    //分页
    pagedata: {
      currentPage: 1, //当前页
      pageSizes: [5, 10, 100, 200, 300, 400],
      pagesize: 100,//每页显示的条数
      total: 100,//总条数
      layout: "total, sizes, prev, pager, next, jumper",
    },
    // =========弹框==========
    //表单数据
    ruleForm:{
      username:null,
      password:null,
      mobile:null,
      email:null
    },
    //规则验证
    rules:{ username: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
      ],
      password: [
        { required: true, validator: validatePass, trigger: 'blur' }
      ],
      mobile: [
        { required: true, validator: validateMobile, trigger: 'blur' }
      ],
      email: [
        { required: true, validator: validateEmail, trigger: 'blur' }
      ]},
    //分配角色表单数据
    roleFrom:{
      rid:null,
      username:null,
      role_name:null
    },
    //分配角色用户数据
    roleList:{
      username:null,
      role_name:null,
      rid:null
    },
    //所有角色数据
    allRoleList:[],
  })
  const dialogVisible = ref(false)
  const titleType = ref(null)
  const dialogVisible1 = ref(false)
  //修改的Id
  const whoID = ref(null)
  const whoRid = ref(null)
  return {
    resDataObj,
    dialogVisible,
    dialogVisible1,
    titleType,
    whoID,
    whoRid
  }
}

/**
 * 声明方法
 */
export function userFn (root,refs,resDataObj,dialogVisible,titleType,whoID,dialogVisible1,whoRid) {
  onMounted(() =>{
    //获取用户列表数据
    getUserList()
  })
  //获取用户列表数据
  const getUserList = (() => {
    let data = {
      query: resDataObj.searchObj.content,
      pagenum: resDataObj.pagedata.currentPage,
      pagesize: resDataObj.pagedata.pagesize
    }
    root.publicApi.userManageApi.getUserList(data).then((res) => {
      if (res.meta.status == 200 ){
        resDataObj.tableData = res.data.users
        resDataObj.pagedata.total = res.data.total; //分页条数2
      }
    })
  })
  //分页
  const handleSizeChange = ((val) => {
    resDataObj.pagedata.pagesize = val //每页显示的条数
    getUserList()
  })
  //分页
  const handleCurrentChange = ((val) => {
    resDataObj.pagedata.currentPage = val
    getUserList()
  })
  //状态更改
  const formatter = ((res) => {
    let data = {
      id: res.id,
      mg_state: res.mg_state
    }
    root.publicApi.userManageApi.editState(data).then((res) => {
      if (res.meta.status == 200) {
        root.$message.success(res.meta.msg)
        getUserList()
      }
    })
  })
  //添加用户
  const addUserFn = ((type,row) => {
    titleType.value = type
    if (type == '修改') {
      getEditUser(row)
    }
    setTimeout(() =>{
      dialogVisible.value = true
    },100)
  })
  //获取修改的用户数据
  const getEditUser = ((row) =>{
    root.publicApi.userManageApi.getEditUser(row.id).then((res) => {
      if (res.meta.status == 200) {
        root.$message.success(res.meta.msg)
        resDataObj.ruleForm = res.data
        whoID.value = row.id
        whoRid.value = res.data.rid
      }
    })
  })
  const handleClose = ((done) => {
    root.$confirm('确认关闭？')
      .then(_ => {
        resetForm('resDataObj.ruleFrom')
      })
      .catch(_ => {});
  })
  //保存
  const submitForm = ((formName) => {
    refs[formName].validate((valid) => {
      if (valid) {
        if (titleType.value == '添加') {
         root.publicApi.userManageApi.addUser(resDataObj.ruleForm).then((res) => {
           if (res.meta.status == 201) {
             // root.$message.success(res.meta.msg)
             resetForm('resDataObj.ruleFrom')
             getUserList()
           }
         })
        } else {
          root.publicApi.userManageApi.editUser(whoID.value,resDataObj.ruleForm).then((res) => {
            if (res.meta.status == 200) {
              root.$message.success(res.meta.msg)
              resetForm('resDataObj.ruleFrom')
              getUserList()
            }
          })
        }
      } else {
        return false;
      }
    })
  })
  //删除
  const deleteUserFn = ((row) => {
  root.$confirm('是否删除', '温馨提醒', {
      confirmButtonText: '确定',
      modal: false,
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      DELEEdit(row);
    }).catch(() => {
    });
  })
  //确认删除
  const DELEEdit = ((row) => {
    root.publicApi.userManageApi.deleteUserUid(row.id).then((res) => {
      if (res.meta.status == 200) {
        root.$message.success(res.meta.msg)
        resetForm('resDataObj.ruleFrom')
        getUserList()
      }
    })
  })
  //分配用户权限
  const assignJurisdiction = ((row) => {
    dialogVisible1.value = true
    // resDataObj.roleFrom.rid = row.id
    resDataObj.roleFrom.username = row.username
    resDataObj.roleFrom.role_name = row.role_name
    resDataObj.roleFrom.rid =  whoRid.value
    console.log(resDataObj.roleFrom)
    getAllRoleList()
  })
  //获取所有角色
  const getAllRoleList = (() => {
    root.publicApi.userManageApi.getAllRoleList().then((res) => {
      if (res.meta.status == 200) {
        resDataObj.allRoleList = res.data
      }
    })

  })
  //重置表单
  const resetForm = ((formName) =>{
    if (refs[formName]!==undefined) {
      refs[formName].resetFields();
    }
    resDataObj.ruleForm = {}
    resDataObj.roleFrom = {}
    dialogVisible.value = false
    dialogVisible1.value = false
  })
  return {
    getUserList,
    handleSizeChange,
    handleCurrentChange,
    formatter,
    addUserFn,
    handleClose,
    submitForm,
    resetForm,
    deleteUserFn,
    assignJurisdiction
  }
}
