<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop",
  methods:{
    backClick(){
      this.$emit('backClick')
    }
  }
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 0.5rem;
    bottom: 2.75rem;
  }

  .back-top img{
    width: 2.15rem;
    height: 2.15rem;
  }
</style>
