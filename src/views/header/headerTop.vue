<template>
  <div class="header-top">
    <div class="header-top-operation">
      <i class="el-icon-arrow-left icons return-box"></i>
      <ul>
        <li class="return-box">返回</li>
        <li class="shuge">|</li>
        <li class="now-page">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/system/homePage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.parent">{{$route.meta.parent}}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="$route.meta.title">{{$route.meta.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </li>
      </ul>
    </div>
    <el-button>注销</el-button>
  </div>
</template>

<script>
  export default {
    name: 'header-top',
    data () {
      return {}
    },

  }
</script>

<style scoped>
  li {
    list-style: none;
    display: inline-block;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    font-size: 15px;
  }

  .header-top-operation {
    display: flex;
    align-items: center;
  }

  .icons {
    color: #969ea7;
    vertical-align: middle;
    margin-right: 10px;
  }

  .return-box {
    cursor: pointer;
  }

  .shuge {
    color: #a5aeb8;
    padding: 0 14px;
  }

  .now-page {
    color: #a5aeb8;
  }
</style>
