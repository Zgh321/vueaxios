<template>
  <el-container class="home-container">
    <el-aside :width="responsePX.tableWidth <= 500 ? '64px' : '200px' ">
      <left-nav></left-nav>
    </el-aside>
    <el-container>
      <el-header>
        <header-top></header-top>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import leftNav from '@/views/leftNav/leftNav'
  import headerTop from '@/views/header/headerTop'
  import { mapState,mapMutations } from 'vuex'
  export default {
    name: 'system',
    components:{ leftNav, headerTop },
    mounted () {
      this.resizeHeight()
    },
    methods: {
      ...mapMutations(['resizeHeight'])
    },
    computed: {
      ...mapState(['responsePX'])
    }

  }
</script>

<style scoped>
  .home-container{
    height: 100%;
  }
  .el-aside{
    background-color: #172850;
  }
  .el-header{
    border-bottom: 1px solid #ccc;
    height: 60px;
  }
</style>
