<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <el-input placeholder="请输入内容" clearable v-model="resDataObj.searchObj.content" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :xs="4" :sm="4" :md="433" :lg="4" :xl="4">
          <el-button type="primary" @click="addUserFn('添加')">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="resDataObj.tableData"
        border
        style="width: 100%;margin-top: 20px">
        <el-table-column
          label="#"
          type="index"
        >
        </el-table-column>
        <el-table-column
          v-for="item in resDataObj.tableDataName"
          :key="item.id"
          :prop="item.prop"
          :label="item.label">
        </el-table-column>
        <el-table-column
          prop="mg_state"
          label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="formatter(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="addUserFn('修改',scope.row)">修改</el-button>
            <el-button type="text" @click="deleteUserFn(scope.row)">删除</el-button>
            <el-button type="text" @click="assignJurisdiction(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 10px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="resDataObj.pagedata.currentPage"
          :page-sizes="resDataObj.pagedata.pageSizes"
          :page-size="resDataObj.pagedata.pagesize"
          :layout="resDataObj.pagedata.layout"
          :total="resDataObj.pagedata.total">
        </el-pagination>
      </div>
    </el-card>
    <!--//弹框-->
    <el-dialog
      :title="titleType"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <el-form :model="resDataObj.ruleForm" :rules="resDataObj.rules" ref="resDataObj.ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="resDataObj.ruleForm.username" :disabled="titleType == '修改' ? true : false "></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="titleType == '添加'">
          <el-input type="password" v-model="resDataObj.ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="resDataObj.ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="resDataObj.ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('resDataObj.ruleForm')">提交</el-button>
          <el-button @click="resetForm('resDataObj.ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--分配权限-->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogVisible1"
      width="40%">
      <p>当前的用户：{{resDataObj.roleFrom.username}}</p>
      <p>当前的角色：{{resDataObj.roleFrom.role_name}}</p>
      <el-form :model="resDataObj.roleFrom" :rules="resDataObj.rules" ref="resDataObj.roleFrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分配新角色" prop="region">
          <el-select v-model="resDataObj.roleFrom.rid" placeholder="请选择">
            <el-option
              v-for="item in resDataObj.allRoleList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button @click="resetForm('resDataObj.roleFrom')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { userData, userFn } from '@/assets/js/userManage/userManage'
  export default {
    name: 'userManage',
    setup(props, { root,refs }) {
      //todo 导入数据
      let { resDataObj, dialogVisible,titleType,whoID,whoRid,dialogVisible1 } = userData()

      //todo 导入方法
      let {
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
      } = userFn(root,refs,resDataObj,dialogVisible,titleType,whoID,dialogVisible1,whoRid)
      //todo 暴露方法或数据
      return {
        resDataObj,
        titleType,
        handleSizeChange,
        handleCurrentChange,
        getUserList,
        formatter,
        addUserFn,
        dialogVisible,
        dialogVisible1,
        handleClose,
        submitForm,
        resetForm,
        deleteUserFn,
        assignJurisdiction
      }
    },
  }
</script>

<style scoped>
  .el-card {
    margin-top: 15px;
    box-shadow: 0 1px 1px rgba(0,0,0,.15)!important;
  }
</style>
