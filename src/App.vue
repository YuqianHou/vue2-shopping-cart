<template>
  <div id="app">
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Vue Shopping Cart</title>
      </head>
      <body>
      <el-container>
        <el-main>
          <router-view/>
          <myCartDrawer/>
        </el-main>
        <el-footer>Yuqian Hou</el-footer>
      </el-container>
      </body>
    </html>
  </div>
</template>

<script>
import myCartDrawer from "@/components/myCartDrawer.vue";

export default {
  name: 'App',
  components: {
    myCartDrawer
  },
  data(){
    return {
      input: '',
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
