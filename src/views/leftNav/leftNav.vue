<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#172850"
      unique-opened
      text-color="#fff"
      :collapse="isCollapse"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      router>
      <div :style="responsePX.tableWidth <= 500 ? 'height:40px' : 'height:76px'">
        <i class="background"></i>
      </div>
      <!-- 一级菜单 -->
      <el-submenu v-for="item in resDataObj.leftNavList" :index="item.id+''" :key="item.id">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item v-for="child in item.children" :index="'/system/'+child.path" :key="child.id">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{child.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { reactive, ref, onMounted, watch } from '@vue/composition-api'
  export default {
    name: 'leftNav',
    setup(props,{ refs, root }) {
      /**
       *存放数据
       */
      const resDataObj = reactive({
        leftNavList:[]
      })
      const isCollapse = ref(false)

      /**
       * 钩子函数
       */
      onMounted (() => {
        getLeftNav()
        resizeHeight()
        if (responsePX.tableWidth <= 500) {
          isCollapse.value = true
        }
      })
      //监听对象数据
      watch(
        () => root.$store.state.responsePX.tableWidth,
        (newValue, oldValue) =>{
          if (newValue <= 500) {
            isCollapse.value = true
          } else {
            isCollapse.value = false
          }
        }
      )
      /**
       * 方法
       */
      const resizeHeight = () => {
        root.$store.commit('resizeHeight')
      }
      const getLeftNav = (() =>{
        root.publicApi.leftNavApi.getLeftNav().then((res) => {
          if (res.meta.status === 200) {
            resDataObj.leftNavList = res.data
          }
        })
      })
      const responsePX = root.$store.state.responsePX
      return {
        resDataObj,
        isCollapse,
        getLeftNav,
        responsePX,
        resizeHeight
      }
    },
  }
</script>

<style scoped>
 .el-menu{
   border-right: none;
 }
 .epan-logo{
   /*height: 76px;*/
 }
  .background{
    background-image: url("../../assets/epan-logo.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
