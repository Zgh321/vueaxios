<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    methods: {
      getMyAxios(){
        this.publicApi.getSelect().then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body,#app{
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
