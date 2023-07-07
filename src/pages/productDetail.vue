<template>
  <div>
    <h1>
      产品编号：{{$route.params.id}}
      名字：{{$route.params.name}}
    </h1>
  </div>
</template>

<script>
  export default {
    name: 'productDetail'
  }
</script>

<style scoped>

</style>