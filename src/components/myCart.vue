<template>
  <div>
    <el-drawer
        title="购物车"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: 'myCart',
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
      }
    }
  }

</script>

<style scoped>

</style>