<template>
  <div id="app">
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Vue Shopping Cart</title>
      </head>
      <body>
      <el-container>
        <el-header>
          <el-input
              placeholder="请输入想找的食物"
              prefix-icon="el-icon-search"
              v-model="input"
              style="width: 50%"
          >
          </el-input>
        </el-header>
        <el-main>
          <router-view/>
          <myCart/>
        </el-main>
        <el-footer>Yuqian Hou</el-footer>
      </el-container>
      </body>
    </html>
  </div>
</template>

<script>
import MyCart from "@/components/myCart.vue";

export default {
  name: 'App',
  components: {
    MyCart
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
